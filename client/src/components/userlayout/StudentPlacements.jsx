import React, { useEffect, useState } from "react";
import API from "../../axiosConfig";

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function StudentPlacements() {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedPlacement, setSelectedPlacement] = useState(null);

  const fetchPlacements = async () => {
    try {
      setLoading(true);
      const response = await API.get("/placements");
      setPlacements(response.data || []);
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to load placements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacements();
  }, []);

  const filteredPlacements = placements.filter((placement) => {
    const query = search.toLowerCase();
    return (
      placement.company?.toLowerCase().includes(query) ||
      placement.jobRole?.toLowerCase().includes(query) ||
      placement.location?.toLowerCase().includes(query) ||
      placement.package?.toLowerCase().includes(query) ||
      placement.eligibility?.toLowerCase().includes(query) ||
      placement.skills?.some((skill) => skill.toLowerCase().includes(query))
    );
  });

  return (
    <div className="student-placement-page">
      {/* HEADER */}
      <div className="student-placement-header">
        <div>
          <div className="eyebrow">CAREER OPPORTUNITIES</div>
          <h1>Placements</h1>
          <p>
            Stay updated with the latest placement opportunities shared by the
            college.
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="student-placement-search">
        <svg
          className="search-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search company, role, skills or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            className="search-clear"
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="student-placement-loading">
          <div className="loading-spinner" />
          <p>Loading placement opportunities...</p>
        </div>
      ) : filteredPlacements.length === 0 ? (
        <div className="student-placement-empty">
          <div className="empty-icon">📋</div>
          <h2>No placement notifications</h2>
          <p>
            New placement opportunities will appear here when they are added by
            the college.
          </p>
        </div>
      ) : (
        <div className="student-placement-grid">
          {filteredPlacements.map((placement) => (
            <div className="student-placement-card" key={placement._id}>
              {/* COMPANY */}
              <div className="student-card-company">
                <div className="student-company-icon">
                  {placement.company?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h2>{placement.company}</h2>
                  <p>{placement.jobRole}</p>
                </div>
              </div>

              {/* MAIN DETAILS */}
              <div className="student-placement-details">
                <div className="detail-item">
                  <span>Package</span>
                  <strong>{placement.package}</strong>
                </div>
                <div className="detail-item">
                  <span>Location</span>
                  <strong>{placement.location}</strong>
                </div>
                <div className="detail-item">
                  <span>Drive Date</span>
                  <strong>{formatDate(placement.driveDate)}</strong>
                </div>
                <div className="detail-item">
                  <span>Application Deadline</span>
                  <strong>{formatDate(placement.applicationDeadline)}</strong>
                </div>
              </div>

              {/* ELIGIBILITY */}
              <div className="student-section">
                <h3>Eligibility</h3>
                <p>{placement.eligibility}</p>
              </div>

              {/* SKILLS */}
              {placement.skills?.length > 0 && (
                <div className="student-section">
                  <h3>Skills</h3>
                  <div className="skills-list">
                    {placement.skills.map((skill, index) => (
                      <span key={index}>{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* DESCRIPTION */}
              <div className="student-section">
                <h3>Description</h3>
                <p className="description">{placement.description}</p>
              </div>

              {/* FOOTER */}
              <div className="student-card-footer">
                <button
                  className="btn-details"
                  onClick={() => setSelectedPlacement(placement)}
                >
                  View Details
                </button>
                <a
                  className="btn-apply"
                  href={placement.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply Now
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ==================================================
          DETAILS MODAL
      ================================================== */}
      {selectedPlacement && (
        <div
          className="student-modal-overlay"
          onClick={() => setSelectedPlacement(null)}
        >
          <div className="student-modal" onClick={(e) => e.stopPropagation()}>
            <div className="student-modal-header">
              <div className="student-card-company">
                <div className="student-company-icon">
                  {selectedPlacement.company?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h2>{selectedPlacement.company}</h2>
                  <p>{selectedPlacement.jobRole}</p>
                </div>
              </div>
              <button
                className="modal-close"
                onClick={() => setSelectedPlacement(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="student-modal-body">
              <div className="student-placement-details">
                <div className="detail-item">
                  <span>Package</span>
                  <strong>{selectedPlacement.package}</strong>
                </div>
                <div className="detail-item">
                  <span>Location</span>
                  <strong>{selectedPlacement.location}</strong>
                </div>
                <div className="detail-item">
                  <span>Drive Date</span>
                  <strong>{formatDate(selectedPlacement.driveDate)}</strong>
                </div>
                <div className="detail-item">
                  <span>Application Deadline</span>
                  <strong>
                    {formatDate(selectedPlacement.applicationDeadline)}
                  </strong>
                </div>
              </div>

              <div className="student-section">
                <h3>Eligibility</h3>
                <p>{selectedPlacement.eligibility}</p>
              </div>

              {selectedPlacement.skills?.length > 0 && (
                <div className="student-section">
                  <h3>Required Skills</h3>
                  <div className="skills-list">
                    {selectedPlacement.skills.map((skill, index) => (
                      <span key={index}>{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="student-section">
                <h3>About the Opportunity</h3>
                <p className="description">{selectedPlacement.description}</p>
              </div>
            </div>

            <div className="student-modal-footer">
              <a
                className="btn-apply-modal"
                href={selectedPlacement.applyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          STYLES
      ================================================== */}
      <style>{`

  .student-placement-page {
    min-height: 100vh;
    padding: 36px 32px 60px;
    background: var(--bg-main);
    color: var(--text-main);
    font-family: 'Georgia', sans-serif;
  }

  /* ---------- HEADER ---------- */
  .student-placement-header {
    margin-bottom: 26px;
  }

  .eyebrow {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.8px;
    color: var(--primary-text);
    margin-bottom: 8px;
    text-transform: uppercase;
  }

  .student-placement-header h1 {
    margin: 0;
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: var(--text-main);
  }

  .student-placement-header p {
    margin: 8px 0 0;
    color: var(--text-muted);
    font-size: 14.5px;
    line-height: 1.6;
    max-width: 580px;
  }

  /* ---------- SEARCH ---------- */
  .student-placement-search {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--bg-input);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0 14px;
    max-width: 620px;
    margin-bottom: 28px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .student-placement-search:focus-within {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 12%, transparent);
  }

  .student-placement-search .search-icon {
    color: var(--text-faint);
    flex-shrink: 0;
    transition: color 0.2s ease;
  }

  .student-placement-search:focus-within .search-icon {
    color: var(--primary);
  }

  .student-placement-search input {
    width: 100%;
    border: 0;
    outline: 0;
    padding: 13px 0;
    background: transparent;
    color: var(--text-main);
    font-size: 14px;
    font-family: 'Georgia', sans-serif;
  }

  .student-placement-search input::placeholder {
    color: var(--text-faint);
  }

  .search-clear {
    background: transparent;
    border: 0;
    color: var(--text-faint);
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .search-clear:hover {
    background: var(--bg-secondary);
    color: var(--text-main);
  }

  /* ---------- GRID ---------- */
  .student-placement-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
    gap: 18px;
  }

  /* ---------- CARD ---------- */
  .student-placement-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 24px;
    box-shadow: var(--shadow);
    transition: transform 0.25s ease,
                box-shadow 0.25s ease,
                border-color 0.25s ease;
  }

  .student-placement-card:hover {
    transform: translateY(-3px);
    border-color: var(--border-hover);
    box-shadow: 0 16px 40px -8px rgba(0, 0, 0, 0.12);
  }

  /* ---------- COMPANY ---------- */
  .student-card-company {
    display: flex;
    align-items: center;
    gap: 13px;
  }

  .student-company-icon {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: var(--primary);
    color: #ffffff;
    font-weight: 800;
    font-size: 20px;
    letter-spacing: -0.5px;
  }

  .student-card-company h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 800;
    color: var(--text-main);
    letter-spacing: -0.2px;
  }

  .student-card-company p {
    margin: 4px 0 0;
    color: var(--text-muted);
    font-size: 13.5px;
    font-weight: 500;
  }

  /* ---------- DETAILS ---------- */
  .student-placement-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    margin-top: 20px;
    padding: 16px;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 10px;
  }

  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .detail-item span {
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: var(--text-faint);
    font-weight: 600;
  }

  .detail-item strong {
    font-size: 13px;
    line-height: 1.4;
    color: var(--text-main);
    font-weight: 700;
  }

  /* ---------- SECTIONS ---------- */
  .student-section {
    margin-top: 18px;
  }

  .student-section h3 {
    margin: 0 0 6px;
    font-size: 11.5px;
    text-transform: uppercase;
    letter-spacing: 0.7px;
    color: var(--text-faint);
    font-weight: 700;
  }

  .student-section p {
    margin: 0;
    color: var(--text-muted);
    font-size: 13.5px;
    line-height: 1.6;
  }

  .description {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* ---------- SKILLS ---------- */
  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .skills-list span {
    padding: 5px 10px;
    border-radius: 6px;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 11.5px;
    font-weight: 600;
    transition: border-color 0.2s ease, color 0.2s ease;
  }

  .skills-list span:hover {
    border-color: var(--primary);
    color: var(--primary-text);
  }

  /* ---------- FOOTER ---------- */
  .student-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid var(--border);
  }

  .btn-details {
    border: 1px solid var(--border);
    background: var(--bg-card);
    color: var(--text-main);
    padding: 9px 15px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 12.5px;
    font-family: 'Georgia', sans-serif;
    transition: all 0.2s ease;
  }

  .btn-details:hover {
    border-color: var(--primary);
    color: var(--primary-text);
    background: color-mix(in srgb, var(--primary) 5%, var(--bg-card));
  }

  .btn-apply {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #ffffff;
    background: var(--primary);
    text-decoration: none;
    font-weight: 700;
    font-size: 12.5px;
    padding: 9px 15px;
    border-radius: 8px;
    transition: all 0.2s ease;
    border: 1px solid var(--primary);
  }

  .btn-apply:hover {
    background: var(--primary-hover);
    border-color: var(--primary-hover);
    transform: translateY(-1px);
  }

  .btn-apply svg {
    transition: transform 0.2s ease;
  }

  .btn-apply:hover svg {
    transform: translateX(2px);
  }

  /* ---------- LOADING / EMPTY ---------- */
  .student-placement-loading,
  .student-placement-empty {
    padding: 80px 20px;
    text-align: center;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 14px;
    box-shadow: var(--shadow);
  }

  .loading-spinner {
    width: 36px;
    height: 36px;
    margin: 0 auto 16px;
    border: 3px solid var(--border);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .student-placement-loading p {
    color: var(--text-muted);
    font-size: 14px;
    margin: 0;
  }

  .student-placement-empty .empty-icon {
    font-size: 38px;
    margin-bottom: 12px;
  }

  .student-placement-empty h2 {
    margin: 0 0 6px;
    color: var(--text-main);
    font-size: 20px;
    font-weight: 800;
  }

  .student-placement-empty p {
    color: var(--text-muted);
    font-size: 13.5px;
    max-width: 360px;
    margin: 0 auto;
    line-height: 1.6;
  }

  /* ================================
     DETAILS MODAL
  ================================= */
  .student-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px);
    animation: overlayIn 0.2s ease both;
  }

  @keyframes overlayIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .student-modal {
    width: 100%;
    max-width: 720px;
    max-height: 90vh;
    overflow-y: auto;
    background: var(--bg-card);
    color: var(--text-main);
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
    animation: modalIn 0.25s ease both;
  }

  @keyframes modalIn {
    from { opacity: 0; transform: translateY(16px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .student-modal::-webkit-scrollbar {
    width: 6px;
  }

  .student-modal::-webkit-scrollbar-track {
    background: transparent;
  }

  .student-modal::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 3px;
  }

  .student-modal::-webkit-scrollbar-thumb:hover {
    background: var(--border-hover);
  }

  .student-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    padding: 24px;
    border-bottom: 1px solid var(--border);
  }

  .modal-close {
    width: 34px;
    height: 34px;
    flex-shrink: 0;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--bg-secondary);
    color: var(--text-main);
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .modal-close:hover {
    border-color: var(--primary);
    color: var(--primary);
    background: color-mix(in srgb, var(--primary) 8%, var(--bg-secondary));
  }

  .student-modal-body {
    padding: 24px;
  }

  .student-modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 18px 24px;
    border-top: 1px solid var(--border);
  }

  .btn-apply-modal {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #ffffff;
    background: var(--primary);
    text-decoration: none;
    font-weight: 700;
    font-size: 13.5px;
    padding: 11px 22px;
    border-radius: 10px;
    transition: all 0.2s ease;
    box-shadow: 0 4px 14px -4px color-mix(in srgb, var(--primary) 60%, transparent);
  }

  .btn-apply-modal:hover {
    background: var(--primary-hover);
    transform: translateY(-1px);
    box-shadow: 0 8px 20px -4px color-mix(in srgb, var(--primary) 70%, transparent);
  }

  .btn-apply-modal svg {
    transition: transform 0.2s ease;
  }

  .btn-apply-modal:hover svg {
    transform: translateX(3px);
  }

  /* ---------- RESPONSIVE ---------- */
  @media (max-width: 700px) {
    .student-placement-page {
      padding: 24px 18px 50px;
    }

    .student-placement-header h1 {
      font-size: 28px;
    }

    .student-placement-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .student-placement-details {
      grid-template-columns: 1fr;
    }

    .student-card-footer {
      flex-direction: column;
      align-items: stretch;
    }

    .btn-details,
    .btn-apply {
      justify-content: center;
      text-align: center;
    }

    .student-modal-header,
    .student-modal-body,
    .student-modal-footer {
      padding-left: 18px;
      padding-right: 18px;
    }

    .student-placement-card {
      padding: 20px;
    }
  }

`}</style>
    </div>
  );
}
