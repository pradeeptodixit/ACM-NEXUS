import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_DIR = path.resolve(__dirname, '../data');
const REGISTRATIONS_FILE = path.join(DATA_DIR, 'registrations.json');

// Middleware
app.use(express.json({ limit: '64kb' }));
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Basic in-memory rate limiter (30 requests per minute per IP for registration)
const rateLimitMap = new Map();
function rateLimiter(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxReq = 30;

  const userRecord = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };

  if (now > userRecord.resetTime) {
    userRecord.count = 1;
    userRecord.resetTime = now + windowMs;
  } else {
    userRecord.count++;
  }

  rateLimitMap.set(ip, userRecord);

  if (userRecord.count > maxReq) {
    return res.status(429).json({
      success: false,
      error: 'Rate limit exceeded. Please wait a minute before submitting again.'
    });
  }

  next();
}

// Ensure data file exists
async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(REGISTRATIONS_FILE);
    } catch {
      await fs.writeFile(REGISTRATIONS_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Failed to initialize data store:', err);
  }
}

// Read registrations
async function readRegistrations() {
  try {
    const raw = await fs.readFile(REGISTRATIONS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading registrations:', err);
    return [];
  }
}

// Write registrations atomically
async function writeRegistrations(data) {
  const tempPath = `${REGISTRATIONS_FILE}.tmp.${Date.now()}`;
  await fs.writeFile(tempPath, JSON.stringify(data, null, 2), 'utf-8');
  await fs.rename(tempPath, REGISTRATIONS_FILE);
}

// Valid events catalog for server-side verification
const VALID_EVENTS = {
  'nexus-devsprint-2026': 'Nexus DevSprint 2026: Modern Systems & Distributed Architecture',
  'deepvision-ai-summit': 'Cognitive Computing & Foundation Models Conclave',
  'algorithmika-conclave-2026': 'Algorithmika 2K26: Advanced Graph Theory & Competitive Conclave',
  'acmw-empowertech-2026': 'ACM-W EmpowerTech: Systems Security & Diversity in Tech',
  'quantum-edge-colloquium': 'Compute Colloquium: Quantum Algorithms & Post-Quantum Cryptography',
  'creative-code-interactive-lab': 'Creative Computing: Shaders, WebGL & Generative Audio'
};

// API: Health & Server Info
app.get('/api/health', async (req, res) => {
  const registrations = await readRegistrations();
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'ACM NEXUS Registration Engine',
    persistence: 'Local Atomic JSON File Storage',
    creator: 'Pradeepto Dixit',
    totalRegistrations: registrations.length
  });
});

// API: Aggregate non-identifying statistics
app.get('/api/stats', async (req, res) => {
  const registrations = await readRegistrations();
  const eventCounts = {};

  for (const reg of registrations) {
    eventCounts[reg.eventId] = (eventCounts[reg.eventId] || 0) + 1;
  }

  res.json({
    totalCount: registrations.length,
    byEvent: eventCounts
  });
});

// API: Verify reference number (Privacy safe: no personal email returned)
app.get('/api/verify/:ref', async (req, res) => {
  const { ref } = req.params;
  const registrations = await readRegistrations();
  const match = registrations.find(r => r.referenceNumber.toUpperCase() === ref.toUpperCase().trim());

  if (!match) {
    return res.status(404).json({
      success: false,
      error: 'Registration reference not found in chapter ledger.'
    });
  }

  res.json({
    success: true,
    verified: true,
    referenceNumber: match.referenceNumber,
    eventTitle: match.eventTitle,
    registeredAt: match.registeredAt,
    academicYear: match.academicYear,
    department: match.department
  });
});

// API: Post Registration
app.post('/api/register', rateLimiter, async (req, res) => {
  try {
    const {
      fullName,
      collegeEmail,
      academicYear,
      department,
      eventId,
      areaOfInterest,
      acceptedConsent
    } = req.body;

    // Server-side validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2 || fullName.trim().length > 70) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid full name between 2 and 70 characters.'
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!collegeEmail || typeof collegeEmail !== 'string' || !emailRegex.test(collegeEmail.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    const validYears = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate'];
    if (!academicYear || !validYears.includes(academicYear)) {
      return res.status(400).json({
        success: false,
        error: 'Please select a valid academic year.'
      });
    }

    if (!department || typeof department !== 'string' || department.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your academic department or branch.'
      });
    }

    if (!eventId || !VALID_EVENTS[eventId]) {
      return res.status(400).json({
        success: false,
        error: 'Selected event is not in the active chapter catalog.'
      });
    }

    if (!acceptedConsent) {
      return res.status(400).json({
        success: false,
        error: 'Participant consent to code of conduct is required.'
      });
    }

    const sanitizedEmail = collegeEmail.trim().toLowerCase();
    const sanitizedName = fullName.trim();
    const sanitizedDept = department.trim();
    const sanitizedInterest = (areaOfInterest || '').trim().slice(0, 200);

    const registrations = await readRegistrations();

    // Check duplicate submission
    const duplicate = registrations.find(
      r => r.collegeEmail.toLowerCase() === sanitizedEmail && r.eventId === eventId
    );

    if (duplicate) {
      return res.status(409).json({
        success: false,
        error: `A registration for "${VALID_EVENTS[eventId]}" has already been recorded for ${sanitizedEmail}. Reference ID: ${duplicate.referenceNumber}`,
        existingReference: duplicate.referenceNumber
      });
    }

    // Generate reference code: NEXUS-2026-[hex4]-[hex4]
    const refSuffix = crypto.randomBytes(4).toString('hex').toUpperCase();
    const referenceNumber = `NEXUS-2026-${refSuffix.slice(0, 4)}-${refSuffix.slice(4, 8)}`;

    const newRecord = {
      id: crypto.randomUUID(),
      referenceNumber,
      registeredAt: new Date().toISOString(),
      fullName: sanitizedName,
      collegeEmail: sanitizedEmail,
      academicYear,
      department: sanitizedDept,
      eventId,
      eventTitle: VALID_EVENTS[eventId],
      areaOfInterest: sanitizedInterest
    };

    registrations.push(newRecord);
    await writeRegistrations(registrations);

    console.log(`[ACM NEXUS] New registration recorded: ${referenceNumber} for ${sanitizedName} (${VALID_EVENTS[eventId]})`);

    return res.status(201).json({
      success: true,
      message: 'Registration confirmed successfully in ACM NEXUS Chapter Ledger.',
      record: newRecord
    });
  } catch (err) {
    console.error('Registration processing error:', err);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing registration. Please try again.'
    });
  }
});

// Static files for production if dist exists
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback to index.html for SPA routes in production
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('ACM NEXUS API Server is running. Frontend build in /dist will be served once built.');
    }
  });
});

// Start server
ensureDataFile().then(() => {
  app.listen(PORT, () => {
    console.log(`[ACM NEXUS] Dedicated API Server running on port ${PORT}`);
    console.log(`[ACM NEXUS] Storage ledger: ${REGISTRATIONS_FILE}`);
  });
});
