"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import "./login/login.css";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body className="layout-body">
        {!isLoginPage && (
          <aside className="sidebar">
            <h2 className="sidebar-title">Navigation</h2>
            <nav className="sidebar-links">
              <Link href="/courses">Courses</Link>
              <Link href="/grades">View Grades</Link>
              <Link href="/upload-grades">Upload Grades</Link>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </nav>
          </aside>
        )}
        <main className="layout-main">
          {children}
        </main>
      </body>
    </html>
  );
}