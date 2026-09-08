import { useEffect, useMemo, useState } from "react";
import API from "../../axiosConfig";

export default function StudentNotes() {
  // ============================================================
  // ACADEMIC DATA
  // ============================================================

  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);

  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const [academicLoading, setAcademicLoading] = useState(true);
  const [courseLoading, setCourseLoading] = useState(false);

  // ============================================================
  // NOTES
  // ============================================================

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeNote, setActiveNote] = useState(null);

  const [search, setSearch] = useState("");
  const [activeSubject, setActiveSubject] = useState("all");

  // ============================================================
  // RESPONSIVE
  // ============================================================

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [mobileView, setMobileView] = useState("list");

  // ============================================================
  // FETCH UNIVERSITIES
  // ============================================================

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setAcademicLoading(true);

        const res = await API.get("/academic/universities");

        setUniversities(res.data || []);
      } catch (error) {
        console.error("Failed to fetch universities:", error);
      } finally {
        setAcademicLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // ============================================================
  // RESPONSIVE
  // ============================================================

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;

      setIsMobile(mobile);

      if (!mobile) {
        setMobileView("list");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ============================================================
  // UNIVERSITY CHANGE
  // ============================================================

  const handleUniversityChange = async (e) => {
    const universityId = e.target.value;

    setSelectedUniversity(universityId);
    setSelectedCourse("");
    setSelectedSemester("");

    setCourses([]);

    setNotes([]);
    setActiveNote(null);
    setActiveSubject("all");
    setSearch("");

    if (!universityId) {
      return;
    }

    try {
      setCourseLoading(true);

      const res = await API.get(`/academic/courses/${universityId}`);

      setCourses(res.data || []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setCourseLoading(false);
    }
  };

  // ============================================================
  // COURSE CHANGE
  // ============================================================

  const handleCourseChange = (e) => {
    const courseId = e.target.value;

    setSelectedCourse(courseId);
    setSelectedSemester("");

    setNotes([]);
    setActiveNote(null);
    setActiveSubject("all");
    setSearch("");
  };

  // ============================================================
  // SELECTED COURSE
  // ============================================================

  const selectedCourseData = courses.find(
    (course) => course._id === selectedCourse,
  );

  // ============================================================
  // FETCH NOTES
  // ============================================================

  useEffect(() => {
    if (!selectedUniversity || !selectedCourse || !selectedSemester) {
      setNotes([]);
      setActiveNote(null);
      setLoading(false);
      return;
    }

    const fetchNotes = async () => {
      try {
        setLoading(true);
        setActiveSubject("all");

        const res = await API.get("/notes/student", {
          params: {
            universityId: selectedUniversity,
            courseId: selectedCourse,
            semester: selectedSemester,
          },
        });

        const fetchedNotes = res.data || [];

        setNotes(fetchedNotes);

        if (fetchedNotes.length > 0) {
          setActiveNote(fetchedNotes[0]._id);
        } else {
          setActiveNote(null);
        }

        setMobileView("list");
      } catch (error) {
        console.error("Failed to fetch notes:", error);

        setNotes([]);
        setActiveNote(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [selectedUniversity, selectedCourse, selectedSemester]);

  // ============================================================
  // SUBJECTS
  // ============================================================

  const subjects = useMemo(() => {
    const uniqueSubjects = new Map();

    notes.forEach((note) => {
      if (note.subject?._id) {
        uniqueSubjects.set(note.subject._id, {
          id: note.subject._id,
          name: note.subject.name,
        });
      }
    });

    return [
      {
        id: "all",
        name: "All Notes",
      },
      ...Array.from(uniqueSubjects.values()),
    ];
  }, [notes]);

  // ============================================================
  // FILTER NOTES
  // ============================================================

  const filtered = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return notes.filter((note) => {
      const matchSubject =
        activeSubject === "all" || note.subject?._id === activeSubject;

      const matchSearch =
        !searchTerm || note.title?.toLowerCase().includes(searchTerm);

      return matchSubject && matchSearch;
    });
  }, [notes, search, activeSubject]);

  // ============================================================
  // CURRENT NOTE
  // ============================================================

  const currentNote = notes.find((note) => note._id === activeNote);

  // ============================================================
  // SORTED NOTES
  // ============================================================

  const sortedFiltered = useMemo(() => {
    return [...filtered].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [filtered]);

  // ============================================================
  // NAVIGATION
  // ============================================================

  const currentIndex = sortedFiltered.findIndex(
    (note) => note._id === activeNote,
  );

  const previousNote =
    currentIndex > 0 ? sortedFiltered[currentIndex - 1] : null;

  const nextNote =
    currentIndex !== -1 && currentIndex < sortedFiltered.length - 1
      ? sortedFiltered[currentIndex + 1]
      : null;

  // ============================================================
  // HELPERS
  // ============================================================

  const openNote = (noteId) => {
    setActiveNote(noteId);

    if (isMobile) {
      setMobileView("content");

      setTimeout(() => {
        const content = document.getElementById("student-notes-content");

        if (content) {
          content.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }, 50);
    }
  };

  const goToPrevious = () => {
    if (!previousNote) return;

    setActiveNote(previousNote._id);

    if (isMobile) {
      const content = document.getElementById("student-notes-content");

      if (content) {
        content.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  const goToNext = () => {
    if (!nextNote) return;

    setActiveNote(nextNote._id);

    if (isMobile) {
      const content = document.getElementById("student-notes-content");

      if (content) {
        content.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      <style>{`
        /* ======================================================
           GLOBAL SCROLLBARS
        ====================================================== */

        .student-notes-root *,
        .student-notes-root *::before,
        .student-notes-root *::after {
          box-sizing: border-box;
        }

        .student-notes-root ::-webkit-scrollbar {
          width: 7px;
          height: 7px;
        }

        .student-notes-root ::-webkit-scrollbar-track {
          background: transparent;
        }

        .student-notes-root ::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 999px;
        }

        .student-notes-root ::-webkit-scrollbar-thumb:hover {
          background: var(--text-muted);
        }

        .student-notes-root {
          scrollbar-width: thin;
          scrollbar-color: var(--border) transparent;
        }

        /* ======================================================
           ROOT
        ====================================================== */

        .student-notes-root {
          width: 100%;
          height: calc(100vh - 64px);
          overflow: hidden;
          background: var(--bg-main);
          color: var(--text-main);
        }

        /* ======================================================
           LAYOUT
        ====================================================== */

        .student-notes-layout {
          display: flex;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        /* ======================================================
           SIDEBAR
        ====================================================== */

        .student-notes-sidebar {
          width: 340px;
          min-width: 340px;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: var(--bg-card);
          border-right: 1px solid var(--border);
          overflow: hidden;
        }

        /* ======================================================
           SIDEBAR HEADER
        ====================================================== */

        .notes-sidebar-header {
          padding: 24px 20px 20px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }

        .notes-eyebrow {
          margin: 0 0 5px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--primary);
        }

        .notes-title {
          margin: 0 0 20px;
          font-size: 23px;
          line-height: 1.2;
          font-weight: 850;
          letter-spacing: -0.5px;
          color: var(--text-main);
        }

        /* ======================================================
           SELECT GROUP
        ====================================================== */

        .academic-group {
          margin-bottom: 13px;
        }

        .academic-label {
          display: block;
          margin-bottom: 6px;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .academic-select-wrapper {
          position: relative;
        }

        .academic-select {
          width: 100%;
          height: 42px;
          padding: 0 38px 0 12px;
          border: 1px solid var(--border);
          border-radius: 10px;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          background: var(--bg-main);
          color: var(--text-main);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition:
            border-color 0.18s ease,
            box-shadow 0.18s ease,
            background 0.18s ease;
        }

        .academic-select:hover:not(:disabled) {
          border-color: var(--text-muted);
        }

        .academic-select:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px color-mix(
            in srgb,
            var(--primary) 12%,
            transparent
          );
        }

        .academic-select:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .select-arrow {
          position: absolute;
          right: 13px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: var(--text-muted);
          font-size: 11px;
        }

        /* ======================================================
           SEARCH
        ====================================================== */

        .notes-search {
          position: relative;
          margin-top: 18px;
        }

        .notes-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 14px;
          pointer-events: none;
        }

        .notes-search input {
          width: 100%;
          height: 40px;
          padding: 0 36px 0 34px;
          border: 1px solid var(--border);
          border-radius: 10px;
          outline: none;
          background: var(--bg-main);
          color: var(--text-main);
          font-size: 13px;
          transition:
            border-color 0.18s ease,
            box-shadow 0.18s ease;
        }

        .notes-search input::placeholder {
          color: var(--text-faint);
        }

        .notes-search input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px color-mix(
            in srgb,
            var(--primary) 10%,
            transparent
          );
        }

        .clear-search {
          position: absolute;
          right: 9px;
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .clear-search:hover {
          background: var(--border);
          color: var(--text-main);
        }

        /* ======================================================
           SUBJECT FILTER
        ====================================================== */

        .subject-filter {
          display: flex;
          gap: 7px;
          padding: 13px 18px;
          border-bottom: 1px solid var(--border);
          overflow-x: auto;
          flex-shrink: 0;
          scrollbar-width: thin;
        }

        .subject-filter::-webkit-scrollbar {
          height: 4px;
        }

        .subject-pill {
          flex-shrink: 0;
          height: 31px;
          padding: 0 13px;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: transparent;
          color: var(--text-muted);
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
          cursor: pointer;
          transition:
            background 0.15s ease,
            color 0.15s ease,
            border-color 0.15s ease;
        }

        .subject-pill:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .subject-pill.active {
          border-color: var(--primary);
          background: var(--primary);
          color: #fff;
        }

        /* ======================================================
           NOTES LIST
        ====================================================== */

        .notes-list {
          flex: 1;
          overflow-y: auto;
          padding: 9px 10px;
        }

        .note-list-item {
          width: 100%;
          display: block;
          margin-bottom: 4px;
          padding: 12px;
          border: 1px solid transparent;
          border-radius: 11px;
          background: transparent;
          color: var(--text-main);
          text-align: left;
          cursor: pointer;
          transition:
            background 0.15s ease,
            border-color 0.15s ease,
            transform 0.15s ease;
        }

        .note-list-item:hover {
          background: var(--bg-main);
        }

        .note-list-item.active {
          border-color: color-mix(
            in srgb,
            var(--primary) 35%,
            transparent
          );
          background: color-mix(
            in srgb,
            var(--primary) 8%,
            var(--bg-main)
          );
        }

        .note-list-row {
          display: flex;
          align-items: flex-start;
          gap: 11px;
        }

        .note-number {
          width: 27px;
          min-width: 27px;
          height: 27px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: var(--border);
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 800;
          transition:
            background 0.15s ease,
            color 0.15s ease;
        }

        .note-list-item.active .note-number {
          background: var(--primary);
          color: #fff;
        }

        .note-list-info {
          min-width: 0;
          flex: 1;
        }

        .note-list-title {
          margin: 1px 0 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 13px;
          line-height: 1.35;
          font-weight: 650;
          color: var(--text-main);
        }

        .note-list-item.active .note-list-title {
          color: var(--primary);
        }

        .note-list-subject {
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 10px;
          font-weight: 600;
          color: var(--text-muted);
        }

        /* ======================================================
           EMPTY SIDEBAR
        ====================================================== */

        .notes-empty {
          padding: 50px 22px;
          text-align: center;
          color: var(--text-muted);
        }

        .empty-icon {
          width: 52px;
          height: 52px;
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
          background: var(--bg-main);
          border: 1px solid var(--border);
          font-size: 23px;
        }

        .notes-empty h3 {
          margin: 0 0 7px;
          color: var(--text-main);
          font-size: 14px;
          font-weight: 750;
        }

        .notes-empty p {
          margin: 0;
          font-size: 12px;
          line-height: 1.6;
        }

        /* ======================================================
           SIDEBAR FOOTER
        ====================================================== */

        .notes-sidebar-footer {
          padding: 11px 19px;
          border-top: 1px solid var(--border);
          flex-shrink: 0;
        }

        .notes-count {
          margin: 0;
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 600;
        }

        /* ======================================================
           MAIN CONTENT
        ====================================================== */

        .student-notes-main {
          flex: 1;
          min-width: 0;
          height: 100%;
          overflow-y: auto;
          background: var(--bg-main);
          scrollbar-width: thin;
        }

        .student-notes-main-inner {
          width: 100%;
          max-width: 850px;
          min-height: 100%;
          margin: 0 auto;
          padding: 48px 55px 70px;
        }

        /* ======================================================
           TOP ACADEMIC BADGE
        ====================================================== */

        .selection-summary {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 25px;
        }

        .selection-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: var(--bg-card);
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 650;
        }

        .selection-chip strong {
          color: var(--text-main);
          font-weight: 750;
        }

        /* ======================================================
           WELCOME / EMPTY MAIN
        ====================================================== */

        .main-empty {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .main-empty-card {
          max-width: 440px;
        }

        .main-empty-icon {
          width: 74px;
          height: 74px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 22px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          font-size: 32px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
        }

        .main-empty h2 {
          margin: 0 0 8px;
          font-size: 25px;
          font-weight: 850;
          letter-spacing: -0.5px;
          color: var(--text-main);
        }

        .main-empty p {
          margin: 0;
          font-size: 13px;
          line-height: 1.7;
          color: var(--text-muted);
        }

        /* ======================================================
           NOTE HEADER
        ====================================================== */

        .note-header {
          padding-bottom: 27px;
          margin-bottom: 30px;
          border-bottom: 1px solid var(--border);
        }

        .note-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 13px;
        }

        .subject-badge {
          display: inline-flex;
          align-items: center;
          padding: 5px 10px;
          border-radius: 999px;
          background: color-mix(
            in srgb,
            var(--primary) 10%,
            var(--bg-main)
          );
          border: 1px solid color-mix(
            in srgb,
            var(--primary) 20%,
            transparent
          );
          color: var(--primary);
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        .chapter-label {
          padding: 5px 9px;
          border-radius: 7px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 650;
        }

        .note-header h1 {
          margin: 0 0 12px;
          color: var(--text-main);
          font-size: 38px;
          line-height: 1.16;
          letter-spacing: -1.2px;
          font-weight: 900;
        }

        .note-updated {
          margin: 0;
          color: var(--text-muted);
          font-size: 11px;
          font-weight: 500;
        }

        /* ======================================================
           NOTE CONTENT
        ====================================================== */

        .note-content {
          color: var(--text-main);
          font-size: 15px;
          line-height: 1.8;
        }

        .note-content h1 {
          margin: 0 0 24px;
          font-size: 30px;
          line-height: 1.25;
          font-weight: 850;
        }

        .note-content h2 {
          margin: 34px 0 14px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border);
          font-size: 22px;
          line-height: 1.3;
          font-weight: 800;
        }

        .note-content h3 {
          margin: 27px 0 11px;
          font-size: 18px;
          line-height: 1.35;
          font-weight: 750;
        }

        .note-content h4 {
          margin: 22px 0 9px;
          font-size: 15px;
          font-weight: 750;
        }

        .note-content p {
          margin: 0 0 17px;
          color: var(--text-main);
          line-height: 1.8;
        }

        .note-content ul,
        .note-content ol {
          margin: 0 0 20px;
          padding-left: 25px;
        }

        .note-content li {
          margin-bottom: 7px;
          padding-left: 3px;
          line-height: 1.7;
        }

        .note-content blockquote {
          margin: 22px 0;
          padding: 14px 18px;
          border-left: 4px solid var(--primary);
          border-radius: 0 9px 9px 0;
          background: color-mix(
            in srgb,
            var(--primary) 7%,
            var(--bg-main)
          );
          color: var(--text-main);
        }

        .note-content hr {
          margin: 30px 0;
          border: 0;
          border-top: 1px solid var(--border);
        }

        .note-content a {
          color: var(--primary);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .note-content img {
          display: block;
          max-width: 100%;
          height: auto;
          margin: 22px auto;
          border-radius: 12px;
          border: 1px solid var(--border);
        }

        .note-content figure {
          margin: 25px 0;
          text-align: center;
        }

        .note-content figcaption {
          margin-top: 8px;
          color: var(--text-muted);
          font-size: 11px;
          font-style: italic;
        }

        .note-content pre {
          margin: 20px 0;
          padding: 18px 20px;
          overflow-x: auto;
          border: 1px solid #30363d;
          border-radius: 11px;
          background: #0d1117;
          color: #c9d1d9;
          font-family:
            "Fira Code",
            "Cascadia Code",
            Consolas,
            monospace;
          font-size: 12px;
          line-height: 1.65;
        }

        .note-content code {
          font-family:
            "Fira Code",
            "Cascadia Code",
            Consolas,
            monospace;
        }

        .note-content :not(pre) > code {
          padding: 2px 6px;
          border-radius: 5px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          font-size: 0.9em;
        }

        /* ======================================================
           NOTE EMPTY
        ====================================================== */

        .note-no-content {
          padding: 60px 20px;
          text-align: center;
          border: 1px dashed var(--border);
          border-radius: 14px;
          color: var(--text-muted);
        }

        .note-no-content-icon {
          margin-bottom: 12px;
          font-size: 30px;
        }

        .note-no-content p {
          margin: 0;
          font-size: 13px;
        }

        /* ======================================================
           PREVIOUS / NEXT
        ====================================================== */

        .note-navigation {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          margin-top: 65px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
        }

        .note-nav-button {
          min-width: 0;
          max-width: 300px;
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 15px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--bg-card);
          color: var(--text-main);
          text-align: left;
          cursor: pointer;
          transition:
            border-color 0.15s ease,
            background 0.15s ease,
            transform 0.15s ease;
        }

        .note-nav-button:hover {
          border-color: var(--primary);
          background: color-mix(
            in srgb,
            var(--primary) 4%,
            var(--bg-card)
          );
          transform: translateY(-1px);
        }

        .note-nav-button.next {
          text-align: right;
          flex-direction: row-reverse;
        }

        .note-nav-arrow {
          font-size: 19px;
          line-height: 1;
          color: var(--primary);
        }

        .note-nav-info {
          min-width: 0;
          flex: 1;
        }

        .note-nav-label {
          margin-bottom: 3px;
          color: var(--text-muted);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .note-nav-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          font-weight: 650;
          color: var(--text-main);
        }

        /* ======================================================
           LOADING
        ====================================================== */

        .loading-container {
          padding: 10px 2px;
        }

        .skeleton {
          height: 62px;
          margin-bottom: 7px;
          border-radius: 10px;
          background: var(--bg-main);
          position: relative;
          overflow: hidden;
        }

        .skeleton::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent,
            color-mix(in srgb, var(--border) 50%, transparent),
            transparent
          );
          animation: skeleton-loading 1.4s infinite;
        }

        @keyframes skeleton-loading {
          100% {
            transform: translateX(100%);
          }
        }

        .main-loading {
          max-width: 700px;
          margin: 50px auto;
        }

        .main-skeleton {
          height: 20px;
          margin-bottom: 13px;
          border-radius: 7px;
          background: var(--border);
          opacity: 0.55;
        }

        .main-skeleton.large {
          width: 70%;
          height: 38px;
          margin-bottom: 18px;
        }

        .main-skeleton.small {
          width: 30%;
          margin-bottom: 45px;
        }

        /* ======================================================
           MOBILE
        ====================================================== */

        @media (max-width: 768px) {
          .student-notes-root {
            height: calc(100vh - 56px);
          }

          .student-notes-layout {
            position: relative;
          }

          .student-notes-sidebar {
            width: 100%;
            min-width: 100%;
            border-right: none;
          }

          .student-notes-main {
            width: 100%;
          }

          .student-notes-main-inner {
            padding: 20px 18px 50px;
          }

          .note-header h1 {
            font-size: 29px;
            letter-spacing: -0.7px;
          }

          .note-content {
            font-size: 14px;
          }

          .note-content h1 {
            font-size: 25px;
          }

          .note-content h2 {
            font-size: 20px;
          }

          .note-navigation {
            flex-direction: column;
            margin-top: 45px;
          }

          .note-nav-button {
            max-width: none;
            width: 100%;
          }

          .notes-sidebar-header {
            padding: 20px 16px 17px;
          }

          .notes-title {
            font-size: 21px;
          }
        }
      `}</style>

      <div className="student-notes-root">
        <div className="student-notes-layout">
          {/* ====================================================
              SIDEBAR
          ==================================================== */}

          <aside
            className="student-notes-sidebar"
            style={{
              display: isMobile && mobileView === "content" ? "none" : "flex",
            }}
          >
            {/* HEADER */}

            <div className="notes-sidebar-header">
              <p className="notes-eyebrow">Study Materials</p>

              <h2 className="notes-title">Browse Notes</h2>

              {/* UNIVERSITY */}

              <div className="academic-group">
                <label className="academic-label">University</label>

                <div className="academic-select-wrapper">
                  <select
                    className="academic-select"
                    value={selectedUniversity}
                    onChange={handleUniversityChange}
                    disabled={academicLoading}
                  >
                    <option value="">
                      {academicLoading
                        ? "Loading universities..."
                        : "Select university"}
                    </option>

                    {universities.map((university) => (
                      <option key={university._id} value={university._id}>
                        {university.name}
                      </option>
                    ))}
                  </select>

                  <span className="select-arrow">▼</span>
                </div>
              </div>

              {/* COURSE */}

              <div className="academic-group">
                <label className="academic-label">Course</label>

                <div className="academic-select-wrapper">
                  <select
                    className="academic-select"
                    value={selectedCourse}
                    onChange={handleCourseChange}
                    disabled={!selectedUniversity || courseLoading}
                  >
                    <option value="">
                      {courseLoading
                        ? "Loading courses..."
                        : !selectedUniversity
                          ? "Select university first"
                          : "Select course"}
                    </option>

                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.name}
                      </option>
                    ))}
                  </select>

                  <span className="select-arrow">▼</span>
                </div>
              </div>

              {/* SEMESTER */}

              <div className="academic-group">
                <label className="academic-label">Semester</label>

                <div className="academic-select-wrapper">
                  <select
                    className="academic-select"
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    disabled={!selectedCourse}
                  >
                    <option value="">
                      {!selectedCourse
                        ? "Select course first"
                        : "Select semester"}
                    </option>

                    {selectedCourseData &&
                      Array.from(
                        {
                          length: selectedCourseData.totalSemesters || 0,
                        },
                        (_, index) => index + 1,
                      ).map((semester) => (
                        <option key={semester} value={semester}>
                          Semester {semester}
                        </option>
                      ))}
                  </select>

                  <span className="select-arrow">▼</span>
                </div>
              </div>

              {/* SEARCH */}

              <div className="notes-search">
                <span className="notes-search-icon">⌕</span>

                <input
                  type="text"
                  placeholder={
                    selectedSemester
                      ? "Search notes..."
                      : "Select semester first"
                  }
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  disabled={!selectedSemester}
                />

                {search && (
                  <button
                    className="clear-search"
                    onClick={() => setSearch("")}
                    type="button"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* SUBJECT FILTER */}

            {selectedSemester && !loading && notes.length > 0 && (
              <div className="subject-filter">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    className={`subject-pill ${
                      activeSubject === subject.id ? "active" : ""
                    }`}
                    onClick={() => setActiveSubject(subject.id)}
                  >
                    {subject.name}
                  </button>
                ))}
              </div>
            )}

            {/* NOTES */}

            <div className="notes-list">
              {/* NO SELECTION */}

              {!selectedUniversity || !selectedCourse || !selectedSemester ? (
                <div className="notes-empty">
                  <div className="empty-icon">📚</div>

                  <h3>Choose your academics</h3>

                  <p>
                    Select a university, course and semester to find study
                    notes.
                  </p>
                </div>
              ) : loading ? (
                <div className="loading-container">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div className="skeleton" key={item} />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="notes-empty">
                  <div className="empty-icon">{search ? "⌕" : "📭"}</div>

                  <h3>{search ? "No matching notes" : "No notes available"}</h3>

                  <p>
                    {search
                      ? "Try a different search term."
                      : "There are no notes for this academic selection yet."}
                  </p>
                </div>
              ) : (
                filtered.map((note) => (
                  <button
                    key={note._id}
                    className={`note-list-item ${
                      activeNote === note._id ? "active" : ""
                    }`}
                    onClick={() => openNote(note._id)}
                    type="button"
                  >
                    <div className="note-list-row">
                      <span className="note-number">{note.order || "•"}</span>

                      <div className="note-list-info">
                        <p className="note-list-title">{note.title}</p>

                        {note.subject?.name && (
                          <p className="note-list-subject">
                            {note.subject.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* FOOTER */}

            {!loading && selectedSemester && (
              <div className="notes-sidebar-footer">
                <p className="notes-count">
                  {filtered.length} of {notes.length} notes
                </p>
              </div>
            )}
          </aside>

          {/* ====================================================
              MAIN CONTENT
          ==================================================== */}

          <main
            id="student-notes-content"
            className="student-notes-main"
            style={{
              display: isMobile && mobileView === "list" ? "none" : "block",
            }}
          >
            <div className="student-notes-main-inner">
              {/* NO SELECTION */}

              {!selectedUniversity || !selectedCourse || !selectedSemester ? (
                <div className="main-empty">
                  <div className="main-empty-card">
                    <div className="main-empty-icon">📖</div>

                    <h2>Browse Study Notes</h2>

                    <p>
                      Select a university, course and semester from the sidebar
                      to explore available study materials.
                    </p>
                  </div>
                </div>
              ) : loading ? (
                <div className="main-loading">
                  <div className="main-skeleton large" />
                  <div className="main-skeleton small" />

                  {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                    <div
                      key={item}
                      className="main-skeleton"
                      style={{
                        width: `${55 + Math.random() * 40}%`,
                      }}
                    />
                  ))}
                </div>
              ) : !currentNote ? (
                <div className="main-empty">
                  <div className="main-empty-card">
                    <div className="main-empty-icon">📭</div>

                    <h2>No Notes Found</h2>

                    <p>
                      No study notes are available for the selected university,
                      course and semester.
                    </p>
                  </div>
                </div>
              ) : (
                <article key={currentNote._id}>
                  {/* MOBILE BACK */}

                  {isMobile && (
                    <button
                      type="button"
                      onClick={() => setMobileView("list")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        marginBottom: "22px",
                        padding: 0,
                        border: 0,
                        background: "transparent",
                        color: "var(--text-muted)",
                        fontSize: "13px",
                        fontWeight: 650,
                        cursor: "pointer",
                      }}
                    >
                      ← Back to notes
                    </button>
                  )}

                  {/* SELECTION SUMMARY */}

                  <div className="selection-summary">
                    <div className="selection-chip">
                      University:
                      <strong>
                        {
                          universities.find((u) => u._id === selectedUniversity)
                            ?.name
                        }
                      </strong>
                    </div>

                    <div className="selection-chip">
                      Course:
                      <strong>{selectedCourseData?.name}</strong>
                    </div>

                    <div className="selection-chip">
                      Semester:
                      <strong>{selectedSemester}</strong>
                    </div>
                  </div>

                  {/* NOTE HEADER */}

                  <header className="note-header">
                    <div className="note-meta">
                      {currentNote.subject?.name && (
                        <span className="subject-badge">
                          {currentNote.subject.name}
                        </span>
                      )}

                      <span className="chapter-label">
                        Chapter {currentNote.order || "—"}
                      </span>
                    </div>

                    <h1>{currentNote.title}</h1>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        flexWrap: "wrap",
                      }}
                    >
                      <p className="note-updated">
                        Last updated{" "}
                        {currentNote.updatedAt
                          ? new Date(currentNote.updatedAt).toLocaleDateString(
                              "en-IN",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )
                          : "Unknown"}
                      </p>

                      {currentNote.uploadedBy && (
                        <>
                          <span
                            style={{
                              width: "4px",
                              height: "4px",
                              borderRadius: "50%",
                              backgroundColor: "var(--text-faint)",
                            }}
                          />

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              fontSize: "11px",
                              color: "var(--text-muted)",
                            }}
                          >
                            <span
                              style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor:
                                  "color-mix(in srgb, var(--primary) 10%, var(--bg-main))",
                                color: "var(--primary)",
                                fontSize: "11px",
                                fontWeight: "800",
                              }}
                            >
                              {currentNote.uploadedBy.name
                                ?.charAt(0)
                                ?.toUpperCase()}
                            </span>

                            <span>
                              Uploaded by{" "}
                              <strong
                                style={{
                                  color: "var(--text-main)",
                                  fontWeight: "700",
                                }}
                              >
                                {currentNote.uploadedBy.name}
                              </strong>
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </header>
                  {currentNote.uploadedBy && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "30px",
                        padding: "13px 15px",
                        border: "1px solid var(--border)",
                        borderRadius: "12px",
                        backgroundColor: "var(--bg-card)",
                      }}
                    >
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          minWidth: "38px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor:
                            "color-mix(in srgb, var(--primary) 12%, var(--bg-main))",
                          color: "var(--primary)",
                          fontSize: "14px",
                          fontWeight: "800",
                        }}
                      >
                        {currentNote.uploadedBy.name?.charAt(0)?.toUpperCase()}
                      </div>

                      <div
                        style={{
                          minWidth: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: "3px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "10px",
                            color: "var(--text-muted)",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                          }}
                        >
                          Uploaded by
                        </span>

                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "750",
                            color: "var(--text-main)",
                          }}
                        >
                          {currentNote.uploadedBy.name}
                        </span>

                        <span
                          style={{
                            fontSize: "11px",
                            color: "var(--text-muted)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {currentNote.uploadedBy.email}
                        </span>
                      </div>
                    </div>
                  )}
                  {/* CONTENT */}

                  {currentNote.description ? (
                    <div
                      className="note-content"
                      dangerouslySetInnerHTML={{
                        __html: currentNote.description,
                      }}
                    />
                  ) : (
                    <div className="note-no-content">
                      <div className="note-no-content-icon">📝</div>

                      <p>This note has no content yet.</p>
                    </div>
                  )}

                  {/* NAVIGATION */}

                  <div className="note-navigation">
                    {previousNote ? (
                      <button
                        type="button"
                        className="note-nav-button"
                        onClick={goToPrevious}
                      >
                        <span className="note-nav-arrow">←</span>

                        <div className="note-nav-info">
                          <div className="note-nav-label">Previous</div>

                          <div className="note-nav-title">
                            {previousNote.title}
                          </div>
                        </div>
                      </button>
                    ) : (
                      <div
                        style={{
                          flex: 1,
                        }}
                      />
                    )}

                    {nextNote ? (
                      <button
                        type="button"
                        className="note-nav-button next"
                        onClick={goToNext}
                      >
                        <span className="note-nav-arrow">→</span>

                        <div className="note-nav-info">
                          <div className="note-nav-label">Next</div>

                          <div className="note-nav-title">{nextNote.title}</div>
                        </div>
                      </button>
                    ) : (
                      <div
                        style={{
                          flex: 1,
                        }}
                      />
                    )}
                  </div>
                </article>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
