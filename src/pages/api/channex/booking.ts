import type { APIRoute } from 'astro';
import { createBooking } from '../../../services/channex';

export const prerender = false;

/**
 * POST /api/channex/booking
 * Creates a new booking in pending state
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { roomId, checkIn, checkOut, guests, guestName, guestEmail, guestPhone, airportPickup, flightTime } = body;

    // Validation
    if (!roomId || !checkIn || !checkOut || !guestName || !guestEmail || !guestPhone) {
      return new Response(JSON.stringify({ error: 'Missing required booking fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Input sanitization
    const sanitize = (s: string, maxLen = 200) => String(s).trim().slice(0, maxLen);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const cleanName = sanitize(guestName, 100);
    const cleanEmail = sanitize(guestEmail, 100);
    const cleanPhone = sanitize(guestPhone, 30);

    if (!emailRegex.test(cleanEmail)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const booking = await createBooking({
      roomId: sanitize(roomId, 50),
      checkIn: sanitize(checkIn, 10),
      checkOut: sanitize(checkOut, 10),
      guests: Number(guests) || 2,
      guestName: cleanName,
      guestEmail: cleanEmail,
      guestPhone: cleanPhone,
      airportPickup: Boolean(airportPickup),
      flightTime: flightTime ? sanitize(flightTime, 10) : '',
    });

    return new Response(JSON.stringify(booking), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API Booking Create] Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
