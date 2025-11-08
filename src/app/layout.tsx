import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Sidebar } from '@/components/layout/new-sidebar';

export const metadata: Metadata = {
  title: 'AI Co-Builder - One Toolkit for All Your Creative Needs',
  description: 'Transform your workflow with AI Co-Builder. Get AI-powered code refactoring, personalized tutoring, and creative design assistance all in one place.',
  authors: [{ name: 'AI Co-Builder' }],
  metadataBase: new URL('https://lovable.dev'),
  openGraph: {
    title: 'AI Co-Builder - One Toolkit for All Your Creative Needs',
    description: 'Transform your workflow with AI Co-Builder. Stop switching tabs and start co-creating with AI.',
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
          <div className="relative min-h-screen">
            <Sidebar />
            <main className="ml-64">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
