import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// GET - Récupérer tous les employés
export async function GET() {
  try {
    const employees = await sql`
      SELECT * FROM employees 
      ORDER BY name ASC
    `;
    return Response.json(employees);
  } catch (error) {
    console.error('Erreur GET employees:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// POST - Ajouter un employé
export async function POST(request) {
  try {
    const data = await request.json();
    
    const result = await sql`
      INSERT INTO employees (name, role, phone, email, hourly_rate, is_active)
      VALUES (${data.name}, ${data.role}, ${data.phone || null}, ${data.email || null}, ${data.hourly_rate || null}, true)
      RETURNING *
    `;
    
    return Response.json(result[0]);
  } catch (error) {
    console.error('Erreur POST employee:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Mettre à jour un employé
export async function PUT(request) {
  try {
    const data = await request.json();
    
    const result = await sql`
      UPDATE employees 
      SET name = ${data.name},
          role = ${data.role},
          phone = ${data.phone || null},
          email = ${data.email || null},
          hourly_rate = ${data.hourly_rate || null},
          is_active = ${data.is_active !== false}
      WHERE id = ${data.id}
      RETURNING *
    `;
    
    return Response.json(result[0]);
  } catch (error) {
    console.error('Erreur PUT employee:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Supprimer un employé
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await sql`DELETE FROM employees WHERE id = ${id}`;
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE employee:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
