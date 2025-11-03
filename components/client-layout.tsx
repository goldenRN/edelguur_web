'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/app/context/CartContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeaderRoutes = ['/auth', '/admin'];
  const shouldHideHeader = hideHeaderRoutes.some(route => pathname.startsWith(route));

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        {!shouldHideHeader && <Navbar />}
        <main className="flex-grow">{children}</main>
        {!shouldHideHeader && <Footer />}
      </div>
    </CartProvider>
  );
}
