import '@/styles/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Então Pronto</title>
        <meta name="description" content="Então Pronto é uma plataforma para conectar negócios a clientes." />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
