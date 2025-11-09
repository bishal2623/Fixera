import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { AppShell } from '@/components/layout/app-shell';

export const metadata: Metadata = {
  title: 'Fixera - One Toolkit for All Your Creative Needs',
  description: 'Transform your workflow with Fixera. Get AI-powered code refactoring, personalized tutoring, and creative design assistance all in one place.',
  authors: [{ name: 'Fixera' }],
  metadataBase: new URL('https://lovable.dev'),
  openGraph: {
    title: 'Fixera - One Toolkit for All Your Creative Needs',
    description: 'Transform your workflow with Fixera. Stop switching tabs and start co-creating with AI.',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppShell>{children}</AppShell>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
