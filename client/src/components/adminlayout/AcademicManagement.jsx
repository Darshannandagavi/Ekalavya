import { useEffect, useState } from "react";
import API from "../../axiosConfig"; // use your existing axios instance

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const inputStyle = {
  border: "1px solid var(--border)", borderRadius: "8px",
  padding: "10px 12px", backgroundColor: "var(--bg-card)",
  color: "var(--text-main)", fontSize: "14px", outline: "none",
  width: "100%", boxSizing: "border-box",
};
const btnStyle = (variant = "primary") => ({
  padding: "8px 16px", borderRadius: "8px", fontSize: "13px",
  fontWeight: "600", border: "none", cursor: "pointer",
  background: variant === "primary" ? "var(--primary)"
            : variant === "danger"  ? "#e05252"
            : variant === "ghost"   ? "transparent"
            : "var(--bg-main)",
  color: variant === "primary" || variant === "danger" ? "#fff" : "var(--text-muted)",
  border: variant === "ghost" || variant === "secondary"
    ? "1px solid var(--border)" : "none",
});

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
  const colors = {
    success: { bg: "#dcfce7", color: "#166534" },
    error:   { bg: "#fee2e2", color: "#b91c1c" },
    warn:    { bg: "#fef9c3", color: "#854d0e" },
  };
  const c = colors[type] || colors.success;
  return (
    <div style={{
      position: "fixed", bottom: "28px", right: "28px", zIndex: 9999,
      padding: "12px 20px", borderRadius: "10px", ...c,
      fontWeight: "600", fontSize: "13px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    }}>{message}</div>
  );
}

// ─── CONFIRM DIALOG ───────────────────────────────────────────────────────────
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "28px", maxWidth: "360px", width: "90vw", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>
        <p style={{ margin: "0 0 20px", fontSize: "15px", color: "var(--text-main)", lineHeight: 1.5 }}>{message}</p>
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={btnStyle("secondary")}>Cancel</button>
          <button onClick={onConfirm} style={btnStyle("danger")}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION WRAPPER ─────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <section style={{ border: "1px solid var(--border)", borderRadius: "16px", padding: "32px", backgroundColor: "var(--bg-card)", marginBottom: "32px" }}>
      <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "24px", color: "var(--text-main)", margin: "0 0 24px" }}>{title}</h2>
      {children}
    </section>
  );
}

