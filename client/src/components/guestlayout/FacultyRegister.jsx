import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../axiosConfig";

function FacultyRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    university: "",
    course: "",
  });

  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchUniversities();
  }, []);

  useEffect(() => {
    if (form.university) {
      fetchCourses(form.university);
    } else {
      setCourses([]);
      setForm((prev) => ({ ...prev, course: "" }));
    }
  }, [form.university]);

  const fetchUniversities = async () => {
    try {
      const res = await API.get("/academic/universities");
      setUniversities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCourses = async (id) => {
    try {
      const res = await API.get(`/academic/courses/${id}`);
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const res = await API.post("/faculty/register", form);

      setSuccess(res.data.message);

      setTimeout(() => {
        navigate("/faculty-login");
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid var(--border)",
    background: "var(--bg-input)",
    color: "var(--text-main)",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 500,
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          <h2>Faculty Registration</h2>

          <p style={{ color: "var(--text-muted)" }}>
            Register as a faculty member
          </p>
        </div>

        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: 35,
          }}
        >
          {error && (
            <div
              style={{
                color: "#ef4444",
                marginBottom: 20,
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                color: "#22c55e",
                marginBottom: 20,
              }}
            >
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <input
              style={inputStyle}
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              style={inputStyle}
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              style={inputStyle}
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <input
              style={inputStyle}
              placeholder="Designation"
              name="designation"
              value={form.designation}
              onChange={handleChange}
            />

            <select
              style={inputStyle}
              name="university"
              value={form.university}
              onChange={handleChange}
              required
            >
              <option value="">Select University</option>

              {universities.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>

            <select
              style={inputStyle}
              name="course"
              value={form.course}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>

              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <button
              disabled={loading}
              style={{
                padding: 14,
                border: "none",
                borderRadius: 10,
                background: "var(--primary)",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {loading
                ? "Registering..."
                : "Register as Faculty"}
            </button>
          </form>

          <p
            style={{
              marginTop: 25,
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Already registered?{" "}
            <Link
              to="/faculty-login"
              style={{
                color: "var(--primary)",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Faculty Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FacultyRegister;