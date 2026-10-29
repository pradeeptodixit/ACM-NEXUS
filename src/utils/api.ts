import { RegistrationFormData, RegistrationResponse, RegistrationRecord } from '../types';
import { EVENTS_DATA } from '../data/eventsData';

const API_BASE = '/api';

/**
 * Handles registration submission to the genuine Express API with robust fallback
 */
export async function submitRegistration(formData: RegistrationFormData): Promise<RegistrationResponse> {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.error || 'Registration could not be completed.',
        error: data.error,
      };
    }

    return {
      success: true,
      message: data.message || 'Registration confirmed successfully in Chapter Ledger.',
      record: data.record,
    };
  } catch (err) {
    console.warn('[ACM NEXUS] Backend API not reachable, activating client demo fallback:', err);
    
    // Fallback: Generate demo reference for local evaluation with transparent labeling
    const event = EVENTS_DATA.find(e => e.id === formData.eventId);
    const mockRef = `DEMO-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    
    const demoRecord: RegistrationRecord = {
      id: `client-demo-${Date.now()}`,
      referenceNumber: mockRef,
      registeredAt: new Date().toISOString(),
      fullName: formData.fullName.trim(),
      collegeEmail: formData.collegeEmail.trim().toLowerCase(),
      academicYear: formData.academicYear,
      department: formData.department.trim(),
      eventId: formData.eventId,
      eventTitle: event?.title || 'ACM Event',
      areaOfInterest: formData.areaOfInterest?.trim() || '',
    };

    // Store in session storage for demo persistence
    try {
      const existing = JSON.parse(sessionStorage.getItem('nexus_demo_registrations') || '[]');
      existing.push(demoRecord);
      sessionStorage.setItem('nexus_demo_registrations', JSON.stringify(existing));
    } catch {
      // Ignore storage errors
    }

    return {
      success: true,
      message: 'Registration recorded (Demonstration Mode: API server is offline, saved to session ledger).',
      record: demoRecord,
    };
  }
}

/**
 * Checks server health and persistence status
 */
export async function checkServerHealth(): Promise<{ isOnline: boolean; totalRegistrations: number }> {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      return { isOnline: true, totalRegistrations: data.totalRegistrations || 0 };
    }
  } catch {
    // Offline
  }
  return { isOnline: false, totalRegistrations: 0 };
}
