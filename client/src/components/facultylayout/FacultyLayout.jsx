import { Outlet } from "react-router-dom";
import FacultyNavbar from "./FacultyNavbar";

function FacultyLayout() {
  return (
    <>
      <FacultyNavbar />

      <main
        style={{
          padding: 30,
          background: "var(--bg-card)",
          minHeight:"100vh"
        }}
      >
        <Outlet />
      </main>
    </>
  );
}

export default FacultyLayout;