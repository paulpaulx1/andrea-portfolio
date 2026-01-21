// app/layout.tsx (SERVER)
import Link from "next/link";
import SideNav from "@components/SideNav";
import MobileNav from "@components/MobileNav";
import "./globals.css";
import { headers } from "next/headers";

export const metadata = {
  title: {
    default: "Andrea Callard",
    template: "%s | Andrea Callard", // Pages can override with just their title
  },
  description:
    "Artist and filmmaker Andrea Callard's portfolio featuring films, works on paper, and the Avocet Portfolio collaborative printmaking project.",
  openGraph: {
    title: "Andrea Callard",
    description: "Artist and filmmaker Andrea Callard's portfolio",
    type: "website",
  },
};

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";

  return (
    <html lang="en">
      <body>
        <div className="layout">
          {/* DESKTOP */}
          <aside className="sidebar desktop-only">
            <h1 className="site-title">
              <Link href="/" className="site-title-link">
                andrea callard
              </Link>
            </h1>

            <SideNav pathname={pathname} />
          </aside>

          {/* MOBILE */}
          <div className="mobile-header mobile-only">
            <h1 className="site-title">
              <Link href="/" className="site-title-link">
                andrea callard
              </Link>
            </h1>

            <MobileNav>
              <SideNav pathname={pathname} />
            </MobileNav>
          </div>

          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
