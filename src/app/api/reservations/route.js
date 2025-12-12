import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// GET - Récupérer toutes les réservations
export async function GET() {
  try {
    const reservations = await sql`
      SELECT * FROM reservations 
      ORDER BY date DESC, time DESC
    `;
    return Response.json(reservations);
  } catch (error) {
    console.error('Erreur GET reservations:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// POST - Créer une nouvelle réservation
export async function POST(request) {
  try {
    const data = await request.json();
    const code = 'RES-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const result = await sql`
      INSERT INTO reservations (code, name, email, phone, date, time, guests, notes, status)
      VALUES (${code}, ${data.name}, ${data.email}, ${data.phone}, 
              ${data.date}, ${data.time}, ${data.guests}, ${data.notes || ''}, 'confirmée')
      RETURNING *
    `;
    
    return Response.json(result[0]);
  } catch (error) {
    console.error('Erreur POST reservation:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Mettre à jour une réservation
export async function PUT(request) {
  try {
    const data = await request.json();
    
    const result = await sql`
      UPDATE reservations 
      SET name = ${data.name}, 
          email = ${data.email}, 
          phone = ${data.phone},
          date = ${data.date}, 
          time = ${data.time}, 
          guests = ${data.guests},
          notes = ${data.notes || ''},
          status = ${data.status || 'confirmée'}
      WHERE id = ${data.id}
      RETURNING *
    `;
    
    return Response.json(result[0]);
  } catch (error) {
    console.error('Erreur PUT reservation:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Supprimer une réservation
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await sql`DELETE FROM reservations WHERE id = ${id}`;
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE reservation:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
