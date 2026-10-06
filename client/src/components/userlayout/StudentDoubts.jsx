import React, { useEffect, useMemo, useState } from "react";
import API from "../../axiosConfig";

const StudentDoubts = () => {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDoubt, setSelectedDoubt] = useState(null);

  // ============================================================
  // FETCH ONLY THE LOGGED-IN STUDENT'S DOUBTS
  // GET /api/doubts/student
  // ============================================================
  const fetchMyDoubts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/doubts/student");

      setDoubts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch my doubts:", err);

      setDoubts([]);
      setError(err.response?.data?.message || "Failed to load your doubts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyDoubts();
  }, []);

  // ============================================================
  // FILTER
  // ============================================================
  const filteredDoubts = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return doubts.filter((doubt) => {
      const matchesStatus =
        statusFilter === "all" || doubt.status === statusFilter;

      if (!searchText) return matchesStatus;

      const question = doubt.question?.toLowerCase() || "";
      const answer = doubt.answer?.toLowerCase() || "";
      const noteTitle = doubt.note?.title?.toLowerCase() || "";
      const facultyName = doubt.faculty?.name?.toLowerCase() || "";

      return (
        matchesStatus &&
        (question.includes(searchText) ||
          answer.includes(searchText) ||
          noteTitle.includes(searchText) ||
          facultyName.includes(searchText))
      );
    });
  }, [doubts, search, statusFilter]);

  const pendingCount = doubts.filter(
    (doubt) => doubt.status === "pending",
  ).length;

  const answeredCount = doubts.filter(
    (doubt) => doubt.status === "answered",
  ).length;

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="student-doubts-page">
      <style>{`
        .student-doubts-page {
          min-height: 100%;
          padding: 28px;
          background: var(--bg-main);
          color: var(--text-main);
          box-sizing: border-box;
        }

        .student-doubts-container {
          width: min(1100px, 100%);
          margin: 0 auto;
        }

        .student-doubts-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }

        .student-doubts-eyebrow {
          margin: 0 0 7px;
          color: var(--primary-text);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .student-doubts-title {
          margin: 0;
          color: var(--text-main);
          font-size: 30px;
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -.02em;
        }

        .student-doubts-subtitle {
          max-width: 680px;
          margin: 8px 0 0;
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
        }

        .refresh-button:hover {
          border-color: var(--primary);
          color: var(--primary-text);
        }

        .doubt-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 20px;
        }

        .summary-card {
          padding: 18px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          box-shadow: var(--shadow);
        }

        .summary-label {
          margin: 0 0 7px;
          color: var(--text-muted);
          font-size: 12px;
          font-weight: 700;
        }

        .summary-value {
          margin: 0;
          color: var(--text-main);
          font-size: 25px;
          font-weight: 800;
        }

        .summary-description {
          margin: 5px 0 0;
          color: var(--text-faint);
          font-size: 11px;
        }

        .doubt-toolbar {
          display: flex;
          gap: 12px;
          padding: 14px;
          margin-bottom: 16px;
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
          background: var(--bg-input);
          font-size: 13px;
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
          min-width: 140px;
          height: 42px;
          padding: 0 12px;
          border: 1px solid var(--border);
          border-radius: 9px;
          outline: none;
          color: var(--text-main);
          background: var(--bg-input);
          font-size: 13px;
        }

        .doubt-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .doubt-card {
          padding: 20px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 15px;
          box-shadow: var(--shadow);
        }

        .doubt-card:hover {
          border-color: var(--border-hover);
        }

        .doubt-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 14px;
        }

        .doubt-note-info {
          min-width: 0;
        }

        .doubt-note-label {
          margin: 0 0 5px;
          color: var(--primary-text);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .doubt-note-title {
          margin: 0;
          color: var(--text-main);
          font-size: 15px;
          font-weight: 800;
        }

        .doubt-created-date {
          margin: 5px 0 0;
          color: var(--text-faint);
          font-size: 11px;
        }

        .doubt-status {
          flex-shrink: 0;
          display: inline-flex;
          padding: 6px 10px;
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

        .conversation {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .message-block {
          padding: 14px;
          border-radius: 11px;
        }

        .student-message {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
        }

        .faculty-message {
          background: var(--primary-light);
          border: 1px solid rgba(245,173,66,.20);
        }

        .message-label {
          margin: 0 0 6px;
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .05em;
          text-transform: uppercase;
        }

        .faculty-message .message-label {
          color: var(--primary-text);
        }

        .message-text {
          margin: 0;
          color: var(--text-main);
          font-size: 13px;
          line-height: 1.65;
          white-space: pre-wrap;
        }

        .faculty-info {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 9px;
          color: var(--text-faint);
          font-size: 11px;
        }

        .faculty-info strong {
          color: var(--text-muted);
        }

        .pending-message {
          margin-top: 10px;
          color: var(--text-muted);
          font-size: 11px;
          font-style: italic;
        }

        .view-button {
          margin-top: 14px;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px 12px;
          background: var(--bg-secondary);
          color: var(--text-main);
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
        }

        .view-button:hover {
          border-color: var(--primary);
          color: var(--primary-text);
        }

        .empty-state,
        .loading-state {
          padding: 60px 20px;
          text-align: center;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 15px;
          box-shadow: var(--shadow);
          color: var(--text-muted);
          font-size: 13px;
        }

        .empty-state strong {
          display: block;
          margin-bottom: 6px;
          color: var(--text-main);
          font-size: 16px;
        }

        .error-message {
          margin-bottom: 16px;
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
        }

        .doubt-modal {
          width: min(700px, 100%);
          max-height: 90vh;
          overflow-y: auto;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 17px;
          box-shadow: var(--shadow);
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          padding: 21px 23px;
          border-bottom: 1px solid var(--border);
        }

        .modal-title {
          margin: 0;
          color: var(--text-main);
          font-size: 18px;
          font-weight: 800;
        }

        .modal-subtitle {
          margin: 5px 0 0;
          color: var(--text-muted);
          font-size: 11px;
        }

        .modal-close {
          width: 34px;
          height: 34px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: var(--bg-secondary);
          color: var(--text-main);
          font-size: 18px;
          cursor: pointer;
        }

        .modal-body {
          padding: 21px 23px 24px;
        }

        @media (max-width: 700px) {
          .student-doubts-page {
            padding: 16px;
          }

          .student-doubts-header {
            flex-direction: column;
          }

          .refresh-button {
            width: 100%;
          }

          .doubt-summary {
            grid-template-columns: 1fr;
          }

          .doubt-toolbar {
            flex-direction: column;
          }

          .doubt-filter {
            width: 100%;
          }

          .doubt-card-header {
            flex-direction: column;
          }

          .doubt-status {
            align-self: flex-start;
          }

          .doubt-modal-backdrop {
            padding: 10px;
          }

          .modal-header,
          .modal-body {
            padding-left: 17px;
            padding-right: 17px;
          }
        }
          /* ============================================================
   DOUBT THEME OVERRIDE
   Removes green/white faculty clarification styling
   ============================================================ */

.student-doubts-page .faculty-message {
  background: var(--bg-card) !important;
  border: 1px solid var(--primary) !important;
  color: var(--text-main) !important;
}

.student-doubts-page .faculty-message .message-label {
  color: var(--primary-text) !important;
}

.student-doubts-page .faculty-message .message-text {
  color: var(--text-main) !important;
}

.student-doubts-page .faculty-message .faculty-info {
  color: var(--text-muted) !important;
}

.student-doubts-page .faculty-message .faculty-info strong {
  color: var(--text-main) !important;
}

.student-doubts-page .doubt-status.answered {
  background: rgba(245, 173, 66, 0.15) !important;
  color: var(--primary-text) !important;
  border: 1px solid rgba(245, 173, 66, 0.25) !important;
}

.student-doubts-page .doubt-status.pending {
  background: rgba(245, 173, 66, 0.10) !important;
  color: var(--primary-text) !important;
  border: 1px solid rgba(245, 173, 66, 0.20) !important;
}
      `}</style>

      <div className="student-doubts-container">
        <header className="student-doubts-header">
          <div>
            <p className="student-doubts-eyebrow">My Discussion</p>
            <h1 className="student-doubts-title">My Doubts</h1>
            <p className="student-doubts-subtitle">
              View the questions you have asked and the clarifications provided
              by your faculty.
            </p>
          </div>

          <button
            type="button"
            className="refresh-button"
            onClick={fetchMyDoubts}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </header>

        {error && <div className="error-message">{error}</div>}

        <section className="doubt-summary">
          <div className="summary-card">
            <p className="summary-label">My Doubts</p>
            <p className="summary-value">{doubts.length}</p>
            <p className="summary-description">Questions you have submitted</p>
          </div>

          <div className="summary-card">
            <p className="summary-label">Pending</p>
            <p className="summary-value">{pendingCount}</p>
            <p className="summary-description">Waiting for faculty response</p>
          </div>

          <div className="summary-card">
            <p className="summary-label">Answered</p>
            <p className="summary-value">{answeredCount}</p>
            <p className="summary-description">
              Faculty clarifications received
            </p>
          </div>
        </section>

        <div className="doubt-toolbar">
          <input
            type="text"
            className="doubt-search"
            placeholder="Search my doubts, notes or answers..."
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

        {loading ? (
          <div className="loading-state">Loading your doubts...</div>
        ) : filteredDoubts.length === 0 ? (
          <div className="empty-state">
            <strong>
              {search || statusFilter !== "all"
                ? "No matching doubts"
                : "You have not asked any doubts yet"}
            </strong>

            <span>
              {search || statusFilter !== "all"
                ? "Try changing your search or status filter."
                : "Your questions and faculty clarifications will appear here."}
            </span>
          </div>
        ) : (
          <div className="doubt-list">
            {filteredDoubts.map((doubt) => (
              <article className="doubt-card" key={doubt._id}>
                <div className="doubt-card-header">
                  <div className="doubt-note-info">
                    <p className="doubt-note-label">Note</p>

                    <h2 className="doubt-note-title">
                      {doubt.note?.title || "Note discussion"}
                    </h2>

                    <p className="doubt-created-date">
                      Asked on {formatDate(doubt.createdAt)}
                    </p>
                  </div>

                  <span
                    className={`doubt-status ${
                      doubt.status === "answered" ? "answered" : "pending"
                    }`}
                  >
                    {doubt.status === "answered" ? "Answered" : "Pending"}
                  </span>
                </div>

                <div className="conversation">
                  <div className="message-block student-message">
                    <p className="message-label">My Doubt</p>
                    <p className="message-text">{doubt.question}</p>
                  </div>

                  {doubt.status === "answered" && doubt.answer ? (
                    <div className="message-block faculty-message">
                      <p className="message-label">Faculty Clarification</p>

                      <p className="message-text">{doubt.answer}</p>

                      <div className="faculty-info">
                        <span>Answered by</span>
                        <strong>{doubt.faculty?.name || "Faculty"}</strong>
                        {doubt.answeredAt && (
                          <>
                            <span>•</span>
                            <span>{formatDate(doubt.answeredAt)}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="pending-message">
                      Your doubt is waiting for a faculty response.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  className="view-button"
                  onClick={() => setSelectedDoubt(doubt)}
                >
                  View Discussion
                </button>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedDoubt && (
        <div
          className="doubt-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedDoubt(null);
            }
          }}
        >
          <div className="doubt-modal">
            <div className="modal-header">
              <div>
                <h2 className="modal-title">
                  {selectedDoubt.note?.title || "My Doubt"}
                </h2>

                <p className="modal-subtitle">
                  Asked on {formatDate(selectedDoubt.createdAt)}
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setSelectedDoubt(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="conversation">
                <div className="message-block student-message">
                  <p className="message-label">My Doubt</p>
                  <p className="message-text">{selectedDoubt.question}</p>
                </div>

                {selectedDoubt.status === "answered" && selectedDoubt.answer ? (
                  <div className="message-block faculty-message">
                    <p className="message-label">Faculty Clarification</p>

                    <p className="message-text">{selectedDoubt.answer}</p>

                    <div className="faculty-info">
                      <span>Answered by</span>
                      <strong>
                        {selectedDoubt.faculty?.name || "Faculty"}
                      </strong>
                      {selectedDoubt.answeredAt && (
                        <>
                          <span>•</span>
                          <span>{formatDate(selectedDoubt.answeredAt)}</span>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="pending-message">
                    Your doubt is still waiting for a faculty response.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDoubts;
