import { Link } from "react-router-dom";

import HeroText from "./HeroText";
import FiberBurst from "../../StyledComponents/Fiberburst";
import MeshText from "../../StyledComponents/MeshText";

function GuestFooter() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
    { to: "/login", label: "Login" },
  ];

  return (
    <footer
      style={{
        position: "relative",
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <div>{/* <FiberBurst/> */}</div>

      {/* Jelly animated footer text */}
      <div
        style={{
          width: "100%",
          height: "clamp(110px, 18vw, 230px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <MeshText
          text="EKALAVYA"
          color="rgb(48, 48, 48)"
          font={{
            fontFamily: "Inter",
            variant: "Bold",
            fontSize: 160,
            fontWeight: 700,
            fontStyle: "normal",
            lineHeight: "1em",
            letterSpacing: "0em",
          }}
          colorSplit={true}
          customColors={["#c9c5c7", "#cacaca"]}
          force={18}
        />
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "48px 24px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "var(--primary)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "900",
                fontSize: "13px",
              }}
            >
              E
            </div>

            <span
              style={{
                fontWeight: "700",
                color: "var(--text-main)",
                fontSize: "15px",
              }}
            >
              Ekalavya
            </span>
          </div>

          <p
            style={{
              color: "var(--text-faint)",
              fontSize: "12px",
              margin: 0,
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} Ekalavya. All rights reserved.
          </p>

          <div
            style={{
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  color: "var(--text-faint)",
                  fontSize: "13px",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-faint)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default GuestFooter;
