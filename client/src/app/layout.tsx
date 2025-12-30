import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Weavy',
  description:
    'Unified AI model access and node-based workflow builder UI prototype.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
