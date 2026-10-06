import React, { useEffect, useState } from "react";
import API from "../../axiosConfig";

const emptyForm = {
  company: "",
  jobRole: "",
  package: "",
  eligibility: "",
  location: "",
  driveDate: "",
  applicationDeadline: "",
  skills: "",
  description: "",
  applyLink: "",
};

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const toInputDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

export default function Placements() {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);

  // ======================================================
  // FETCH PLACEMENTS
  // ======================================================

  const fetchPlacements = async () => {
    try {
      setLoading(true);
      const response = await API.get("/placements/admin");
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

  // ======================================================
  // INPUT CHANGE
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ======================================================
  // OPEN ADD MODAL
  // ======================================================

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  // ======================================================
  // OPEN EDIT MODAL
  // ======================================================

  const openEditModal = (placement) => {
    setEditingId(placement._id);
    setForm({
      company: placement.company || "",
      jobRole: placement.jobRole || "",
      package: placement.package || "",
      eligibility: placement.eligibility || "",
      location: placement.location || "",
      driveDate: toInputDate(placement.driveDate),
      applicationDeadline: toInputDate(placement.applicationDeadline),
      skills: Array.isArray(placement.skills)
        ? placement.skills.join(", ")
        : "",
      description: placement.description || "",
      applyLink: placement.applyLink || "",
    });
    setShowModal(true);
  };

  // ======================================================
  // SUBMIT
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.company.trim()) {
      alert("Company name is required");
      return;
    }
    if (!form.jobRole.trim()) {
      alert("Job role is required");
      return;
    }
    if (!form.package.trim()) {
      alert("Package is required");
      return;
    }
    if (!form.eligibility.trim()) {
      alert("Eligibility is required");
      return;
    }
    if (!form.location.trim()) {
      alert("Location is required");
      return;
    }
    if (!form.driveDate) {
      alert("Drive date is required");
      return;
    }
    if (!form.applicationDeadline) {
      alert("Application deadline is required");
      return;
    }
    if (!form.description.trim()) {
      alert("Description is required");
      return;
    }
    if (!form.applyLink.trim()) {
      alert("Apply link is required");
      return;
    }

    const skills = form.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const payload = {
      company: form.company.trim(),
      jobRole: form.jobRole.trim(),
      package: form.package.trim(),
      eligibility: form.eligibility.trim(),
      location: form.location.trim(),
      driveDate: form.driveDate,
      applicationDeadline: form.applicationDeadline,
      skills,
      description: form.description.trim(),
      applyLink: form.applyLink.trim(),
    };

    try {
      setSaving(true);
      if (editingId) {
        await API.put(`/placements/${editingId}`, payload);
        alert("Placement updated successfully");
      } else {
        await API.post("/placements", payload);
        alert("Placement added successfully");
      }
      setShowModal(false);
      setForm(emptyForm);
      setEditingId(null);
      fetchPlacements();
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to save placement");
    } finally {
      setSaving(false);
    }
  };

  // ======================================================
  // DELETE
  // ======================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this placement?",
    );
    if (!confirmed) return;

    try {
      await API.delete(`/placements/${id}`);
      setPlacements((prev) => prev.filter((item) => item._id !== id));
      alert("Placement deleted successfully");
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to delete placement");
    }
  };

  // ======================================================
  // SEARCH
  // ======================================================

  const filteredPlacements = placements.filter((placement) => {
    const query = search.toLowerCase();
    return (
      placement.company?.toLowerCase().includes(query) ||
      placement.jobRole?.toLowerCase().includes(query) ||
      placement.location?.toLowerCase().includes(query) ||
      placement.package?.toLowerCase().includes(query)
    );
  });

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="placement-admin-page">
      {/* HEADER */}
      <div className="placement-header">
        <div>
          <div className="eyebrow">ADMIN PANEL</div>
          <h1>Placement Management</h1>
          <p>Manage placement opportunities and notify students.</p>
        </div>
        <button className="add-placement-btn" onClick={openAddModal}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Placement
        </button>
      </div>

      {/* SEARCH / TOOLBAR */}
      <div className="placement-toolbar">
        <div className="placement-search">
          <svg
            className="search-icon"
            width="16"
            height="16"
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
            placeholder="Search company, role, location..."
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
        <div className="placement-count">
          {filteredPlacements.length} Placement
          {filteredPlacements.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="placement-loading">
          <div className="loading-spinner" />
          <p>Loading placements...</p>
        </div>
      ) : filteredPlacements.length === 0 ? (
        <div className="placement-empty">
          <div className="empty-icon">📋</div>
          <h2>No placements found</h2>
          <p>Add a placement opportunity to notify students.</p>
          <button onClick={openAddModal}>Add Placement</button>
        </div>
      ) : (
        <div className="placement-grid">
          {filteredPlacements.map((placement) => (
            <div className="placement-card" key={placement._id}>
              <div className="placement-card-top">
                <div className="company-icon">
                  {placement.company?.charAt(0)?.toUpperCase()}
                </div>
                <div className="company-info">
                  <h2>{placement.company}</h2>
                  <p>{placement.jobRole}</p>
                </div>
                <div className="card-actions">
                  <button
                    className="edit-btn"
                    onClick={() => openEditModal(placement)}
                    aria-label="Edit"
                  >
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
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(placement._id)}
                    aria-label="Delete"
                  >
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
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="placement-meta">
                <div>
                  <span>Package</span>
                  <strong>{placement.package}</strong>
                </div>
                <div>
                  <span>Location</span>
                  <strong>{placement.location}</strong>
                </div>
                <div>
                  <span>Drive Date</span>
                  <strong>{formatDate(placement.driveDate)}</strong>
                </div>
                <div>
                  <span>Deadline</span>
                  <strong>{formatDate(placement.applicationDeadline)}</strong>
                </div>
              </div>

              <div className="placement-description">
                {placement.description}
              </div>

              <div className="placement-footer">
                <span>Added on {formatDate(placement.createdAt)}</span>
                <a
                  href={placement.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Apply Link
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
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
          MODAL
      ================================================== */}
      {showModal && (
        <div
          className="placement-modal-overlay"
          onClick={() => {
            if (!saving) setShowModal(false);
          }}
        >
          <div className="placement-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{editingId ? "Edit Placement" : "Add Placement"}</h2>
                <p>Enter the placement details students should receive.</p>
              </div>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
                disabled={saving}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Company *</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Example: TCS"
                  />
                </div>

                <div className="form-group">
                  <label>Job Role *</label>
                  <input
                    name="jobRole"
                    value={form.jobRole}
                    onChange={handleChange}
                    placeholder="Example: Software Developer"
                  />
                </div>

                <div className="form-group">
                  <label>Package *</label>
                  <input
                    name="package"
                    value={form.package}
                    onChange={handleChange}
                    placeholder="Example: 7 LPA"
                  />
                </div>

                <div className="form-group">
                  <label>Location *</label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Example: Bangalore"
                  />
                </div>

                <div className="form-group">
                  <label>Drive Date *</label>
                  <input
                    type="date"
                    name="driveDate"
                    value={form.driveDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Application Deadline *</label>
                  <input
                    type="date"
                    name="applicationDeadline"
                    value={form.applicationDeadline}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group full">
                  <label>Eligibility *</label>
                  <textarea
                    name="eligibility"
                    value={form.eligibility}
                    onChange={handleChange}
                    placeholder="Example: MCA students with minimum 7 CGPA, 2027 batch"
                    rows="3"
                  />
                </div>

                <div className="form-group full">
                  <label>Skills</label>
                  <input
                    name="skills"
                    value={form.skills}
                    onChange={handleChange}
                    placeholder="Java, SQL, DSA, React"
                  />
                  <small>Separate skills using commas.</small>
                </div>

                <div className="form-group full">
                  <label>Description *</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Enter complete placement description..."
                    rows="5"
                  />
                </div>

                <div className="form-group full">
                  <label>Apply Link *</label>
                  <input
                    type="url"
                    name="applyLink"
                    value={form.applyLink}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn" disabled={saving}>
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update Placement"
                      : "Add Placement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================
          STYLES
      ================================================== */}
      <style>{`

  .placement-admin-page {
    min-height: 100vh;
    padding: 36px 32px 60px;
    background: var(--bg-main);
    color: var(--text-main);
    font-family: 'Georgia', sans-serif;
  }

  /* ---------- HEADER ---------- */
  .placement-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
  }

  .eyebrow {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.8px;
    color: var(--primary-text);
    margin-bottom: 8px;
    text-transform: uppercase;
  }

  .placement-header h1 {
    margin: 0;
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: var(--text-main);
  }

  .placement-header p {
    margin: 8px 0 0;
    color: var(--text-muted);
    font-size: 14.5px;
    line-height: 1.6;
  }

  .add-placement-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 0;
    background: var(--primary);
    color: #111827;
    padding: 12px 20px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 700;
    font-size: 13.5px;
    font-family: 'Georgia', sans-serif;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .add-placement-btn:hover {
    background: var(--primary-hover);
    transform: translateY(-1px);
  }

  .add-placement-btn svg {
    transition: transform 0.2s ease;
  }

  .add-placement-btn:hover svg {
    transform: rotate(90deg);
  }

  /* ---------- TOOLBAR ---------- */
  .placement-toolbar {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
  }

  .placement-search {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    max-width: 560px;
    padding: 0 14px;
    background: var(--bg-input);
    border: 1px solid var(--border);
    border-radius: 10px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .placement-search:focus-within {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 12%, transparent);
  }

  .placement-search .search-icon {
    color: var(--text-faint);
    flex-shrink: 0;
    transition: color 0.2s ease;
  }

  .placement-search:focus-within .search-icon {
    color: var(--primary);
  }

  .placement-search input {
    flex: 1;
    border: 0;
    outline: 0;
    padding: 13px 0;
    background: transparent;
    color: var(--text-main);
    font-size: 14px;
    font-family: 'Georgia', sans-serif;
  }

  .placement-search input::placeholder {
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

  .placement-count {
    color: var(--text-muted);
    font-size: 13.5px;
    font-weight: 600;
    white-space: nowrap;
  }

  /* ---------- GRID ---------- */
  .placement-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
    gap: 20px;
  }

  /* ---------- CARD ---------- */
  .placement-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 24px;
    box-shadow: var(--shadow);
    transition: transform 0.25s ease,
                box-shadow 0.25s ease,
                border-color 0.25s ease;
  }

  .placement-card:hover {
    transform: translateY(-3px);
    border-color: var(--border-hover);
    box-shadow: 0 16px 40px -8px rgba(0, 0, 0, 0.12);
  }

  .placement-card-top {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .company-icon {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary);
    color: #ffffff;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.5px;
  }

  .company-info {
    flex: 1;
    min-width: 0;
  }

  .company-info h2 {
    margin: 0;
    font-size: 17px;
    font-weight: 800;
    color: var(--text-main);
    letter-spacing: -0.2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .company-info p {
    margin: 4px 0 0;
    color: var(--text-muted);
    font-size: 13.5px;
    font-weight: 500;
  }

  .card-actions {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
  }

  .card-actions button {
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border);
    background: var(--bg-card);
    color: var(--text-muted);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .card-actions .edit-btn:hover {
    border-color: var(--primary);
    color: var(--primary-text);
    background: color-mix(in srgb, var(--primary) 6%, var(--bg-card));
  }

  .card-actions .delete-btn:hover {
    border-color: #dc2626;
    color: #dc2626;
    background: rgba(220, 38, 38, 0.06);
  }

  /* ---------- META ---------- */
  .placement-meta {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    margin-top: 20px;
    padding: 16px;
    border-radius: 10px;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
  }

  .placement-meta div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .placement-meta span {
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: var(--text-faint);
    font-weight: 600;
  }

  .placement-meta strong {
    font-size: 13px;
    color: var(--text-main);
    font-weight: 700;
  }

  /* ---------- DESCRIPTION ---------- */
  .placement-description {
    margin-top: 18px;
    color: var(--text-muted);
    line-height: 1.65;
    font-size: 13.5px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* ---------- FOOTER ---------- */
  .placement-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid var(--border);
    font-size: 12px;
    color: var(--text-faint);
    font-weight: 500;
  }

  .placement-footer a {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: var(--primary-text);
    text-decoration: none;
    font-weight: 700;
    transition: color 0.2s ease;
  }

  .placement-footer a:hover {
    color: var(--primary-hover);
  }

  .placement-footer a svg {
    transition: transform 0.2s ease;
  }

  .placement-footer a:hover svg {
    transform: translateX(2px);
  }

  /* ---------- LOADING / EMPTY ---------- */
  .placement-loading,
  .placement-empty {
    text-align: center;
    padding: 80px 20px;
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

  .placement-loading p {
    color: var(--text-muted);
    font-size: 14px;
    margin: 0;
  }

  .placement-empty .empty-icon {
    font-size: 38px;
    margin-bottom: 12px;
  }

  .placement-empty h2 {
    margin: 0 0 6px;
    color: var(--text-main);
    font-size: 20px;
    font-weight: 800;
  }

  .placement-empty p {
    color: var(--text-muted);
    font-size: 13.5px;
    margin: 0 auto 20px;
    max-width: 360px;
    line-height: 1.6;
  }

  .placement-empty button {
    border: 0;
    background: var(--primary);
    color: #111827;
    padding: 11px 20px;
    border-radius: 9px;
    cursor: pointer;
    font-weight: 700;
    font-size: 13.5px;
    font-family: 'Georgia', sans-serif;
    transition: background 0.2s ease;
  }

  .placement-empty button:hover {
    background: var(--primary-hover);
  }

  /* ================================
     MODAL
  ================================= */
  .placement-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px);
    animation: overlayIn 0.2s ease both;
  }

  @keyframes overlayIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .placement-modal {
    width: 100%;
    max-width: 820px;
    max-height: 92vh;
    overflow-y: auto;
    background: var(--bg-card);
    color: var(--text-main);
    border: 1px solid var(--border);
    border-radius: 18px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
    animation: modalIn 0.25s ease both;
  }

  @keyframes modalIn {
    from { opacity: 0; transform: translateY(16px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .placement-modal::-webkit-scrollbar {
    width: 6px;
  }

  .placement-modal::-webkit-scrollbar-track {
    background: transparent;
  }

  .placement-modal::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 3px;
  }

  .placement-modal::-webkit-scrollbar-thumb:hover {
    background: var(--border-hover);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    padding: 26px 28px;
    border-bottom: 1px solid var(--border);
  }

  .modal-header h2 {
    margin: 0;
    color: var(--text-main);
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.3px;
  }

  .modal-header p {
    margin: 6px 0 0;
    color: var(--text-muted);
    font-size: 13px;
    line-height: 1.5;
  }

  .modal-close {
    width: 34px;
    height: 34px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--bg-secondary);
    color: var(--text-main);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .modal-close:hover:not(:disabled) {
    border-color: var(--primary);
    color: var(--primary);
    background: color-mix(in srgb, var(--primary) 8%, var(--bg-secondary));
  }

  .modal-close:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .placement-modal form {
    padding: 28px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .form-group.full {
    grid-column: 1 / -1;
  }

  .form-group label {
    font-size: 12.5px;
    font-weight: 700;
    color: var(--text-main);
    letter-spacing: 0.2px;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    border: 1px solid var(--border);
    border-radius: 9px;
    padding: 11px 13px;
    outline: none;
    background: var(--bg-input);
    color: var(--text-main);
    font-family: 'Georgia', sans-serif;
    font-size: 13.5px;
    resize: vertical;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: var(--text-faint);
  }

  .form-group input:focus,
  .form-group textarea:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent);
  }

  .form-group small {
    color: var(--text-faint);
    font-size: 11.5px;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 28px;
    padding-top: 22px;
    border-top: 1px solid var(--border);
  }

  .cancel-btn,
  .save-btn {
    padding: 11px 22px;
    border-radius: 9px;
    cursor: pointer;
    font-weight: 700;
    font-size: 13.5px;
    font-family: 'Georgia', sans-serif;
    transition: all 0.2s ease;
  }

  .cancel-btn {
    border: 1px solid var(--border);
    background: var(--bg-card);
    color: var(--text-main);
  }

  .cancel-btn:hover:not(:disabled) {
    border-color: var(--border-hover);
    background: var(--bg-secondary);
  }

  .save-btn {
    border: 0;
    background: var(--primary);
    color: #111827;
  }

  .save-btn:hover:not(:disabled) {
    background: var(--primary-hover);
    transform: translateY(-1px);
  }

  .cancel-btn:disabled,
  .save-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  /* ---------- RESPONSIVE ---------- */
  @media (max-width: 700px) {
    .placement-admin-page {
      padding: 24px 18px 50px;
    }

    .placement-header {
      flex-direction: column;
      align-items: stretch;
    }

    .placement-header h1 {
      font-size: 26px;
    }

    .add-placement-btn {
      justify-content: center;
    }

    .placement-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .form-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .form-group.full {
      grid-column: auto;
    }

    .placement-card-top {
      align-items: flex-start;
    }

    .card-actions {
      flex-direction: row;
    }

    .placement-toolbar {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
    }

    .placement-search {
      max-width: none;
    }

    .placement-count {
      text-align: right;
    }

    .modal-header,
    .placement-modal form {
      padding-left: 20px;
      padding-right: 20px;
    }

    .modal-footer {
      flex-direction: column-reverse;
    }

    .cancel-btn,
    .save-btn {
      width: 100%;
      text-align: center;
    }
  }

`}</style>
    </div>
  );
}
