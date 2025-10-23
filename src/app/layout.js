// app/layout.js
import Link from "next/link";
import { Menu } from 'lucide-react';
import "./globals.css";
import SideNavClient from "@components/SideNavClient";
import MobileNav from "@components/MobileNav";

export const metadata = {
  title: "Andrea Callard",
  description: "Film and artwork archive",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          {/* Desktop Sidebar */}
          <aside className="sidebar desktop-only">
            <h1 className="site-title">
              <Link href="/" className="site-title-link">
                andrea callard
              </Link>
            </h1>
            <SideNavClient />
          </aside>
          
          {/* Mobile Header with Hamburger */}
          <div className="mobile-header mobile-only">
            <h1 className="site-title">
              <Link href="/" className="site-title-link">
                andrea callard
              </Link>
            </h1>
            <MobileNav>
              <SideNavClient />
            </MobileNav>
          </div>
          
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}