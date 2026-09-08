import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

function GuestNavbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setOpen(false); // Close mobile menu if resized to desktop
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when a link is clicked (route changes)
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
    { to: "/login", label: "Login" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        // When mobile menu is open, we need a solid background so the links are readable.
        // When closed, it reverts to your transparent difference blend mode.
        backgroundColor: open ? "#000000" : "transparent",
        mixBlendMode: open ? "normal" : "difference",
        transition: "background-color 0.3s ease",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <img
              src="./ekalavya.png"
              alt="Ekalavya Logo"
              style={{ height: "40px", borderRadius: 50 }}
            />
            <span
              style={{
                fontSize: "18px",
                fontWeight: "800",
                color: "#ffffff",
              }}
            >
              Ekalavya
            </span>
          </Link>

          {/* --- DESKTOP NAV --- */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    color: isActive(link.to) ? "white" : "#bebebe",
                    fontWeight: isActive(link.to) ? "600" : "400",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) => {
                    if (!isActive(link.to)) e.currentTarget.style.color = "#bebebe";
                  }}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to="/register"
                style={{
                  marginLeft: "8px",
                  padding: "9px 20px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "700",
                  textDecoration: "none",
                  color: "#000",
                  background: "#fff",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Get Started →
              </Link>

              <div style={{ marginLeft: "12px", display: "flex" }}>
                <ThemeToggle />
              </div>
            </div>
          )}

          {/* --- MOBILE HAMBURGER BUTTON --- */}
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <ThemeToggle />
              <button
                onClick={() => setOpen(!open)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#ffffff",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* --- MOBILE DROPDOWN MENU --- */}
        {isMobile && open && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              paddingTop: "12px",
              paddingBottom: "24px",
              borderTop: "1px solid #333333",
            }}
          >
            {[...links].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontSize: "15px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  color: isActive(link.to) ? "#ffffff" : "#a3a3a3",
                  fontWeight: isActive(link.to) ? "600" : "500",
                  backgroundColor: isActive(link.to) ? "#1a1a1a" : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
            
            <Link
              to="/register"
              style={{
                marginTop: "8px",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "700",
                textDecoration: "none",
                color: "#000",
                background: "#fff",
                textAlign: "center",
              }}
            >
              Get Started →
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default GuestNavbar;