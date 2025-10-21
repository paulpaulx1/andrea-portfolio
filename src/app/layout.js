import "./globals.css";
import SideNavClient from "@components/SideNavClient";

export const metadata = {
  title: "Andrea Callard",
  description: "Film and artwork archive",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <aside className="sidebar">
            <h1 className="site-title">andrea callard</h1>
            <SideNavClient />
          </aside>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
