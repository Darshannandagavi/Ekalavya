
import { useTheme } from "../context/ThemeContext";
import { CiLight } from "react-icons/ci";
import {  MdOutlineDarkMode } from "react-icons/md";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      title="Toggle theme"
      style={{  border: "2px solid var(--border)", borderRadius: "50%", color: "var(--text-muted)", cursor: "pointer", padding: "10px 10px", fontSize: "16px", lineHeight: 1, transition: "all 0.2s" }}
    >
      {theme === "dark" ? <CiLight /> : <MdOutlineDarkMode />

}
    </button>
  );
}

export default ThemeToggle;
