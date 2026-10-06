import React, { useEffect, useMemo, useState } from "react";
import API from "../../axiosConfig";

const FacultyDoubts = () => {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // ============================================================
  // FETCH FACULTY DOUBTS
  // GET /api/doubts/faculty
  // ============================================================
  const fetchDoubts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/doubts/faculty");

      setDoubts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch doubts:", err);
      setError(err.response?.data?.message || "Failed to load student doubts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoubts();
  }, []);

  // ============================================================
  // FILTER + SEARCH
  // ============================================================
  const filteredDoubts = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return doubts.filter((doubt) => {
      const matchesStatus =
        statusFilter === "all" || doubt.status === statusFilter;

      if (!searchText) return matchesStatus;

      const question = doubt.question?.toLowerCase() || "";
      const studentName = doubt.student?.name?.toLowerCase() || "";
      const noteTitle = doubt.note?.title?.toLowerCase() || "";
      const answerText = doubt.answer?.toLowerCase() || "";

      const matchesSearch =
        question.includes(searchText) ||
        studentName.includes(searchText) ||
        noteTitle.includes(searchText) ||
        answerText.includes(searchText);

      return matchesStatus && matchesSearch;
    });
  }, [doubts, search, statusFilter]);

  // ============================================================
  // SELECT DOUBT
  // ============================================================
  const openDoubt = (doubt) => {
    setSelectedDoubt(doubt);
    setAnswer(doubt.answer || "");
    setError("");
    setSuccess("");
  };

  const closeDoubt = () => {
    if (submitting) return;

    setSelectedDoubt(null);
    setAnswer("");
    setError("");
    setSuccess("");
  };

  // ============================================================
  // ANSWER DOUBT
  // PATCH /api/doubts/:id/answer
  // ============================================================
  const submitAnswer = async (e) => {
    e.preventDefault();

    const trimmedAnswer = answer.trim();

    if (!selectedDoubt?._id || !trimmedAnswer) {
      setError("Please enter an answer.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const res = await API.patch(`/doubts/${selectedDoubt._id}/answer`, {
        answer: trimmedAnswer,
      });

      const updatedDoubt = res.data?.doubt || res.data;

      setDoubts((prev) =>
        prev.map((doubt) =>
          doubt._id === selectedDoubt._id
            ? { ...doubt, ...updatedDoubt, status: "answered" }
            : doubt,
        ),
      );

      setSelectedDoubt((prev) =>
        prev
          ? {
              ...prev,
              ...updatedDoubt,
              answer: trimmedAnswer,
              status: "answered",
              answeredAt: updatedDoubt?.answeredAt || new Date().toISOString(),
            }
          : prev,
      );

      setAnswer(trimmedAnswer);
      setSuccess("Answer submitted successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error("Failed to answer doubt:", err);
      setError(err.response?.data?.message || "Failed to submit the answer.");
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================================
  // COUNTS
  // ============================================================
  const pendingCount = doubts.filter(
    (doubt) => doubt.status === "pending",
  ).length;

  const answeredCount = doubts.filter(
    (doubt) => doubt.status === "answered",
  ).length;

  return (
    <div className="faculty-doubts-page">
      <style>{`
        .faculty-doubts-page {
          min-height: 100%;
          padding: 28px;
          background: var(--bg-main);
          color: var(--text-main);
          box-sizing: border-box;
          border-radius:10px;
        }

        .faculty-doubts-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .faculty-doubts-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }

        .faculty-doubts-eyebrow {
          margin: 0 0 7px;
          color: var(--primary-text);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .faculty-doubts-title {
          margin: 0;
          color: var(--text-main);
          font-size: 30px;
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -.02em;
        }

        .faculty-doubts-subtitle {
          margin: 8px 0 0;
          max-width: 650px;
          color: var(--text-muted);
          font-size: 14px;
          line-height: 1.6;
        }

        .refresh-button {
          flex-shrink: 0;
          border: 1px solid var(--border);
          background: var(--bg-card);
          color: var(--text-main);
          border-radius: 10px;
          padding: 10px 15px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: .2s ease;
        }

        .refresh-button:hover {
          border-color: var(--primary);
          color: var(--primary-text);
          background: var(--bg-secondary);
        }

        .faculty-doubt-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 20px;
        }

        .doubt-stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px;
          box-shadow: var(--shadow);
        }

        .doubt-stat-label {
          margin: 0 0 8px;
          color: var(--text-muted);
          font-size: 12px;
          font-weight: 700;
        }

        .doubt-stat-value {
          margin: 0;
          color: var(--text-main);
          font-size: 25px;
          font-weight: 800;
        }

        .doubt-stat-note {
          margin: 5px 0 0;
          color: var(--text-faint);
          font-size: 12px;
        }

        .faculty-doubts-toolbar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding: 14px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          box-shadow: var(--shadow);
        }

        .doubt-search {
          flex: 1;
          min-width: 0;
          height: 42px;
          padding: 0 13px;
          border: 1px solid var(--border);
          border-radius: 9px;
          outline: none;
          color: var(--text-main);
          font-size: 13px;
          background: var(--bg-input);
          box-sizing: border-box;
        }

        .doubt-search::placeholder {
          color: var(--text-faint);
        }

        .doubt-search:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(245,173,66,.14);
        }

        .doubt-filter {
          height: 42px;
          min-width: 140px;
          padding: 0 12px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: var(--bg-input);
          color: var(--text-main);
          outline: none;
          font-size: 13px;
          cursor: pointer;
        }

        .doubt-filter:focus {
          border-color: var(--primary);
        }

        .faculty-doubts-content {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        .doubts-table-head {
          display: grid;
          grid-template-columns: 1.5fr 2.4fr 1.5fr .9fr 100px;
          gap: 16px;
          padding: 13px 18px;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        .doubt-row {
          display: grid;
          grid-template-columns: 1.5fr 2.4fr 1.5fr .9fr 100px;
          gap: 16px;
          align-items: center;
          padding: 16px 18px;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
          transition: background .18s ease;
        }

        .doubt-row:last-child {
          border-bottom: 0;
        }

        .doubt-row:hover {
          background: var(--bg-secondary);
        }

        .doubt-student {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .doubt-student-avatar {
          width: 34px;
          height: 34px;
          flex: 0 0 34px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: var(--primary-light);
          color: var(--primary-text);
          font-size: 12px;
          font-weight: 800;
        }

        .doubt-student-info {
          min-width: 0;
        }

        .doubt-student-name {
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--text-main);
          font-size: 13px;
          font-weight: 750;
        }

        .doubt-date {
          margin: 3px 0 0;
          color: var(--text-faint);
          font-size: 11px;
        }

        .doubt-note-title,
        .doubt-question-preview {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          color: var(--text-main);
          font-size: 13px;
          line-height: 1.45;
        }

        .doubt-note-title {
          font-weight: 700;
        }

        .doubt-question-preview {
          color: var(--text-muted);
        }

        .doubt-status {
          display: inline-flex;
          width: fit-content;
          padding: 5px 9px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 800;
        }

        .doubt-status.pending {
          background: rgba(245,173,66,.14);
          color: var(--primary-text);
        }

        .doubt-status.answered {
          background: var(--primary-light);
          color: var(--primary-text);
        }

        .view-button {
          border: 1px solid rgba(245,173,66,.25);
          background: var(--primary-light);
          color: var(--primary-text);
          border-radius: 8px;
          padding: 8px 11px;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
        }

        .view-button:hover {
          background: var(--primary);
          color: #111827;
        }

        .doubts-empty,
        .doubts-loading {
          padding: 55px 20px;
          text-align: center;
          color: var(--text-muted);
          font-size: 13px;
        }

        .doubts-empty strong {
          display: block;
          margin-bottom: 5px;
          color: var(--text-main);
          font-size: 15px;
        }

        .faculty-doubts-error {
          margin-bottom: 15px;
          padding: 12px 14px;
          border: 1px solid rgba(220,38,38,.18);
          border-radius: 9px;
          background: rgba(220,38,38,.08);
          color: #dc2626;
          font-size: 13px;
        }

        .doubt-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(0,0,0,.55);
          box-sizing: border-box;
        }

        .doubt-modal {
          width: min(720px, 100%);
          max-height: min(760px, 92vh);
          overflow-y: auto;
          background: var(--bg-card);
          color: var(--text-main);
          border: 1px solid var(--border);
          border-radius: 18px;
          box-shadow: var(--shadow);
        }

        .doubt-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          padding: 22px 24px 18px;
          border-bottom: 1px solid var(--border);
        }

        .doubt-modal-eyebrow {
          margin: 0 0 6px;
          color: var(--primary-text);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .doubt-modal-title {
          margin: 0;
          color: var(--text-main);
          font-size: 19px;
          font-weight: 800;
        }

        .doubt-modal-note {
          margin: 6px 0 0;
          color: var(--text-muted);
          font-size: 12px;
        }

        .doubt-modal-note strong {
          color: var(--text-main);
        }

        .doubt-close {
          width: 34px;
          height: 34px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: var(--bg-secondary);
          color: var(--text-main);
          font-size: 19px;
          cursor: pointer;
        }

        .doubt-close:hover {
          border-color: var(--primary);
          color: var(--primary-text);
        }

        .doubt-modal-body {
          padding: 22px 24px 24px;
        }

        .student-question-box {
          padding: 15px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--bg-secondary);
        }

        .student-question-meta {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 10px;
        }

        .student-question-meta strong {
          color: var(--text-main);
          font-size: 12px;
        }

        .student-question-meta span {
          color: var(--text-faint);
          font-size: 11px;
        }

        .student-question {
          margin: 0;
          color: var(--text-main);
          font-size: 14px;
          line-height: 1.65;
          white-space: pre-wrap;
        }

        .faculty-answer-label {
          display: block;
          margin: 20px 0 8px;
          color: var(--text-main);
          font-size: 12px;
          font-weight: 800;
        }

        .faculty-answer-textarea {
          width: 100%;
          min-height: 150px;
          padding: 13px;
          border: 1px solid var(--border);
          border-radius: 10px;
          resize: vertical;
          outline: none;
          color: var(--text-main);
          background: var(--bg-input);
          font: inherit;
          font-size: 13px;
          line-height: 1.6;
          box-sizing: border-box;
        }

        .faculty-answer-textarea::placeholder {
          color: var(--text-faint);
        }

        .faculty-answer-textarea:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(245,173,66,.14);
        }

        .faculty-answer-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 12px;
        }

        .answer-count {
          color: var(--text-faint);
          font-size: 11px;
        }

        .answer-submit {
          border: 0;
          border-radius: 9px;
          padding: 10px 17px;
          background: var(--primary);
          color: #111827;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        .answer-submit:hover {
          background: var(--primary-hover);
        }

        .answer-submit:disabled {
          opacity: .55;
          cursor: not-allowed;
        }

        .modal-message {
          margin: 12px 0 0;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 12px;
        }

        .modal-message.error {
          background: rgba(220,38,38,.08);
          color: #dc2626;
        }

        .modal-message.success {
          background: var(--primary-light);
          color: var(--primary-text);
        }

        .existing-answer {
          margin-top: 18px;
          padding: 13px;
          border-left: 3px solid var(--primary);
          background: var(--bg-secondary);
          border-radius: 0 9px 9px 0;
        }

        .existing-answer-label {
          margin: 0 0 6px;
          color: var(--primary-text);
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .05em;
        }

        .existing-answer-text {
          margin: 0;
          color: var(--text-main);
          font-size: 13px;
          line-height: 1.6;
          white-space: pre-wrap;
        }

        @media (max-width: 900px) {
          .doubts-table-head {
            display: none;
          }

          .doubt-row {
            grid-template-columns: 1fr auto;
            gap: 10px;
          }

          .doubt-row > div:nth-child(2),
          .doubt-row > div:nth-child(3) {
            grid-column: 1 / -1;
          }

          .doubt-row > div:nth-child(4) {
            grid-column: 1;
          }

          .doubt-row > div:nth-child(5) {
            grid-column: 2;
            grid-row: 1 / span 2;
            align-self: center;
          }
        }

        @media (max-width: 650px) {
          .faculty-doubts-page {
            padding: 16px;
          }

          .faculty-doubts-header {
            flex-direction: column;
          }

          .faculty-doubts-title {
            font-size: 24px;
          }

          .refresh-button {
            width: 100%;
          }

          .faculty-doubt-stats {
            grid-template-columns: 1fr;
          }

          .faculty-doubts-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .doubt-filter {
            width: 100%;
          }

          .doubt-modal-backdrop {
            padding: 10px;
          }

          .doubt-modal-header,
          .doubt-modal-body {
            padding-left: 17px;
            padding-right: 17px;
          }
        }
      `}</style>

      <div className="faculty-doubts-container">
        <header className="faculty-doubts-header">
          <div>
            <p className="faculty-doubts-eyebrow">Student Support</p>
            <h1 className="faculty-doubts-title">Student Doubts</h1>
            <p className="faculty-doubts-subtitle">
              Review questions raised by students on your notes and provide
              clear answers directly from the faculty dashboard.
            </p>
          </div>

          <button
            type="button"
            className="refresh-button"
            onClick={fetchDoubts}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </header>

        {error && !selectedDoubt && (
          <div className="faculty-doubts-error">{error}</div>
        )}

        <section className="faculty-doubt-stats">
          <div className="doubt-stat-card">
            <p className="doubt-stat-label">Total Doubts</p>
            <p className="doubt-stat-value">{doubts.length}</p>
            <p className="doubt-stat-note">All student questions</p>
          </div>

          <div className="doubt-stat-card">
            <p className="doubt-stat-label">Pending</p>
            <p className="doubt-stat-value">{pendingCount}</p>
            <p className="doubt-stat-note">Need your response</p>
          </div>

          <div className="doubt-stat-card">
            <p className="doubt-stat-label">Answered</p>
            <p className="doubt-stat-value">{answeredCount}</p>
            <p className="doubt-stat-note">Already resolved</p>
          </div>
        </section>

        <div className="faculty-doubts-toolbar">
          <input
            type="text"
            className="doubt-search"
            placeholder="Search by student, note, question or answer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="doubt-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Doubts</option>
            <option value="pending">Pending</option>
            <option value="answered">Answered</option>
          </select>
        </div>

        <section className="faculty-doubts-content">
          {loading ? (
            <div className="doubts-loading">Loading student doubts...</div>
          ) : filteredDoubts.length === 0 ? (
            <div className="doubts-empty">
              <strong>No doubts found</strong>
              {search || statusFilter !== "all"
                ? "Try changing your search or filter."
                : "Students have not raised any doubts yet."}
            </div>
          ) : (
            <>
              <div className="doubts-table-head">
                <div>Student</div>
                <div>Question</div>
                <div>Note</div>
                <div>Status</div>
                <div></div>
              </div>

              {filteredDoubts.map((doubt) => {
                const studentName = doubt.student?.name || "Student";

                return (
                  <div
                    className="doubt-row"
                    key={doubt._id}
                    onClick={() => openDoubt(doubt)}
                  >
                    <div className="doubt-student">
                      <div className="doubt-student-avatar">
                        {studentName.charAt(0).toUpperCase()}
                      </div>

                      <div className="doubt-student-info">
                        <p className="doubt-student-name">{studentName}</p>
                        <p className="doubt-date">
                          {doubt.createdAt
                            ? new Date(doubt.createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : ""}
                        </p>
                      </div>
                    </div>

                    <div className="doubt-question-preview">
                      {doubt.question}
                    </div>

                    <div className="doubt-note-title">
                      {doubt.note?.title || "Note"}
                    </div>

                    <div>
                      <span
                        className={`doubt-status ${
                          doubt.status === "answered" ? "answered" : "pending"
                        }`}
                      >
                        {doubt.status === "answered" ? "Answered" : "Pending"}
                      </span>
                    </div>

                    <div>
                      <button
                        type="button"
                        className="view-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDoubt(doubt);
                        }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </section>
      </div>

      {selectedDoubt && (
        <div
          className="doubt-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeDoubt();
          }}
        >
          <div className="doubt-modal">
            <div className="doubt-modal-header">
              <div>
                <p className="doubt-modal-eyebrow">Student Doubt</p>
                <h2 className="doubt-modal-title">
                  {selectedDoubt.note?.title || "Note Discussion"}
                </h2>
                <p className="doubt-modal-note">
                  Asked by{" "}
                  <strong>{selectedDoubt.student?.name || "Student"}</strong>
                </p>
              </div>

              <button
                type="button"
                className="doubt-close"
                onClick={closeDoubt}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="doubt-modal-body">
              <div className="student-question-box">
                <div className="student-question-meta">
                  <strong>{selectedDoubt.student?.name || "Student"}</strong>

                  <span>
                    {selectedDoubt.createdAt
                      ? new Date(selectedDoubt.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )
                      : ""}
                  </span>
                </div>

                <p className="student-question">{selectedDoubt.question}</p>
              </div>

              {selectedDoubt.status === "answered" && selectedDoubt.answer && (
                <div className="existing-answer">
                  <p className="existing-answer-label">Current Answer</p>
                  <p className="existing-answer-text">{selectedDoubt.answer}</p>
                </div>
              )}

              <form onSubmit={submitAnswer}>
                <label
                  className="faculty-answer-label"
                  htmlFor="faculty-doubt-answer"
                >
                  {selectedDoubt.status === "answered"
                    ? "Update Answer"
                    : "Your Answer"}
                </label>

                <textarea
                  id="faculty-doubt-answer"
                  className="faculty-answer-textarea"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    if (error) setError("");
                    if (success) setSuccess("");
                  }}
                  placeholder="Write a clear explanation for the student..."
                  maxLength={5000}
                  disabled={submitting}
                />

                <div className="faculty-answer-footer">
                  <span className="answer-count">{answer.length}/5000</span>

                  <button
                    type="submit"
                    className="answer-submit"
                    disabled={submitting || !answer.trim()}
                  >
                    {submitting
                      ? "Submitting..."
                      : selectedDoubt.status === "answered"
                        ? "Update Answer"
                        : "Submit Answer"}
                  </button>
                </div>

                {error && <p className="modal-message error">{error}</p>}

                {success && <p className="modal-message success">{success}</p>}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyDoubts;
