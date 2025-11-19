import Link from "next/link";
import MobileNav from "@components/MobileNav";
import SideNav from "@components/SideNav";
import { NavigationProvider } from "../app/context/NavigationProvider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavigationProvider>
          <div className="layout">
            <aside className="sidebar desktop-only">
              <h1 className="site-title">
                <Link href="/" className="site-title-link">
                  andrea callard
                </Link>
              </h1>
              <SideNav />
            </aside>

            <div className="mobile-header mobile-only">
              <h1 className="site-title">
                <Link href="/" className="site-title-link">
                  andrea callard
                </Link>
              </h1>
              <MobileNav>
                <SideNav />
              </MobileNav>
            </div>

            <main className="main">{children}</main>
          </div>
        </NavigationProvider>
      </body>
    </html>
  );
}
