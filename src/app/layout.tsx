
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import MainLayout from '@/components/main-layout';

export const metadata: Metadata = {
  title: 'AI Co-Builder - Code Refactor & AI Tutor Tools',
  description: 'AI-powered tools for developers and learners. Get intelligent code refactoring suggestions and learn with guided step-by-step tutoring.',
  authors: [{ name: 'AI Co-Builder' }],
  metadataBase: new URL('https://lovable.dev'),
  openGraph: {
    title: 'AI Co-Builder - Code Refactor & AI Tutor',
    description: 'AI-powered tools for developers and learners with intelligent code analysis and guided learning',
    type: 'website',
    images: ['/opengraph-image-p98pqg.png'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Lovable',
    images: ['/opengraph-image-p98pqg.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={[
            'light',
            'dark',
            'midnight-blue',
            'forest-green',
            'sunset-orange',
            'ocean-blue',
            'purple-haze',
            'high-contrast',
          ]}
        >
          <MainLayout>{children}</MainLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
