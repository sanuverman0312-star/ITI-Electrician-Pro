import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ITI Electrician Pro - Complete Learning App | Mock Tests & Calculators',
  description: 'Complete ITI Electrician learning app with chapters, mock tests, 10+ calculators, safety tips. Free resources for 1st & 2nd year students.',
  keywords: 'ITI Electrician, Electrician course, ITI mock test, electrical calculator, NCVT, electrician syllabus, ITI exam, electrical safety',
  authors: [{ name: 'Shashank' }],
  creator: 'Shashank',
  publisher: 'ITI Electrician Pro',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://itielectricianpro.com',
    title: 'ITI Electrician Pro - Complete Learning App',
    description: 'Free learning platform for ITI Electrician students',
    siteName: 'ITI Electrician Pro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ITI Electrician Pro',
    description: 'Complete ITI Electrician learning platform',
  },
  manifest: '/manifest.json',
  themeColor: '#667eea',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pb-20 md:pb-0">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </div>
      </body>
    </html>
  );
}