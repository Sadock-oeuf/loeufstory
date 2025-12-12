import './globals.css'

export const metadata = {
  title: "L'Oeufstory - Restaurant Déjeuner & Dîner",
  description: "Votre destination brunch au Québec. Des œufs parfaits, des sourires garantis.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+Pro:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
