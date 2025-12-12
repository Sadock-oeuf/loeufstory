import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// GET - Récupérer tous les items du menu
export async function GET() {
  try {
    const items = await sql`
      SELECT * FROM menu_items 
      ORDER BY category, name
    `;
    return Response.json(items);
  } catch (error) {
    console.error('Erreur GET menu:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// POST - Ajouter un item au menu
export async function POST(request) {
  try {
    const data = await request.json();
    
    const result = await sql`
      INSERT INTO menu_items (category, name, price, description, is_available)
      VALUES (${data.category}, ${data.name}, ${data.price}, ${data.description || ''}, ${data.is_available !== false})
      RETURNING *
    `;
    
    return Response.json(result[0]);
  } catch (error) {
    console.error('Erreur POST menu:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Mettre à jour un item
export async function PUT(request) {
  try {
    const data = await request.json();
    
    const result = await sql`
      UPDATE menu_items 
      SET category = ${data.category},
          name = ${data.name}, 
          price = ${data.price}, 
          description = ${data.description || ''},
          is_available = ${data.is_available !== false}
      WHERE id = ${data.id}
      RETURNING *
    `;
    
    return Response.json(result[0]);
  } catch (error) {
    console.error('Erreur PUT menu:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Supprimer un item
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await sql`DELETE FROM menu_items WHERE id = ${id}`;
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE menu:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
