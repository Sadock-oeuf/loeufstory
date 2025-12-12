import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// GET - Récupérer les horaires (avec filtre par semaine optionnel)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('start');
    const endDate = searchParams.get('end');
    
    let schedules;
    
    if (startDate && endDate) {
      schedules = await sql`
        SELECT s.*, e.name as employee_name, e.role as employee_role
        FROM schedules s
        JOIN employees e ON s.employee_id = e.id
        WHERE s.date >= ${startDate} AND s.date <= ${endDate}
        ORDER BY s.date ASC, s.start_time ASC
      `;
    } else {
      schedules = await sql`
        SELECT s.*, e.name as employee_name, e.role as employee_role
        FROM schedules s
        JOIN employees e ON s.employee_id = e.id
        ORDER BY s.date ASC, s.start_time ASC
      `;
    }
    
    return Response.json(schedules);
  } catch (error) {
    console.error('Erreur GET schedules:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// POST - Ajouter un horaire
export async function POST(request) {
  try {
    const data = await request.json();
    
    const result = await sql`
      INSERT INTO schedules (employee_id, date, start_time, end_time, notes)
      VALUES (${data.employee_id}, ${data.date}, ${data.start_time}, ${data.end_time}, ${data.notes || null})
      RETURNING *
    `;
    
    // Récupérer avec les infos de l'employé
    const schedule = await sql`
      SELECT s.*, e.name as employee_name, e.role as employee_role
      FROM schedules s
      JOIN employees e ON s.employee_id = e.id
      WHERE s.id = ${result[0].id}
    `;
    
    return Response.json(schedule[0]);
  } catch (error) {
    console.error('Erreur POST schedule:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Mettre à jour un horaire
export async function PUT(request) {
  try {
    const data = await request.json();
    
    const result = await sql`
      UPDATE schedules 
      SET employee_id = ${data.employee_id},
          date = ${data.date},
          start_time = ${data.start_time},
          end_time = ${data.end_time},
          notes = ${data.notes || null}
      WHERE id = ${data.id}
      RETURNING *
    `;
    
    // Récupérer avec les infos de l'employé
    const schedule = await sql`
      SELECT s.*, e.name as employee_name, e.role as employee_role
      FROM schedules s
      JOIN employees e ON s.employee_id = e.id
      WHERE s.id = ${result[0].id}
    `;
    
    return Response.json(schedule[0]);
  } catch (error) {
    console.error('Erreur PUT schedule:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Supprimer un horaire
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await sql`DELETE FROM schedules WHERE id = ${id}`;
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE schedule:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
