import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../data');
const REGISTRATIONS_FILE = path.join(DATA_DIR, 'registrations.json');

async function testPersistence() {
  console.log('[TEST] Checking data directory and registrations file...');
  await fs.mkdir(DATA_DIR, { recursive: true });

  const testRecords = [
    {
      id: crypto.randomUUID(),
      referenceNumber: 'NEXUS-2026-A1B2-C3D4',
      registeredAt: new Date().toISOString(),
      fullName: 'Pradeepto Dixit (Test Student)',
      collegeEmail: 'pradeepto.test@abes.ac.in',
      academicYear: '3rd Year',
      department: 'Computer Science & Engineering',
      eventId: 'nexus-devsprint-2026',
      eventTitle: 'Nexus DevSprint 2026: Modern Systems & Distributed Architecture',
      areaOfInterest: 'Distributed Systems & Web Architecture'
    }
  ];

  await fs.writeFile(REGISTRATIONS_FILE, JSON.stringify(testRecords, null, 2), 'utf-8');
  console.log('[TEST] Wrote initial registration to:', REGISTRATIONS_FILE);

  const readBack = JSON.parse(await fs.readFile(REGISTRATIONS_FILE, 'utf-8'));
  console.log('[TEST] Read back successfully:', readBack.length, 'records');
  console.log('[TEST] Record 0 reference:', readBack[0].referenceNumber);

  // Test duplicate check logic
  const emailToTest = 'pradeepto.test@abes.ac.in';
  const eventToTest = 'nexus-devsprint-2026';
  const duplicate = readBack.find(r => r.collegeEmail === emailToTest && r.eventId === eventToTest);

  if (duplicate) {
    console.log('[TEST] Duplicate detection verified! Found existing ref:', duplicate.referenceNumber);
  } else {
    throw new Error('Duplicate detection failed');
  }

  console.log('[TEST] ALL PERSISTENCE LOGIC PASSED SUCCESSFULLY!');
}

testPersistence().catch(err => {
  console.error('[TEST ERROR]', err);
  process.exit(1);
});
