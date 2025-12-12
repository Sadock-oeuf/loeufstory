import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// POST - Vérifier le login admin
export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    const result = await sql`
      SELECT id, username, name FROM admins 
      WHERE username = ${username} AND password = ${password}
    `;
    
    if (result.length > 0) {
      return Response.json({ 
        success: true, 
        admin: result[0] 
      });
    } else {
      return Response.json({ 
        success: false, 
        error: "Nom d'utilisateur ou mot de passe incorrect" 
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Erreur auth:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
