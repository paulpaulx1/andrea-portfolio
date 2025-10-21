// src/app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import SideNav from '@/components/SideNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Andrea Callard Films',
  description: 'Archive and filmography of Andrea Callard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-black text-white p-4">
            <div className="container mx-auto">
              <h1 className="text-xl font-bold">Andrea Callard</h1>
            </div>
          </header>
          
          <div className="flex-grow flex flex-col md:flex-row">
            <SideNav />
            <main className="flex-grow p-6 bg-gray-50">
              {children}
            </main>
          </div>
          
          <footer className="bg-black text-white p-4">
            <div className="container mx-auto text-center">
              <p>&copy; {new Date().getFullYear()} Andrea Callard. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}