import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ProgressProvider } from '@/components/ProgressProvider';

export const metadata = {
  title: 'The One-Person Agency Launchkit - Automate Your Client Intake & Payouts',
  description: 'A starkly minimalist, cinematic, step-by-step technical guide for Indian freelancers and agency owners to automate their onboarding, bookings, and UPI payment gateways in 45 minutes.',
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0D0E12] text-[#F3F4F6] min-h-screen flex flex-col antialiased font-sans">
        <ProgressProvider>
          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
        </ProgressProvider>
      </body>
    </html>
  );
}
