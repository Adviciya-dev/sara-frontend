'use client';

import { ThemeProvider } from '../src/context/ThemeContext';
import { LanguageProvider } from '../src/context/LanguageContext';
import { AuthProvider } from '../src/context/AuthContext';
import { Toaster } from '../src/components/ui/sonner';
import '../src/index.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#020817" />
        <meta name="description" content="SARA Business Solutions - Leading Saudi Digital Solutions Provider" />
        <title>SARA Business Solutions</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              {children}
              <Toaster position="top-right" />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
