require('dotenv').config();
const fetch = require('node-fetch');

const EVENTBRITE_API_URL = 'https://www.eventbriteapi.com/v3';
const EVENTBRITE_TOKEN = process.env.EVENTBRITE_TOKEN;

async function fetchEventsForEssen() {
  if (!EVENTBRITE_TOKEN) {
    console.error('❌ Kein Eventbrite API Token gefunden! Bitte .env prüfen.');
    process.exit(1);
  }

  // Query-Parameter Eventbrite-konform aufbauen
  const params = [
    'location.address=Essen',
    'location.within=25km',
    'status=live',
    'order_by=start_asc',
    `start_date.range_start=${encodeURIComponent(new Date().toISOString())}`
  ].join('&');

  const url = `${EVENTBRITE_API_URL}/events/search/?${params}`;
  console.log('🔎 Anfrage-URL:', url);

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${EVENTBRITE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Eventbrite API Error: ${response.status} ${response.statusText}\n${text}`);
    }
    const data = await response.json();
    if (data.events && data.events.length > 0) {
      console.log('✅ Gefundene Events für Essen:\n');
      data.events.forEach(ev => {
        console.log(`- ${ev.name.text} | ${ev.start.local} | ${ev.venue ? ev.venue.name : ''}`);
      });
    } else {
      console.log('⚠️ Keine Events gefunden!');
    }
  } catch (error) {
    console.error('❌ Fehler beim Abrufen der Eventbrite-Events:', error.message);
  }
}

fetchEventsForEssen();
