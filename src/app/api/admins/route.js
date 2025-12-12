import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// GET - Récupérer tous les admins
export async function GET() {
  try {
    const admins = await sql`
      SELECT id, username, name, created_at FROM admins 
      ORDER BY created_at DESC
    `;
    return Response.json(admins);
  } catch (error) {
    console.error('Erreur GET admins:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// POST - Ajouter un nouvel admin
export async function POST(request) {
  try {
    const { username, password, name } = await request.json();
    
    // Vérifier si le username existe déjà
    const existing = await sql`SELECT id FROM admins WHERE username = ${username}`;
    if (existing.length > 0) {
      return Response.json({ error: 'Ce nom d\'utilisateur existe déjà' }, { status: 400 });
    }
    
    const result = await sql`
      INSERT INTO admins (username, password, name)
      VALUES (${username}, ${password}, ${name})
      RETURNING id, username, name, created_at
    `;
    
    return Response.json(result[0]);
  } catch (error) {
    console.error('Erreur POST admin:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Supprimer un admin
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // Vérifier qu'il reste au moins un admin
    const count = await sql`SELECT COUNT(*) as count FROM admins`;
    if (parseInt(count[0].count) <= 1) {
      return Response.json({ error: 'Impossible de supprimer le dernier admin' }, { status: 400 });
    }
    
    await sql`DELETE FROM admins WHERE id = ${id}`;
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE admin:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Modifier le mot de passe
export async function PUT(request) {
  try {
    const { id, password, name } = await request.json();
    
    const result = await sql`
      UPDATE admins 
      SET password = ${password}, name = ${name}
      WHERE id = ${id}
      RETURNING id, username, name
    `;
    
    return Response.json(result[0]);
  } catch (error) {
    console.error('Erreur PUT admin:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