// ─── INLINE EDIT ROW ─────────────────────────────────────────────────────────
// Used for university rows — single field edit
function EditableRow({ label, onSave, onDelete, children, editContent }) {
  const [editing, setEditing] = useState(false);
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: "10px", padding: "14px 18px", backgroundColor: "var(--bg-main)", display: "flex", alignItems: "center", gap: "12px" }}>
      {editing ? (
        <>
          {editContent}
          <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
            <button onClick={() => { onSave(); setEditing(false); }} style={btnStyle("primary")}>Save</button>
            <button onClick={() => setEditing(false)} style={btnStyle("secondary")}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <span style={{ flex: 1, fontSize: "14px", color: "var(--text-main)" }}>{label}</span>
          <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
            <button onClick={() => setEditing(true)} style={btnStyle("secondary")}>Edit</button>
            <button onClick={onDelete} style={btnStyle("danger")}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
export default function AcademicManagement() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [universities, setUniversities] = useState([]);
  const [toast, setToast]               = useState(null);
  const [confirm, setConfirm]           = useState(null); // { message, onConfirm }

  // University form
  const [uniName, setUniName]           = useState("");
  const [editUniNames, setEditUniNames] = useState({}); // { [id]: name }

  // Course form
  const [courseData, setCourseData]     = useState({ name: "", universityId: "", totalSemesters: "" });
  const [coursesList, setCoursesList]   = useState([]); // for list view
  const [listUniId, setListUniId]       = useState(""); // selected uni for list
  const [editCourse, setEditCourse]     = useState({}); // { [id]: { name, totalSemesters } }

  // Subject form
  const [subjectData, setSubjectData]   = useState({ universityId: "", courseId: "", semester: "", name: "" });
  const [subjectCourses, setSubjectCourses] = useState([]);
  const [subjectSemCount, setSubjectSemCount] = useState(0);
  const [subjectsList, setSubjectsList] = useState([]);
  const [listCourseId, setListCourseId] = useState("");
  const [listSemester, setListSemester] = useState("");
  const [listCourseSems, setListCourseSems] = useState(0);
  const [editSubject, setEditSubject]   = useState({}); // { [id]: { name, semester } }
  const [listUniIdForSubject, setListUniIdForSubject] = useState("");
  const [listCoursesForSubject, setListCoursesForSubject] = useState([]);

  const showToast = (message, type = "success") => setToast({ message, type });
  const askConfirm = (message, onConfirm) => setConfirm({ message, onConfirm });

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchUniversities = async () => {
    try {
      const r = await API.get("/academic/universities");
      setUniversities(r.data);
    } catch { showToast("Failed to load universities", "error"); }
  };

  useEffect(() => { fetchUniversities(); }, []);

  const loadCoursesForList = async (uniId) => {
    if (!uniId) { setCoursesList([]); return; }
    try {
      const r = await API.get(`/academic/courses/${uniId}`);
      setCoursesList(r.data);
      // init edit state
      const map = {};
      r.data.forEach((c) => { map[c._id] = { name: c.name, totalSemesters: c.totalSemesters }; });
      setEditCourse(map);
    } catch { showToast("Failed to load courses", "error"); }
  };

  const loadSubjectsForList = async (courseId, semester) => {
    if (!courseId || !semester) { setSubjectsList([]); return; }
    try {
      const r = await API.get(`/academic/subjects/${courseId}/${semester}`);
      setSubjectsList(r.data);
      const map = {};
      r.data.forEach((s) => { map[s._id] = { name: s.name, semester: s.semester }; });
      setEditSubject(map);
    } catch { showToast("Failed to load subjects", "error"); }
  };

  // ── UNIVERSITY CRUD ────────────────────────────────────────────────────────
  const handleAddUniversity = async (e) => {
    e.preventDefault();
    try {
      await API.post("/academic/universities", { name: uniName });
      setUniName("");
      showToast("University added ✓");
      fetchUniversities();
    } catch (err) { showToast(err.response?.data?.message || "Failed", "error"); }
  };

  const handleUpdateUniversity = async (id) => {
    try {
      await API.put(`/academic/universities/${id}`, { name: editUniNames[id] });
      showToast("University updated ✓");
      fetchUniversities();
    } catch (err) { showToast(err.response?.data?.message || "Failed", "error"); }
  };

  const handleDeleteUniversity = (uni) => {
    askConfirm(
      `Delete "${uni.name}"? This will also delete all its courses and subjects.`,
      async () => {
        try {
          await API.delete(`/academic/universities/${uni._id}`);
          showToast("University deleted");
          fetchUniversities();
          if (listUniId === uni._id) { setCoursesList([]); setListUniId(""); }
        } catch { showToast("Failed to delete", "error"); }
        setConfirm(null);
      }
    );
  };

  // ── COURSE CRUD ────────────────────────────────────────────────────────────
  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await API.post("/academic/courses", courseData);
      setCourseData({ name: "", universityId: "", totalSemesters: "" });
      showToast("Course added ✓");
      if (listUniId === courseData.universityId) loadCoursesForList(listUniId);
    } catch (err) { showToast(err.response?.data?.message || "Failed", "error"); }
  };

  const handleUpdateCourse = async (id) => {
    try {
      await API.put(`/academic/courses/${id}`, editCourse[id]);
      showToast("Course updated ✓");
      loadCoursesForList(listUniId);
    } catch (err) { showToast(err.response?.data?.message || "Failed", "error"); }
  };

  const handleDeleteCourse = (course) => {
    askConfirm(
      `Delete "${course.name}"? This will also delete all its subjects.`,
      async () => {
        try {
          await API.delete(`/academic/courses/${course._id}`);
          showToast("Course deleted");
          loadCoursesForList(listUniId);
          if (listCourseId === course._id) { setSubjectsList([]); setListCourseId(""); }
        } catch { showToast("Failed to delete", "error"); }
        setConfirm(null);
      }
    );
  };

  // ── SUBJECT CRUD ───────────────────────────────────────────────────────────
  const handleSubjectUniChange = async (id) => {
    setSubjectData((p) => ({ ...p, universityId: id, courseId: "", semester: "" }));
    setSubjectSemCount(0);
    if (id) {
      const r = await API.get(`/academic/courses/${id}`);
      setSubjectCourses(r.data);
    } else {
      setSubjectCourses([]);
    }
  };

  const handleSubjectCourseChange = (courseId) => {
    const c = subjectCourses.find((x) => x._id === courseId);
    setSubjectData((p) => ({ ...p, courseId, semester: "" }));
    setSubjectSemCount(c?.totalSemesters || 0);
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      await API.post("/academic/subjects", subjectData);
      setSubjectData({ universityId: "", courseId: "", semester: "", name: "" });
      setSubjectCourses([]); setSubjectSemCount(0);
      showToast("Subject added ✓");
      if (listCourseId && listSemester) loadSubjectsForList(listCourseId, listSemester);
    } catch (err) { showToast(err.response?.data?.message || "Failed", "error"); }
  };

  const handleUpdateSubject = async (id) => {
    try {
      await API.put(`/academic/subjects/${id}`, editSubject[id]);
      showToast("Subject updated ✓");
      loadSubjectsForList(listCourseId, listSemester);
    } catch (err) { showToast(err.response?.data?.message || "Failed", "error"); }
  };

  const handleDeleteSubject = (subject) => {
    askConfirm(`Delete subject "${subject.name}"?`, async () => {
      try {
        await API.delete(`/academic/subjects/${subject._id}`);
        showToast("Subject deleted");
        loadSubjectsForList(listCourseId, listSemester);
      } catch { showToast("Failed to delete", "error"); }
      setConfirm(null);
    });
  };

  // ── helper: selected course for subject list filter ────────────────────────
  const selectedListCourse = listCoursesForSubject.find((c) => c._id === listCourseId);

  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px 96px", color: "var(--text-main)" }}>
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
      {confirm && <ConfirmDialog message={confirm.message} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}

      <h1 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "48px", color: "var(--text-main)" }}>
        Academic Management
      </h1>

      {/* ══ UNIVERSITIES ══════════════════════════════════════════════════════ */}
      <Section title="Universities">
        {/* Add form */}
        <form onSubmit={handleAddUniversity} style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
          <input
            type="text" placeholder="University Name" value={uniName}
            onChange={(e) => setUniName(e.target.value)}
            style={{ ...inputStyle, flex: "1 1 250px" }} required
          />
          <button type="submit" style={btnStyle("primary")}>Add University</button>
        </form>

        {/* List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {universities.length === 0 && <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>No universities yet.</p>}
          {universities.map((uni) => (
            <div key={uni._id} style={{ border: "1px solid var(--border)", borderRadius: "10px", padding: "14px 18px", background: "var(--bg-main)", display: "flex", alignItems: "center", gap: "12px" }}>
              {editUniNames[uni._id] !== undefined ? (
                <>
                  <input
                    style={{ ...inputStyle, flex: 1 }}
                    value={editUniNames[uni._id]}
                    onChange={(e) => setEditUniNames((p) => ({ ...p, [uni._id]: e.target.value }))}
                    autoFocus
                  />
                  <button onClick={() => handleUpdateUniversity(uni._id)} style={btnStyle("primary")}>Save</button>
                  <button onClick={() => setEditUniNames((p) => { const n = { ...p }; delete n[uni._id]; return n; })} style={btnStyle("secondary")}>Cancel</button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1, fontSize: "14px", color: "var(--text-main)", fontWeight: "500" }}>{uni.name}</span>
                  <button onClick={() => setEditUniNames((p) => ({ ...p, [uni._id]: uni.name }))} style={btnStyle("secondary")}>Edit</button>
                  <button onClick={() => handleDeleteUniversity(uni)} style={btnStyle("danger")}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ══ COURSES ═══════════════════════════════════════════════════════════ */}
      <Section title="Courses">
        {/* Add form */}
        <form onSubmit={handleAddCourse} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "28px" }}>
          <input type="text" placeholder="Course Name" value={courseData.name}
            onChange={(e) => setCourseData((p) => ({ ...p, name: e.target.value }))}
            style={inputStyle} required />
          <select value={courseData.universityId}
            onChange={(e) => setCourseData((p) => ({ ...p, universityId: e.target.value }))}
            style={inputStyle} required>
            <option value="">Select University</option>
            {universities.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>
          <input type="number" placeholder="Total Semesters" value={courseData.totalSemesters}
            onChange={(e) => setCourseData((p) => ({ ...p, totalSemesters: e.target.value }))}
            style={inputStyle} required min="1" />
          <button type="submit" style={{ ...btnStyle("primary"), gridColumn: "1 / -1" }}>Add Course</button>
        </form>

        {/* Filter by university to view/edit/delete */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
          <p style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "12px" }}>
            Manage Existing Courses
          </p>
          <select value={listUniId} onChange={(e) => { setListUniId(e.target.value); loadCoursesForList(e.target.value); }}
            style={{ ...inputStyle, maxWidth: "280px", marginBottom: "16px" }}>
            <option value="">Select University to view courses</option>
            {universities.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {listUniId && coursesList.length === 0 && <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>No courses for this university.</p>}
            {coursesList.map((course) => (
              <div key={course._id} style={{ border: "1px solid var(--border)", borderRadius: "10px", padding: "14px 18px", background: "var(--bg-main)" }}>
                {editCourse[course._id]?.editing ? (
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                    <input
                      style={{ ...inputStyle, flex: 2, minWidth: "140px" }}
                      value={editCourse[course._id].name}
                      onChange={(e) => setEditCourse((p) => ({ ...p, [course._id]: { ...p[course._id], name: e.target.value } }))}
                      placeholder="Course name"
                    />
                    <input
                      type="number" min="1"
                      style={{ ...inputStyle, flex: 1, minWidth: "100px" }}
                      value={editCourse[course._id].totalSemesters}
                      onChange={(e) => setEditCourse((p) => ({ ...p, [course._id]: { ...p[course._id], totalSemesters: e.target.value } }))}
                      placeholder="Semesters"
                    />
                    <button onClick={() => handleUpdateCourse(course._id)} style={btnStyle("primary")}>Save</button>
                    <button onClick={() => setEditCourse((p) => ({ ...p, [course._id]: { ...p[course._id], editing: false } }))} style={btnStyle("secondary")}>Cancel</button>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-main)" }}>{course.name}</span>
                      <span style={{ marginLeft: "10px", fontSize: "12px", color: "var(--text-muted)", background: "var(--bg-card)", border: "1px solid var(--border)", padding: "2px 8px", borderRadius: "20px" }}>
                        {course.totalSemesters} semesters
                      </span>
                    </div>
                    <button onClick={() => setEditCourse((p) => ({ ...p, [course._id]: { ...p[course._id], editing: true } }))} style={btnStyle("secondary")}>Edit</button>
                    <button onClick={() => handleDeleteCourse(course)} style={btnStyle("danger")}>Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══ SUBJECTS ══════════════════════════════════════════════════════════ */}
      <Section title="Subjects">
        {/* Add form */}
        <form onSubmit={handleAddSubject} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "28px" }}>
          <select value={subjectData.universityId} onChange={(e) => handleSubjectUniChange(e.target.value)} style={inputStyle} required>
            <option value="">Select University</option>
            {universities.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>
          <select value={subjectData.courseId} onChange={(e) => handleSubjectCourseChange(e.target.value)} style={inputStyle} required disabled={!subjectCourses.length}>
            <option value="">Select Course</option>
            {subjectCourses.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <select value={subjectData.semester} onChange={(e) => setSubjectData((p) => ({ ...p, semester: e.target.value }))} style={inputStyle} required disabled={!subjectSemCount}>
            <option value="">Select Semester</option>
            {[...Array(subjectSemCount)].map((_, i) => <option key={i + 1} value={i + 1}>Semester {i + 1}</option>)}
          </select>
          <input type="text" placeholder="Subject Name" value={subjectData.name}
            onChange={(e) => setSubjectData((p) => ({ ...p, name: e.target.value }))}
            style={inputStyle} required />
          <button type="submit" style={{ ...btnStyle("primary"), gridColumn: "1 / -1" }}>Add Subject</button>
        </form>

        {/* Filter to view/edit/delete */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
          <p style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "12px" }}>
            Manage Existing Subjects
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px", marginBottom: "16px" }}>
            {/* Uni picker */}
            <select value={listUniIdForSubject} onChange={async (e) => {
              setListUniIdForSubject(e.target.value);
              setListCourseId(""); setListSemester(""); setSubjectsList([]);
              if (e.target.value) {
                const r = await API.get(`/academic/courses/${e.target.value}`);
                setListCoursesForSubject(r.data);
              } else {
                setListCoursesForSubject([]);
              }
            }} style={inputStyle}>
              <option value="">Select University</option>
              {universities.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
            </select>

            {/* Course picker */}
            <select value={listCourseId} onChange={(e) => {
              const id = e.target.value;
              setListCourseId(id); setListSemester(""); setSubjectsList([]);
              const c = listCoursesForSubject.find((x) => x._id === id);
              setListCourseSems(c?.totalSemesters || 0);
            }} style={inputStyle} disabled={!listCoursesForSubject.length}>
              <option value="">Select Course</option>
              {listCoursesForSubject.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>

            {/* Semester picker */}
            <select value={listSemester} onChange={(e) => {
              setListSemester(e.target.value);
              loadSubjectsForList(listCourseId, e.target.value);
            }} style={inputStyle} disabled={!listCourseId}>
              <option value="">Select Semester</option>
              {[...Array(listCourseSems)].map((_, i) => <option key={i + 1} value={i + 1}>Semester {i + 1}</option>)}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {listCourseId && listSemester && subjectsList.length === 0 && (
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>No subjects for this selection.</p>
            )}
            {subjectsList.map((subject) => (
              <div key={subject._id} style={{ border: "1px solid var(--border)", borderRadius: "10px", padding: "14px 18px", background: "var(--bg-main)" }}>
                {editSubject[subject._id]?.editing ? (
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                    <input
                      style={{ ...inputStyle, flex: 2, minWidth: "140px" }}
                      value={editSubject[subject._id].name}
                      onChange={(e) => setEditSubject((p) => ({ ...p, [subject._id]: { ...p[subject._id], name: e.target.value } }))}
                      placeholder="Subject name"
                    />
                    <select
                      style={{ ...inputStyle, flex: 1 }}
                      value={editSubject[subject._id].semester}
                      onChange={(e) => setEditSubject((p) => ({ ...p, [subject._id]: { ...p[subject._id], semester: e.target.value } }))}
                    >
                      {[...Array(listCourseSems)].map((_, i) => <option key={i + 1} value={i + 1}>Semester {i + 1}</option>)}
                    </select>
                    <button onClick={() => handleUpdateSubject(subject._id)} style={btnStyle("primary")}>Save</button>
                    <button onClick={() => setEditSubject((p) => ({ ...p, [subject._id]: { ...p[subject._id], editing: false } }))} style={btnStyle("secondary")}>Cancel</button>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-main)" }}>{subject.name}</span>
                      <span style={{ marginLeft: "10px", fontSize: "12px", color: "var(--text-muted)", background: "var(--bg-card)", border: "1px solid var(--border)", padding: "2px 8px", borderRadius: "20px" }}>
                        Sem {subject.semester}
                      </span>
                    </div>
                    <button onClick={() => setEditSubject((p) => ({ ...p, [subject._id]: { ...p[subject._id], editing: true } }))} style={btnStyle("secondary")}>Edit</button>
                    <button onClick={() => handleDeleteSubject(subject)} style={btnStyle("danger")}>Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}