import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// GET - Récupérer toutes les catégories
export async function GET() {
  try {
    const categories = await sql`
      SELECT * FROM categories 
      ORDER BY display_order ASC, title ASC
    `;
    return Response.json(categories);
  } catch (error) {
    console.error('Erreur GET categories:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// POST - Ajouter une catégorie
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Générer une clé unique à partir du titre
    const key = data.key || data.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 50);
    
    // Trouver le prochain ordre d'affichage
    const maxOrder = await sql`SELECT COALESCE(MAX(display_order), 0) + 1 as next_order FROM categories`;
    
    const result = await sql`
      INSERT INTO categories (key, title, description, display_order, is_active)
      VALUES (${key}, ${data.title}, ${data.description || ''}, ${maxOrder[0].next_order}, true)
      RETURNING *
    `;
    
    return Response.json(result[0]);
  } catch (error) {
    console.error('Erreur POST category:', error);
    if (error.message.includes('unique constraint')) {
      return Response.json({ error: 'Une catégorie avec ce nom existe déjà' }, { status: 400 });
    }
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Mettre à jour une catégorie
export async function PUT(request) {
  try {
    const data = await request.json();
    
    const result = await sql`
      UPDATE categories 
      SET title = ${data.title},
          description = ${data.description || ''},
          display_order = ${data.display_order || 0},
          is_active = ${data.is_active !== false}
      WHERE id = ${data.id}
      RETURNING *
    `;
    
    return Response.json(result[0]);
  } catch (error) {
    console.error('Erreur PUT category:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Supprimer une catégorie
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // Vérifier si la catégorie a des items
    const category = await sql`SELECT key FROM categories WHERE id = ${id}`;
    if (category.length > 0) {
      const items = await sql`SELECT COUNT(*) as count FROM menu_items WHERE category = ${category[0].key}`;
      if (parseInt(items[0].count) > 0) {
        return Response.json({ 
          error: `Cette catégorie contient ${items[0].count} item(s). Supprimez-les d'abord.` 
        }, { status: 400 });
      }
    }
    
    await sql`DELETE FROM categories WHERE id = ${id}`;
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE category:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
