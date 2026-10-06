import { useEffect, useMemo, useState } from "react";
import API from "../../axiosConfig";

function GDTopics() {
  const [domains, setDomains] = useState([]);
  const [topics, setTopics] = useState([]);

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [expandedDomains, setExpandedDomains] = useState({});

  const [showDomainModal, setShowDomainModal] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);

  const [editingTopic, setEditingTopic] = useState(null);
  const [editingDomain, setEditingDomain] = useState(null);

  const [domainForm, setDomainForm] = useState({
    name: "",
    description: "",
  });

  const [topicForm, setTopicForm] = useState({
    title: "",
    description: "",
    domainId: "",
  });

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  // ============================================================
  // LOAD DATA
  // ============================================================

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [domainsRes, topicsRes] = await Promise.all([
        API.get("/gd/domains"),
        API.get("/gd/topics"),
      ]);

      const loadedDomains = domainsRes.data || [];
      const loadedTopics = topicsRes.data || [];

      setDomains(loadedDomains);
      setTopics(loadedTopics);

      const initialExpanded = {};

      loadedDomains.forEach((domain, index) => {
        initialExpanded[domain._id] = index < 3;
      });

      setExpandedDomains(initialExpanded);
    } catch (error) {
      console.error("GD loading error:", error);

      showMessage(
        "error",
        error.response?.data?.message || "Failed to load GD topics.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // MESSAGE
  // ============================================================

  const showMessage = (type, text) => {
    setMessage({
      type,
      text,
    });

    setTimeout(() => {
      setMessage({
        type: "",
        text: "",
      });
    }, 3500);
  };

  // ============================================================
  // FILTER TOPICS
  // ============================================================

  const filteredTopics = useMemo(() => {
    let result = [...topics];

    if (activeTab === "mine") {
      /*
       * The backend's /gd/topics/my endpoint is used when creating
       * or loading the My Topics page. For this combined page,
       * we identify ownership from createdBy.
       *
       * If your faculty ID is available in localStorage/auth state,
       * replace this section with that exact ID.
       */
      return result.filter((topic) => topic.isMine === true);
    }

    if (selectedDomain !== "all") {
      result = result.filter((topic) => topic.domain?._id === selectedDomain);
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((topic) => {
        return (
          topic.title?.toLowerCase().includes(query) ||
          topic.description?.toLowerCase().includes(query) ||
          topic.domain?.name?.toLowerCase().includes(query) ||
          topic.createdBy?.name?.toLowerCase().includes(query)
        );
      });
    }

    return result;
  }, [topics, activeTab, selectedDomain, search]);

  // ============================================================
  // GROUP TOPICS BY DOMAIN
  // ============================================================

  const groupedDomains = useMemo(() => {
    return domains
      .map((domain) => ({
        ...domain,
        topics: filteredTopics.filter(
          (topic) => topic.domain?._id === domain._id,
        ),
      }))
      .filter((domain) => {
        if (search.trim() || selectedDomain !== "all") {
          return domain.topics.length > 0;
        }

        return true;
      });
  }, [domains, filteredTopics, search, selectedDomain]);

  // ============================================================
  // TOGGLE DOMAIN
  // ============================================================

  const toggleDomain = (domainId) => {
    setExpandedDomains((prev) => ({
      ...prev,
      [domainId]: !prev[domainId],
    }));
  };

  // ============================================================
  // CREATE DOMAIN
  // ============================================================

  const handleCreateDomain = async (e) => {
    e.preventDefault();

    if (!domainForm.name.trim()) {
      showMessage("error", "Domain name is required.");
      return;
    }

    try {
      setActionLoading(true);

      if (editingDomain) {
        const res = await API.put(
          `/gd/domains/${editingDomain._id}`,
          domainForm,
        );

        setDomains((prev) =>
          prev.map((domain) =>
            domain._id === editingDomain._id ? res.data.domain : domain,
          ),
        );

        showMessage("success", "Domain updated successfully.");
      } else {
        const res = await API.post("/gd/domains", domainForm);

        setDomains((prev) => [res.data.domain, ...prev]);

        showMessage("success", "Domain created successfully.");
      }

      closeDomainModal();
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message || "Failed to save domain.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ============================================================
  // DELETE DOMAIN
  // ============================================================

  const handleDeleteDomain = async (domain) => {
    const confirmed = window.confirm(
      `Delete "${domain.name}" and all topics inside it?`,
    );

    if (!confirmed) return;

    try {
      setActionLoading(true);

      await API.delete(`/gd/domains/${domain._id}`);

      setDomains((prev) => prev.filter((item) => item._id !== domain._id));

      setTopics((prev) =>
        prev.filter((topic) => topic.domain?._id !== domain._id),
      );

      showMessage("success", "Domain and its topics deleted.");
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message || "Failed to delete domain.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ============================================================
  // CREATE / UPDATE TOPIC
  // ============================================================

  const handleSaveTopic = async (e) => {
    e.preventDefault();

    if (!topicForm.domainId) {
      showMessage("error", "Please select a domain.");
      return;
    }

    if (!topicForm.title.trim()) {
      showMessage("error", "Topic title is required.");
      return;
    }

    try {
      setActionLoading(true);

      if (editingTopic) {
        const res = await API.put(`/gd/topics/${editingTopic._id}`, topicForm);

        setTopics((prev) =>
          prev.map((topic) =>
            topic._id === editingTopic._id ? res.data.topic : topic,
          ),
        );

        showMessage("success", "GD topic updated successfully.");
      } else {
        const res = await API.post(`/gd/domains/${topicForm.domainId}/topics`, {
          title: topicForm.title,
          description: topicForm.description,
        });

        setTopics((prev) => [res.data.topic, ...prev]);

        showMessage("success", "GD topic created successfully.");
      }

      closeTopicModal();
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message || "Failed to save GD topic.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ============================================================
  // DELETE TOPIC
  // ============================================================

  const handleDeleteTopic = async (topic) => {
    const confirmed = window.confirm(`Delete "${topic.title}"?`);

    if (!confirmed) return;

    try {
      setActionLoading(true);

      await API.delete(`/gd/topics/${topic._id}`);

      setTopics((prev) => prev.filter((item) => item._id !== topic._id));

      showMessage("success", "GD topic deleted successfully.");
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message || "Failed to delete topic.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ============================================================
  // MODALS
  // ============================================================

  const openCreateDomain = () => {
    setEditingDomain(null);

    setDomainForm({
      name: "",
      description: "",
    });

    setShowDomainModal(true);
  };

  const openEditDomain = (domain) => {
    setEditingDomain(domain);

    setDomainForm({
      name: domain.name || "",
      description: domain.description || "",
    });

    setShowDomainModal(true);
  };

  const closeDomainModal = () => {
    setShowDomainModal(false);
    setEditingDomain(null);

    setDomainForm({
      name: "",
      description: "",
    });
  };

  const openCreateTopic = (domainId = "") => {
    setEditingTopic(null);

    setTopicForm({
      title: "",
      description: "",
      domainId,
    });

    setShowTopicModal(true);
  };

  const openEditTopic = (topic) => {
    setEditingTopic(topic);

    setTopicForm({
      title: topic.title || "",
      description: topic.description || "",
      domainId: topic.domain?._id || "",
    });

    setShowTopicModal(true);
  };

  const closeTopicModal = () => {
    setShowTopicModal(false);
    setEditingTopic(null);

    setTopicForm({
      title: "",
      description: "",
      domainId: "",
    });
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="gd-page">
        <style>{styles}</style>

        <div className="gd-loading">
          <div className="gd-spinner" />

          <p>Loading discussion workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gd-page">
      <style>{styles}</style>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="gd-header">
        <div>
          <div className="gd-eyebrow">FACULTY WORKSPACE</div>

          <h1 className="gd-title">Group Discussions</h1>

          <p className="gd-subtitle">
            Organize domains and create meaningful discussion topics for
            students.
          </p>
        </div>

        <div className="gd-header-actions">
          <button className="gd-button secondary" onClick={openCreateDomain}>
            <PlusIcon />
            New Domain
          </button>

          <button
            className="gd-button primary"
            onClick={() => openCreateTopic()}
          >
            <PlusIcon />
            New Topic
          </button>
        </div>
      </header>

      {/* =====================================================
          MESSAGE
      ===================================================== */}

      {message.text && (
        <div className={`gd-alert ${message.type}`}>
          {message.type === "success" ? <CheckIcon /> : <AlertIcon />}

          <span>{message.text}</span>
        </div>
      )}

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <section className="gd-stats">
        <div className="gd-stat-card">
          <div className="gd-stat-icon purple">
            <LayersIcon />
          </div>

          <div>
            <div className="gd-stat-value">{domains.length}</div>

            <div className="gd-stat-label">Domains</div>
          </div>
        </div>

        <div className="gd-stat-card">
          <div className="gd-stat-icon blue">
            <MessageIcon />
          </div>

          <div>
            <div className="gd-stat-value">{topics.length}</div>

            <div className="gd-stat-label">Total Topics</div>
          </div>
        </div>

        <div className="gd-stat-card">
          <div className="gd-stat-icon green">
            <SparkleIcon />
          </div>

          <div>
            <div className="gd-stat-value">{filteredTopics.length}</div>

            <div className="gd-stat-label">Showing</div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <section className="gd-toolbar">
        <div className="gd-tabs">
          <button
            className={activeTab === "all" ? "gd-tab active" : "gd-tab"}
            onClick={() => setActiveTab("all")}
          >
            All Topics
            <span>{topics.length}</span>
          </button>

          <button
            className={activeTab === "mine" ? "gd-tab active" : "gd-tab"}
            onClick={() => setActiveTab("mine")}
          >
            My Topics
          </button>

          <button
            className={activeTab === "domains" ? "gd-tab active" : "gd-tab"}
            onClick={() => setActiveTab("domains")}
          >
            My Domains
          </button>
        </div>

        <div className="gd-filters">
          <div className="gd-search">
            <SearchIcon />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search topics..."
            />

            {search && (
              <button onClick={() => setSearch("")} className="gd-search-clear">
                ×
              </button>
            )}
          </div>

          <div className="gd-select-wrap">
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="gd-select"
            >
              <option value="all">All Domains</option>

              {domains.map((domain) => (
                <option key={domain._id} value={domain._id}>
                  {domain.name}
                </option>
              ))}
            </select>

            <ChevronDownIcon />
          </div>
        </div>
      </section>

      {/* =====================================================
          MY DOMAINS
      ===================================================== */}

      {activeTab === "domains" ? (
        <MyDomainsView
          domains={domains}
          topics={topics}
          onCreate={openCreateDomain}
          onEdit={openEditDomain}
          onDelete={handleDeleteDomain}
          onAddTopic={openCreateTopic}
          actionLoading={actionLoading}
        />
      ) : (
        <>
          {/* =================================================
              DOMAIN LIST
          ================================================= */}

          <div className="gd-domain-list">
            {groupedDomains.length === 0 ? (
              <EmptyState
                search={search}
                onCreateDomain={openCreateDomain}
                onCreateTopic={openCreateTopic}
              />
            ) : (
              groupedDomains.map((domain) => (
                <DomainSection
                  key={domain._id}
                  domain={domain}
                  expanded={expandedDomains[domain._id]}
                  onToggle={() => toggleDomain(domain._id)}
                  onAddTopic={() => openCreateTopic(domain._id)}
                  onEditDomain={() => openEditDomain(domain)}
                  onDeleteDomain={() => handleDeleteDomain(domain)}
                  onEditTopic={openEditTopic}
                  onDeleteTopic={handleDeleteTopic}
                  actionLoading={actionLoading}
                />
              ))
            )}
          </div>
        </>
      )}

      {/* =====================================================
          DOMAIN MODAL
      ===================================================== */}

      {showDomainModal && (
        <Modal
          title={editingDomain ? "Edit Domain" : "Create New Domain"}
          subtitle={
            editingDomain
              ? "Update your GD domain details."
              : "Create a category for related GD topics."
          }
          onClose={closeDomainModal}
        >
          <form onSubmit={handleCreateDomain}>
            <label className="gd-label">Domain Name</label>

            <input
              className="gd-modal-input"
              value={domainForm.name}
              onChange={(e) =>
                setDomainForm({
                  ...domainForm,
                  name: e.target.value,
                })
              }
              placeholder="e.g. Technology"
              required
              autoFocus
            />

            <label className="gd-label">
              Description
              <span>Optional</span>
            </label>

            <textarea
              className="gd-modal-input textarea"
              value={domainForm.description}
              onChange={(e) =>
                setDomainForm({
                  ...domainForm,
                  description: e.target.value,
                })
              }
              placeholder="Briefly describe this domain..."
              rows={4}
            />

            <div className="gd-modal-actions">
              <button
                type="button"
                className="gd-button secondary"
                onClick={closeDomainModal}
                disabled={actionLoading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="gd-button primary"
                disabled={actionLoading}
              >
                {actionLoading
                  ? "Saving..."
                  : editingDomain
                    ? "Save Changes"
                    : "Create Domain"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* =====================================================
          TOPIC MODAL
      ===================================================== */}

      {showTopicModal && (
        <Modal
          title={editingTopic ? "Edit GD Topic" : "Create GD Topic"}
          subtitle={
            editingTopic
              ? "Update the discussion topic."
              : "Add a new discussion topic under a domain."
          }
          onClose={closeTopicModal}
        >
          <form onSubmit={handleSaveTopic}>
            <label className="gd-label">Domain</label>

            <div className="gd-domain-selector">
              {domains.map((domain) => (
                <button
                  type="button"
                  key={domain._id}
                  className={
                    topicForm.domainId === domain._id
                      ? "gd-domain-option selected"
                      : "gd-domain-option"
                  }
                  onClick={() =>
                    setTopicForm({
                      ...topicForm,
                      domainId: domain._id,
                    })
                  }
                >
                  <div className="gd-domain-option-icon">
                    <LayersIcon />
                  </div>

                  <span>{domain.name}</span>

                  {topicForm.domainId === domain._id && <CheckIcon />}
                </button>
              ))}
            </div>

            <label className="gd-label">Topic Title</label>

            <input
              className="gd-modal-input"
              value={topicForm.title}
              onChange={(e) =>
                setTopicForm({
                  ...topicForm,
                  title: e.target.value,
                })
              }
              placeholder="e.g. Will AI replace software developers?"
              required
            />

            <label className="gd-label">
              Description
              <span>Optional</span>
            </label>

            <textarea
              className="gd-modal-input textarea"
              value={topicForm.description}
              onChange={(e) =>
                setTopicForm({
                  ...topicForm,
                  description: e.target.value,
                })
              }
              placeholder="Add context or points students can consider..."
              rows={4}
            />

            <div className="gd-modal-actions">
              <button
                type="button"
                className="gd-button secondary"
                onClick={closeTopicModal}
                disabled={actionLoading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="gd-button primary"
                disabled={actionLoading}
              >
                {actionLoading
                  ? "Saving..."
                  : editingTopic
                    ? "Save Changes"
                    : "Create Topic"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// ============================================================
// DOMAIN SECTION
// ============================================================

function DomainSection({
  domain,
  expanded,
  onToggle,
  onAddTopic,
  onEditDomain,
  onDeleteDomain,
  onEditTopic,
  onDeleteTopic,
  actionLoading,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="gd-domain">
      <div className="gd-domain-header" onClick={onToggle}>
        <div className="gd-domain-heading">
          <div className="gd-domain-icon">
            <LayersIcon />
          </div>

          <div>
            <div className="gd-domain-title-row">
              <h2>{domain.name}</h2>

              <span className="gd-topic-count">
                {domain.topics.length}{" "}
                {domain.topics.length === 1 ? "topic" : "topics"}
              </span>
            </div>

            {domain.description && <p>{domain.description}</p>}
          </div>
        </div>

        <div className="gd-domain-header-actions">
          <button
            className="gd-icon-button"
            title="Add topic"
            onClick={(e) => {
              e.stopPropagation();
              onAddTopic();
            }}
          >
            <PlusIcon />
          </button>

          <div className="gd-menu-wrap">
            <button
              className="gd-icon-button"
              title="More"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((prev) => !prev);
              }}
            >
              <MoreIcon />
            </button>

            {menuOpen && (
              <div className="gd-dropdown" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onEditDomain();
                  }}
                >
                  <EditIcon />
                  Edit Domain
                </button>

                <button
                  className="danger"
                  onClick={() => {
                    setMenuOpen(false);
                    onDeleteDomain();
                  }}
                  disabled={actionLoading}
                >
                  <TrashIcon />
                  Delete Domain
                </button>
              </div>
            )}
          </div>

          <div className={expanded ? "gd-chevron rotated" : "gd-chevron"}>
            <ChevronDownIcon />
          </div>
        </div>
      </div>

      {expanded && (
        <div className="gd-topic-list">
          {domain.topics.length === 0 ? (
            <div className="gd-empty-domain">
              <div className="gd-empty-icon">
                <MessageIcon />
              </div>

              <div>
                <strong>No topics yet</strong>

                <p>Add the first GD topic to this domain.</p>
              </div>

              <button
                className="gd-button secondary small"
                onClick={onAddTopic}
              >
                <PlusIcon />
                Add Topic
              </button>
            </div>
          ) : (
            domain.topics.map((topic) => (
              <TopicRow
                key={topic._id}
                topic={topic}
                onEdit={() => onEditTopic(topic)}
                onDelete={() => onDeleteTopic(topic)}
              />
            ))
          )}

          {domain.topics.length > 0 && (
            <button className="gd-view-more" onClick={onAddTopic}>
              <PlusIcon />
              Add another topic to {domain.name}
            </button>
          )}
        </div>
      )}
    </section>
  );
}

// ============================================================
// TOPIC ROW
// ============================================================

function TopicRow({ topic, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="gd-topic-row">
      <div className="gd-topic-mark">
        <SparkleIcon />
      </div>

      <div className="gd-topic-content">
        <div className="gd-topic-title">{topic.title}</div>

        {topic.description && (
          <div className="gd-topic-description">{topic.description}</div>
        )}

        <div className="gd-topic-meta">
          <span>
            <LayersIcon />
            {topic.domain?.name || "General"}
          </span>

          <span className="meta-dot">•</span>

          <span>
            {topic.createdBy?.profilePic ? (
              <img src={topic.createdBy.profilePic} alt="" />
            ) : (
              <span className="gd-avatar-small">
                {getInitials(topic.createdBy?.name || "Faculty")}
              </span>
            )}
            Added by <strong>{topic.createdBy?.name || "Faculty"}</strong>
          </span>

          <span className="meta-dot">•</span>

          <span>{formatDate(topic.createdAt)}</span>
        </div>
      </div>

      <div className="gd-topic-actions">
        <div className="gd-menu-wrap">
          <button
            className="gd-icon-button"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <MoreIcon />
          </button>

          {menuOpen && (
            <div className="gd-dropdown topic-dropdown">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit();
                }}
              >
                <EditIcon />
                Edit
              </button>

              <button
                className="danger"
                onClick={() => {
                  setMenuOpen(false);
                  onDelete();
                }}
              >
                <TrashIcon />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MY DOMAINS
// ============================================================

function MyDomainsView({
  domains,
  topics,
  onCreate,
  onEdit,
  onDelete,
  onAddTopic,
  actionLoading,
}) {
  return (
    <div className="gd-my-domains">
      <div className="gd-section-heading">
        <div>
          <div className="gd-eyebrow">YOUR CONTENT</div>

          <h2>My Domains</h2>

          <p>Domains created by you and the topics inside them.</p>
        </div>

        <button className="gd-button primary" onClick={onCreate}>
          <PlusIcon />
          New Domain
        </button>
      </div>

      {domains.length === 0 ? (
        <EmptyState onCreateDomain={onCreate} onCreateTopic={onAddTopic} />
      ) : (
        <div className="gd-my-domain-grid">
          {domains.map((domain) => {
            const count = topics.filter(
              (topic) => topic.domain?._id === domain._id,
            ).length;

            return (
              <div className="gd-my-domain-card" key={domain._id}>
                <div className="gd-my-domain-top">
                  <div className="gd-domain-icon large">
                    <LayersIcon />
                  </div>

                  <div className="gd-menu-wrap">
                    <button className="gd-icon-button" onClick={() => {}}>
                      <MoreIcon />
                    </button>

                    <div className="gd-domain-inline-actions">
                      <button onClick={() => onEdit(domain)}>
                        <EditIcon />
                      </button>

                      <button
                        className="danger"
                        onClick={() => onDelete(domain)}
                        disabled={actionLoading}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </div>

                <h3>{domain.name}</h3>

                <p>{domain.description || "No description provided."}</p>

                <div className="gd-my-domain-footer">
                  <span>
                    {count} {count === 1 ? "topic" : "topics"}
                  </span>

                  <button onClick={() => onAddTopic(domain._id)}>
                    <PlusIcon />
                    Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================
// MODAL
// ============================================================

function Modal({ title, subtitle, children, onClose }) {
  return (
    <div className="gd-modal-overlay" onMouseDown={onClose}>
      <div className="gd-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="gd-modal-header">
          <div>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          <button className="gd-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="gd-modal-body">{children}</div>
      </div>
    </div>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================

function EmptyState({ search, onCreateDomain, onCreateTopic }) {
  return (
    <div className="gd-empty">
      <div className="gd-empty-large-icon">
        <MessageIcon />
      </div>

      <h3>{search ? "No topics found" : "No GD topics yet"}</h3>

      <p>
        {search
          ? "Try a different search or domain filter."
          : "Create a domain and start building your GD topic library."}
      </p>

      {!search && (
        <div className="gd-empty-actions">
          <button className="gd-button secondary" onClick={onCreateDomain}>
            <PlusIcon />
            Create Domain
          </button>

          <button className="gd-button primary" onClick={onCreateTopic}>
            <PlusIcon />
            Create Topic
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// HELPERS
// ============================================================

function getInitials(name) {
  return (
    name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "F"
  );
}

function formatDate(date) {
  if (!date) return "";

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "";
  }

  return value.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ============================================================
// ICONS
// ============================================================

function PlusIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.5 9.5 0 0 1-4-.9L3 21l1.8-4.2A8.5 8.5 0 1 1 21 11.5Z" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.4 5.1L6 10l4.6 1.9L12 17l1.4-5.1L18 10l-4.6-1.9L12 3Z" />
      <path d="m19 15-.7 2.3L16 18l2.3.7L19 21l.7-2.3L22 18l-2.3-.7L19 15Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.3 3.7 2.9 17a2 2 0 0 0 1.8 3h14.6a2 2 0 0 0 1.8-3L13.7 3.7a2 2 0 0 0-3.4 0Z" />
    </svg>
  );
}

// ============================================================
// STYLES
// ============================================================

const styles = `
.gd-page {
  min-height: 100vh;
  padding: 42px 34px 80px;
  color: var(--text-main);
  background:
    radial-gradient(
      circle at 80% 0%,
      rgba(99,102,241,0.07),
      transparent 30%
    ),
    var(--bg-main);
  box-sizing: border-box;
  border-radius:7px;
}

.gd-header {
  max-width: 1180px;
  margin: 0 auto 30px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
}

.gd-eyebrow {
  font-size: 11px;
  letter-spacing: 0.14em;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 8px;
}

.gd-title {
  margin: 0;
  font-size: clamp(30px, 4vw, 42px);
  line-height: 1.05;
  font-weight: 900;
  letter-spacing: -0.04em;
}

.gd-subtitle {
  margin: 12px 0 0;
  max-width: 600px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-muted);
}

.gd-header-actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.gd-button {
  height: 42px;
  padding: 0 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 750;
  cursor: pointer;
  transition:
    transform .18s ease,
    box-shadow .18s ease,
    opacity .18s ease;
}

.gd-button:hover {
  transform: translateY(-1px);
}

.gd-button:disabled {
  cursor: not-allowed;
  opacity: .55;
  transform: none;
}

.gd-button.primary {
  border: 1px solid transparent;
  color: #fff;
  background: var(--primary);
  box-shadow: 0 7px 22px rgba(99,102,241,.18);
}

.gd-button.secondary {
  border: 1px solid var(--border);
  color: var(--text-main);
  background: var(--bg-card);
}

.gd-button.small {
  height: 36px;
  padding: 0 12px;
}

.gd-alert {
  max-width: 1180px;
  margin: 0 auto 20px;
  padding: 12px 15px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  font-weight: 600;
}

.gd-alert.success {
  color: #10b981;
  background: rgba(16,185,129,.09);
  border: 1px solid rgba(16,185,129,.18);
}

.gd-alert.error {
  color: #ef4444;
  background: rgba(239,68,68,.09);
  border: 1px solid rgba(239,68,68,.18);
}

.gd-stats {
  max-width: 1180px;
  margin: 0 auto 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.gd-stat-card {
  min-height: 88px;
  padding: 18px;
  box-sizing: border-box;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  display: flex;
  align-items: center;
  gap: 14px;
}

.gd-stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gd-stat-icon.purple {
  color: #8b5cf6;
  background: rgba(139,92,246,.11);
}

.gd-stat-icon.blue {
  color: #3b82f6;
  background: rgba(59,130,246,.11);
}

.gd-stat-icon.green {
  color: #10b981;
  background: rgba(16,185,129,.11);
}

.gd-stat-value {
  font-size: 23px;
  font-weight: 900;
  line-height: 1;
}

.gd-stat-label {
  margin-top: 5px;
  font-size: 12px;
  color: var(--text-muted);
}

.gd-toolbar {
  max-width: 1180px;
  margin: 0 auto 22px;
  padding: 7px;
  border: 1px solid var(--border);
  border-radius: 15px;
  background: var(--bg-card);
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.gd-tabs {
  display: flex;
  align-items: center;
  gap: 3px;
}

.gd-tab {
  height: 38px;
  padding: 0 13px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.gd-tab.active {
  color: var(--text-main);
  background: var(--bg-secondary);
  box-shadow: 0 1px 4px rgba(0,0,0,.05);
}

.gd-tab span {
  margin-left: 6px;
  opacity: .55;
}

.gd-filters {
  display: flex;
  gap: 8px;
}

.gd-search {
  width: 250px;
  height: 38px;
  padding: 0 11px;
  box-sizing: border-box;
  border: 1px solid var(--border);
  border-radius: 9px;
  background: var(--bg-input);
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-faint);
}

.gd-search input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--text-main);
  font-size: 12px;
}

.gd-search-clear {
  border: 0;
  background: transparent;
  color: var(--text-faint);
  cursor: pointer;
  font-size: 18px;
}

.gd-select-wrap {
  position: relative;
}

.gd-select {
  height: 38px;
  min-width: 145px;
  padding: 0 32px 0 11px;
  border: 1px solid var(--border);
  border-radius: 9px;
  background: var(--bg-input);
  color: var(--text-main);
  outline: 0;
  appearance: none;
  font-size: 12px;
  cursor: pointer;
}

.gd-select-wrap > svg {
  position: absolute;
  right: 9px;
  top: 11px;
  pointer-events: none;
  color: var(--text-faint);
}

.gd-domain-list {
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.gd-domain {
  border: 1px solid var(--border);
  border-radius: 17px;
  background: var(--bg-card);
  overflow: visible;
}

.gd-domain-header {
  min-height: 82px;
  padding: 15px 17px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.gd-domain-heading {
  display: flex;
  align-items: center;
  gap: 13px;
  min-width: 0;
}

.gd-domain-icon {
  width: 43px;
  height: 43px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: var(--primary);
  background: rgba(99,102,241,.1);
}

.gd-domain-icon.large {
  width: 50px;
  height: 50px;
}

.gd-domain-title-row {
  display: flex;
  align-items: center;
  gap: 9px;
  flex-wrap: wrap;
}

.gd-domain-title-row h2 {
  margin: 0;
  font-size: 15px;
  font-weight: 850;
}

.gd-domain-title-row span {
  padding: 4px 8px;
  border-radius: 999px;
  background: var(--bg-secondary);
  color: var(--text-muted);
  font-size: 10px;
  font-weight: 750;
}

.gd-domain-heading p {
  margin: 5px 0 0;
  color: var(--text-faint);
  font-size: 11px;
}

.gd-domain-header-actions {
  display: flex;
  align-items: center;
  gap: 3px;
}

.gd-icon-button {
  width: 34px;
  height: 34px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--text-faint);
  cursor: pointer;
}

.gd-icon-button:hover {
  color: var(--text-main);
  background: var(--bg-secondary);
}

.gd-chevron {
  margin-left: 5px;
  color: var(--text-faint);
  transition: transform .2s ease;
}

.gd-chevron.rotated {
  transform: rotate(180deg);
}

.gd-menu-wrap {
  position: relative;
}

.gd-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 155px;
  padding: 5px;
  z-index: 30;
  border: 1px solid var(--border);
  border-radius: 11px;
  background: var(--bg-card);
  box-shadow: 0 15px 45px rgba(0,0,0,.16);
}

.gd-dropdown button {
  width: 100%;
  height: 35px;
  padding: 0 9px;
  display: flex;
  align-items: center;
  gap: 9px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--text-main);
  font-size: 12px;
  text-align: left;
  cursor: pointer;
}

.gd-dropdown button:hover {
  background: var(--bg-secondary);
}

.gd-dropdown button.danger {
  color: #ef4444;
}

.gd-topic-list {
  border-top: 1px solid var(--border);
}

.gd-topic-row {
  min-height: 78px;
  padding: 14px 17px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 13px;
  transition: background .15s ease;
}

.gd-topic-row:hover {
  background: rgba(127,127,127,.035);
}

.gd-topic-mark {
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: var(--primary);
  background: rgba(99,102,241,.07);
}

.gd-topic-content {
  flex: 1;
  min-width: 0;
}

.gd-topic-title {
  font-size: 13px;
  font-weight: 750;
  color: var(--text-main);
}

.gd-topic-description {
  margin-top: 4px;
  color: var(--text-muted);
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gd-topic-meta {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;
  color: var(--text-faint);
  font-size: 10px;
}

.gd-topic-meta span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.gd-topic-meta svg {
  width: 12px;
  height: 12px;
}

.gd-topic-meta img,
.gd-avatar-small {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  object-fit: cover;
}

.gd-avatar-small {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  color: var(--text-muted);
  font-size: 7px;
  font-weight: 800;
}

.gd-topic-meta strong {
  color: var(--text-muted);
}

.meta-dot {
  opacity: .45;
}

.gd-topic-actions {
  position: relative;
}

.gd-view-more {
  width: 100%;
  height: 43px;
  border: 0;
  border-top: 1px solid var(--border);
  background: transparent;
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font-size: 11px;
  font-weight: 750;
  cursor: pointer;
}

.gd-view-more:hover {
  background: rgba(99,102,241,.035);
}

.gd-empty-domain {
  padding: 24px 18px;
  display: flex;
  align-items: center;
  gap: 13px;
}

.gd-empty-icon {
  width: 39px;
  height: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: var(--text-faint);
  background: var(--bg-secondary);
}

.gd-empty-domain strong {
  font-size: 12px;
}

.gd-empty-domain p {
  margin: 4px 0 0;
  font-size: 11px;
  color: var(--text-faint);
}

.gd-empty-domain .gd-button {
  margin-left: auto;
}

.gd-empty {
  max-width: 1180px;
  margin: 0 auto;
  padding: 75px 20px;
  border: 1px dashed var(--border);
  border-radius: 18px;
  text-align: center;
}

.gd-empty-large-icon {
  width: 62px;
  height: 62px;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  color: var(--primary);
  background: rgba(99,102,241,.08);
}

.gd-empty h3 {
  margin: 0;
  font-size: 18px;
}

.gd-empty p {
  max-width: 420px;
  margin: 7px auto 20px;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.5;
}

.gd-empty-actions {
  display: flex;
  justify-content: center;
  gap: 9px;
}

.gd-my-domains {
  max-width: 1180px;
  margin: 0 auto;
}

.gd-section-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 18px;
}

.gd-section-heading h2 {
  margin: 0;
  font-size: 21px;
  font-weight: 850;
}

.gd-section-heading p {
  margin: 5px 0 0;
  color: var(--text-muted);
  font-size: 12px;
}

.gd-my-domain-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.gd-my-domain-card {
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--bg-card);
}

.gd-my-domain-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.gd-my-domain-card h3 {
  margin: 17px 0 5px;
  font-size: 15px;
}

.gd-my-domain-card > p {
  min-height: 38px;
  margin: 0;
  color: var(--text-muted);
  font-size: 11px;
  line-height: 1.5;
}

.gd-my-domain-footer {
  margin-top: 18px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-faint);
  font-size: 11px;
}

.gd-my-domain-footer button {
  display: flex;
  align-items: center;
  gap: 5px;
  border: 0;
  background: transparent;
  color: var(--primary);
  font-weight: 750;
  cursor: pointer;
}

.gd-domain-inline-actions {
  display: flex;
  gap: 3px;
  position: absolute;
  top: 39px;
  right: 0;
  padding: 4px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  border-radius: 8px;
  opacity: 0;
  pointer-events: none;
}

.gd-my-domain-card:hover .gd-domain-inline-actions {
  opacity: 1;
  pointer-events: auto;
}

.gd-domain-inline-actions button {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
}

.gd-domain-inline-actions button:hover {
  background: var(--bg-secondary);
}

.gd-domain-inline-actions .danger {
  color: #ef4444;
}

.gd-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.48);
  backdrop-filter: blur(7px);
}

.gd-modal {
  width: min(530px, 100%);
  max-height: calc(100vh - 40px);
  overflow: auto;
  border: 1px solid var(--border);
  border-radius: 19px;
  background: var(--bg-card);
  box-shadow: 0 30px 90px rgba(0,0,0,.25);
}

.gd-modal-header {
  padding: 21px 22px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid var(--border);
}

.gd-modal-header h2 {
  margin: 0;
  font-size: 17px;
  font-weight: 850;
}

.gd-modal-header p {
  margin: 5px 0 0;
  color: var(--text-muted);
  font-size: 11px;
}

.gd-modal-close {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border: 0;
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-muted);
  font-size: 21px;
  line-height: 1;
  cursor: pointer;
}

.gd-modal-body {
  padding: 22px;
}

.gd-label {
  margin: 0 0 7px;
  display: flex;
  justify-content: space-between;
  color: var(--text-muted);
  font-size: 11px;
  font-weight: 750;
}

.gd-label span {
  color: var(--text-faint);
  font-weight: 500;
}

.gd-modal-input {
  width: 100%;
  min-height: 43px;
  box-sizing: border-box;
  padding: 11px 13px;
  margin-bottom: 17px;
  border: 1px solid var(--border);
  border-radius: 10px;
  outline: none;
  background: var(--bg-input);
  color: var(--text-main);
  font-size: 12px;
  font-family: inherit;
}

.gd-modal-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99,102,241,.08);
}

.gd-modal-input.textarea {
  resize: vertical;
  min-height: 90px;
}

.gd-modal-actions {
  padding-top: 4px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.gd-domain-selector {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 7px;
  margin-bottom: 18px;
}

.gd-domain-option {
  min-height: 48px;
  padding: 7px 9px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg-input);
  color: var(--text-main);
  font-size: 11px;
  font-weight: 650;
  text-align: left;
  cursor: pointer;
}

.gd-domain-option.selected {
  border-color: var(--primary);
  background: rgba(99,102,241,.07);
}

.gd-domain-option > svg {
  margin-left: auto;
  color: var(--primary);
}

.gd-domain-option-icon {
  width: 27px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  color: var(--primary);
  background: rgba(99,102,241,.1);
}

.gd-loading {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 13px;
}

.gd-spinner {
  width: 28px;
  height: 28px;
  margin-bottom: 13px;
  border: 3px solid var(--border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: gd-spin .7s linear infinite;
}

@keyframes gd-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 850px) {
  .gd-page {
    padding: 28px 18px 60px;
  }

  .gd-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .gd-header-actions {
    width: 100%;
  }

  .gd-header-actions .gd-button {
    flex: 1;
  }

  .gd-stats {
    grid-template-columns: 1fr;
  }

  .gd-toolbar {
    flex-direction: column;
  }

  .gd-filters {
    width: 100%;
  }

  .gd-search {
    flex: 1;
    width: auto;
  }

  .gd-select {
    width: 150px;
  }

  .gd-my-domain-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .gd-page {
    padding: 22px 12px 50px;
  }

  .gd-title {
    font-size: 30px;
  }

  .gd-header-actions {
    flex-direction: column;
  }

  .gd-stats {
    display: none;
  }

  .gd-tabs {
    overflow-x: auto;
  }

  .gd-tab {
    white-space: nowrap;
  }

  .gd-filters {
    flex-direction: column;
  }

  .gd-search,
  .gd-select-wrap,
  .gd-select {
    width: 100%;
  }

  .gd-domain-header {
    padding: 13px;
  }

  .gd-domain-header-actions
  .gd-icon-button:first-child {
    display: none;
  }

  .gd-topic-row {
    padding: 14px 13px;
    align-items: flex-start;
  }

  .gd-topic-meta {
    display: none;
  }

  .gd-topic-description {
    white-space: normal;
  }

  .gd-empty-domain {
    flex-wrap: wrap;
  }

  .gd-empty-domain .gd-button {
    margin-left: 52px;
  }

  .gd-my-domain-grid {
    grid-template-columns: 1fr;
  }

  .gd-section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }

  .gd-domain-selector {
    grid-template-columns: 1fr;
  }
}
`;

export default GDTopics;
