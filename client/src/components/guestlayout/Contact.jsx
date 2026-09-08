import { useState } from "react";
import API from "../../axiosConfig";

const contactMethods = [
  {
    type: "email",
    label: "Email",
    value: "contact@ekalavya.com",
    hint: "Write to our team anytime",
    href: "mailto:contact@ekalavya.com",
  },
  {
    type: "phone",
    label: "Phone",
    value: "+91 63624 60082",
    hint: "Talk directly with our team",
    href: "tel:+916362460082",
  },
  {
    type: "location",
    label: "Location",
    value: "Bengaluru, Karnataka",
    hint: "Building for students across India",
    href: "https://www.google.com/maps/search/?api=1&query=Bengaluru%2C+Karnataka",
    external: true,
  },
  {
    type: "clock",
    label: "Working hours",
    value: "Mon–Fri, 9:00 AM–6:00 PM",
    hint: "Indian Standard Time",
  },
];

function ContactIcon({ type }) {
  const iconProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (type === "email") {
    return (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg {...iconProps}>
        <path d="M21 16.4v2.7a1.8 1.8 0 0 1-2 1.8 17.8 17.8 0 0 1-7.8-2.8 17.5 17.5 0 0 1-5.4-5.4A17.8 17.8 0 0 1 3 4.9a1.8 1.8 0 0 1 1.8-2h2.7a1.8 1.8 0 0 1 1.8 1.5c.1 1 .4 2 .7 2.9a1.8 1.8 0 0 1-.4 1.9L8.5 10.3a14.5 14.5 0 0 0 5.2 5.2l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.9.3 1.9.6 2.9.7a1.8 1.8 0 0 1 1.4 1.7Z" />
      </svg>
    );
  }

  if (type === "location") {
    return (
      <svg {...iconProps}>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }

  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Name, email and message are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await API.post("/contact", form);
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "We could not send your message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-background" aria-hidden="true">
        <span className="contact-orb contact-orb-one" />
        <span className="contact-orb contact-orb-two" />
        <span className="contact-grid" />
        <span className="contact-noise" />
      </div>

      <main className="contact-main">
        <section className="contact-hero" aria-labelledby="contact-title">
          <div className="contact-badge">
            <span className="contact-badge-dot" />
            Get in touch
          </div>

          <h1 id="contact-title">
            Let&apos;s build something
            <span>great together.</span>
          </h1>

          <p>
            Have an idea, a question or a project in mind? Tell us what you are
            thinking, and our team will help you take the next step.
          </p>

          <div className="contact-availability">
            <span className="contact-availability-icon">
              <span />
            </span>
            <div>
              <strong>We are available</strong>
              <small>Currently accepting new conversations</small>
            </div>
          </div>
        </section>

        <section className="contact-content" aria-label="Contact Ekalavya">
          <div className="contact-layout">
            <aside className="contact-information">
              <div className="contact-section-heading">
                <span>01 / Contact details</span>
                <h2>Start wherever feels easiest.</h2>
                <p>
                  Send a message through the form or reach us directly using any
                  of the options below.
                </p>
              </div>

              <div className="contact-methods">
                {contactMethods.map((item, index) => {
                  const MethodElement = item.href ? "a" : "div";

                  return (
                    <MethodElement
                      className="contact-method"
                      key={item.label}
                      href={item.href}
                      {...(item.external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      style={{ "--method-delay": `${index * 85}ms` }}
                    >
                      <span className="contact-method-icon">
                        <ContactIcon type={item.type} />
                      </span>

                      <span className="contact-method-copy">
                        <small>{item.label}</small>
                        <strong>{item.value}</strong>
                        <em>{item.hint}</em>
                      </span>

                      {item.href && (
                        <span className="contact-method-arrow">
                          <ArrowIcon />
                        </span>
                      )}
                    </MethodElement>
                  );
                })}
              </div>

              <div className="contact-response-card">
                <div className="contact-response-mark">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 11.5a8.5 8.5 0 0 1-9 8.5 9.6 9.6 0 0 1-3.8-.8L3 21l1.7-5A8.5 8.5 0 1 1 21 11.5Z" />
                    <path d="M8 12h.01M12 12h.01M16 12h.01" />
                  </svg>
                </div>

                <div>
                  <span>Average response time</span>
                  <strong>Within 24 hours</strong>
                </div>

                <span className="contact-response-signal">
                  <i />
                  Online
                </span>
              </div>
            </aside>

            <div className="contact-form-card">
              <span className="contact-form-accent" aria-hidden="true" />

              {success ? (
                <div
                  className="contact-success"
                  role="status"
                  aria-live="polite"
                >
                  <div className="contact-success-rings" aria-hidden="true">
                    <span />
                    <span />

                    <div className="contact-success-check">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m5 12 4.2 4.2L19 6.5" />
                      </svg>
                    </div>
                  </div>

                  <span className="contact-success-label">
                    Message delivered
                  </span>
                  <h2>Thank you for reaching out.</h2>
                  <p>
                    Your message has reached the Ekalavya team. We will get back
                    to you within 24 hours.
                  </p>

                  <button
                    type="button"
                    className="contact-secondary-button"
                    onClick={() => setSuccess(false)}
                  >
                    Send another message
                    <ArrowIcon />
                  </button>
                </div>
              ) : (
                <>
                  <div className="contact-form-heading">
                    <div>
                      <span>02 / Send a message</span>
                      <h2>Tell us about your idea.</h2>
                    </div>

                    <div className="contact-secure-label">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="5" y="10" width="14" height="11" rx="3" />
                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                      </svg>
                      Secure form
                    </div>
                  </div>

                  {error && (
                    <div className="contact-error" role="alert">
                      <span>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v6M12 17h.01" />
                        </svg>
                      </span>
                      <p>{error}</p>
                    </div>
                  )}

                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="contact-field-row">
                      <div className="contact-field">
                        <label htmlFor="contact-name">
                          Full name <span>*</span>
                        </label>
                        <div className="contact-input-shell">
                          <input
                            id="contact-name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={handleChange}
                            maxLength={80}
                            required
                          />
                          <span className="contact-field-status" />
                        </div>
                      </div>

                      <div className="contact-field">
                        <label htmlFor="contact-email">
                          Email address <span>*</span>
                        </label>
                        <div className="contact-input-shell">
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            maxLength={120}
                            required
                          />
                          <span className="contact-field-status" />
                        </div>
                      </div>
                    </div>

                    <div className="contact-field">
                      <label htmlFor="contact-subject">
                        Subject <small>Optional</small>
                      </label>
                      <div className="contact-input-shell">
                        <input
                          id="contact-subject"
                          name="subject"
                          type="text"
                          placeholder="How can we help?"
                          value={form.subject}
                          onChange={handleChange}
                          maxLength={140}
                        />
                        <span className="contact-field-status" />
                      </div>
                    </div>

                    <div className="contact-field">
                      <div className="contact-label-row">
                        <label htmlFor="contact-message">
                          Message <span>*</span>
                        </label>
                        <small>{form.message.length} / 1200</small>
                      </div>

                      <div className="contact-input-shell contact-textarea-shell">
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={6}
                          placeholder="Tell us a little about your project, question or idea..."
                          value={form.message}
                          onChange={handleChange}
                          maxLength={1200}
                          required
                        />
                        <span className="contact-field-status" />
                      </div>
                    </div>

                    <div className="contact-submit-row">
                      <p>
                        By sending this form, you agree that we may contact you
                        about your enquiry.
                      </p>

                      <button
                        type="submit"
                        className="contact-submit-button"
                        disabled={loading}
                      >
                        <span className="contact-button-content">
                          {loading ? (
                            <>
                              <i
                                className="contact-spinner"
                                aria-hidden="true"
                              />
                              Sending message
                            </>
                          ) : (
                            <>
                              Send message
                              <ArrowIcon />
                            </>
                          )}
                        </span>
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@400;500;600;700;800&display=swap");

        .contact-page,
        .contact-page * {
          box-sizing: border-box;
        }

        .contact-page {
          --contact-bg: var(--bg-main, #f4f6f2);
          --contact-card: var(--bg-card, #ffffff);
          --contact-input: var(--bg-input, #f7f8f5);
          --contact-text: var(--text-main, #151915);
          --contact-muted: var(--text-muted, #657067);
          --contact-faint: var(--text-faint, #8b958d);
          --contact-border: var(--border, #dde2dc);
          --contact-primary: var(--primary, #338a4a);
          --contact-primary-hover: var(--primary-hover, #26723b);
          --contact-primary-soft: var(
            --primary-light,
            color-mix(in srgb, var(--contact-primary) 12%, transparent)
          );
          --contact-surface-soft: color-mix(
            in srgb,
            var(--contact-card) 92%,
            var(--contact-primary) 8%
          );

          position: relative;
          isolation: isolate;
          min-height: 100vh;
          overflow: hidden;
          color: var(--contact-text);
          background: var(--contact-bg);
          font-family: "Manrope", sans-serif;
          transition: color 0.35s ease, background-color 0.35s ease;
        }

        .contact-background {
          position: absolute;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
        }

        .contact-grid {
          position: absolute;
          inset: 0;
          opacity: 0.33;
          background-image:
            linear-gradient(
              color-mix(in srgb, var(--contact-border) 48%, transparent) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              color-mix(in srgb, var(--contact-border) 48%, transparent) 1px,
              transparent 1px
            );
          background-size: 64px 64px;
          mask-image: linear-gradient(to bottom, #000 0%, transparent 62%);
        }

        .contact-noise {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.9'/%3E%3C/svg%3E");
        }

        .contact-orb {
          position: absolute;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          opacity: 0.11;
          filter: blur(110px);
          background: var(--contact-primary);
        }

        .contact-orb-one {
          top: -230px;
          left: -150px;
          animation: contact-orb-one 14s ease-in-out infinite alternate;
        }

        .contact-orb-two {
          top: 220px;
          right: -270px;
          opacity: 0.08;
          animation: contact-orb-two 18s ease-in-out infinite alternate;
        }

        .contact-main {
          position: relative;
          width: 100%;
        }

        .contact-hero {
          width: min(920px, calc(100% - 48px));
          margin: 0 auto;
          padding: 150px 0 92px;
          text-align: center;
        }

        .contact-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 9px 15px;
          border: 1px solid color-mix(
            in srgb,
            var(--contact-primary) 35%,
            var(--contact-border)
          );
          border-radius: 999px;
          color: var(--contact-primary);
          background: color-mix(
            in srgb,
            var(--contact-primary) 8%,
            var(--contact-card)
          );
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.04);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.17em;
          text-transform: uppercase;
          animation: contact-reveal 0.65s ease both;
        }

        .contact-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--contact-primary);
          box-shadow: 0 0 0 0 color-mix(
            in srgb,
            var(--contact-primary) 48%,
            transparent
          );
          animation: contact-pulse 2s infinite;
        }

        .contact-hero h1 {
          max-width: 880px;
          margin: 28px auto 0;
          color: var(--contact-text);
          font-family: "DM Serif Display", Georgia, serif;
          font-size: clamp(3.25rem, 7.3vw, 6.5rem);
          font-weight: 400;
          line-height: 0.92;
          letter-spacing: -0.055em;
          animation: contact-reveal 0.8s 0.08s ease both;
        }

        .contact-hero h1 span {
          display: block;
          color: var(--contact-primary);
          font-style: italic;
        }

        .contact-hero > p {
          max-width: 650px;
          margin: 30px auto 0;
          color: var(--contact-muted);
          font-size: clamp(15px, 1.8vw, 18px);
          line-height: 1.85;
          animation: contact-reveal 0.8s 0.16s ease both;
        }

        .contact-availability {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: 30px;
          padding: 10px 15px 10px 10px;
          border: 1px solid var(--contact-border);
          border-radius: 15px;
          color: var(--contact-text);
          background: color-mix(
            in srgb,
            var(--contact-card) 84%,
            transparent
          );
          box-shadow: 0 14px 38px rgba(0, 0, 0, 0.05);
          backdrop-filter: blur(16px);
          text-align: left;
          animation: contact-reveal 0.8s 0.24s ease both;
        }

        .contact-availability-icon {
          display: grid;
          width: 38px;
          height: 38px;
          place-items: center;
          border-radius: 11px;
          background: var(--contact-primary-soft);
        }

        .contact-availability-icon > span {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--contact-primary);
          box-shadow: 0 0 15px var(--contact-primary);
        }

        .contact-availability strong,
        .contact-availability small {
          display: block;
        }

        .contact-availability strong {
          margin-bottom: 2px;
          font-size: 12px;
          font-weight: 800;
        }

        .contact-availability small {
          color: var(--contact-faint);
          font-size: 10px;
        }

        .contact-content {
          position: relative;
          padding: 20px 24px 120px;
        }

        .contact-layout {
          display: grid;
          grid-template-columns: minmax(300px, 0.78fr) minmax(470px, 1.22fr);
          gap: clamp(38px, 6vw, 84px);
          width: min(1160px, 100%);
          margin: 0 auto;
          align-items: start;
        }

        .contact-information {
          padding-top: 26px;
        }

        .contact-section-heading > span,
        .contact-form-heading > div > span {
          display: block;
          margin-bottom: 14px;
          color: var(--contact-primary);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.17em;
          text-transform: uppercase;
        }

        .contact-section-heading h2,
        .contact-form-heading h2,
        .contact-success h2 {
          margin: 0;
          color: var(--contact-text);
          font-family: "DM Serif Display", Georgia, serif;
          font-size: clamp(2rem, 3.8vw, 2.85rem);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: -0.03em;
        }

        .contact-section-heading > p {
          margin: 19px 0 0;
          color: var(--contact-muted);
          font-size: 14px;
          line-height: 1.75;
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 35px;
        }

        .contact-method {
          position: relative;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 15px;
          width: 100%;
          padding: 14px;
          overflow: hidden;
          border: 1px solid transparent;
          border-radius: 17px;
          color: inherit;
          background: transparent;
          text-decoration: none;
          animation: contact-method-reveal 0.65s both;
          animation-delay: var(--method-delay);
          transition:
            transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.3s ease,
            background-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        a.contact-method {
          cursor: pointer;
        }

        .contact-method::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          background: linear-gradient(
            105deg,
            color-mix(in srgb, var(--contact-primary) 10%, transparent),
            transparent 62%
          );
          transition: opacity 0.3s ease;
        }

        a.contact-method:hover {
          border-color: color-mix(
            in srgb,
            var(--contact-primary) 26%,
            var(--contact-border)
          );
          background: color-mix(
            in srgb,
            var(--contact-card) 84%,
            transparent
          );
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.06);
          transform: translateX(7px);
        }

        a.contact-method:hover::before {
          opacity: 1;
        }

        .contact-method-icon,
        .contact-method-copy,
        .contact-method-arrow {
          position: relative;
          z-index: 1;
        }

        .contact-method-icon {
          display: grid;
          width: 52px;
          height: 52px;
          place-items: center;
          border: 1px solid color-mix(
            in srgb,
            var(--contact-primary) 20%,
            var(--contact-border)
          );
          border-radius: 16px;
          color: var(--contact-primary);
          background: color-mix(
            in srgb,
            var(--contact-primary) 8%,
            var(--contact-card)
          );
          transition: transform 0.3s ease, background-color 0.3s ease;
        }

        a.contact-method:hover .contact-method-icon {
          color: var(--contact-card);
          background: var(--contact-primary);
          transform: rotate(-5deg) scale(1.04);
        }

        .contact-method-icon svg {
          width: 21px;
          height: 21px;
        }

        .contact-method-copy {
          min-width: 0;
        }

        .contact-method-copy small,
        .contact-method-copy strong,
        .contact-method-copy em {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .contact-method-copy small {
          margin-bottom: 3px;
          color: var(--contact-faint);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .contact-method-copy strong {
          color: var(--contact-text);
          font-size: 13px;
          font-weight: 700;
        }

        .contact-method-copy em {
          margin-top: 3px;
          color: var(--contact-faint);
          font-size: 10px;
          font-style: normal;
        }

        .contact-method-arrow {
          display: grid;
          width: 31px;
          height: 31px;
          place-items: center;
          border-radius: 50%;
          color: var(--contact-faint);
          transition: color 0.25s ease, transform 0.25s ease;
        }

        .contact-method-arrow svg {
          width: 16px;
          height: 16px;
        }

        a.contact-method:hover .contact-method-arrow {
          color: var(--contact-primary);
          transform: translateX(3px);
        }

        .contact-response-card {
          position: relative;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 13px;
          margin-top: 28px;
          padding: 18px;
          overflow: hidden;
          border: 1px solid var(--contact-border);
          border-radius: 20px;
          background:
            linear-gradient(
              115deg,
              color-mix(in srgb, var(--contact-primary) 9%, transparent),
              transparent 60%
            ),
            color-mix(in srgb, var(--contact-card) 88%, transparent);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.055);
          backdrop-filter: blur(16px);
        }

        .contact-response-card::after {
          content: "";
          position: absolute;
          top: -30px;
          right: -30px;
          width: 100px;
          height: 100px;
          border: 1px solid color-mix(
            in srgb,
            var(--contact-primary) 25%,
            transparent
          );
          border-radius: 50%;
        }

        .contact-response-mark {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border-radius: 13px;
          color: var(--contact-primary);
          background: var(--contact-primary-soft);
        }

        .contact-response-mark svg {
          width: 20px;
          height: 20px;
        }

        .contact-response-card > div:nth-child(2) span,
        .contact-response-card > div:nth-child(2) strong {
          display: block;
        }

        .contact-response-card > div:nth-child(2) span {
          margin-bottom: 3px;
          color: var(--contact-faint);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .contact-response-card > div:nth-child(2) strong {
          color: var(--contact-text);
          font-size: 13px;
        }

        .contact-response-signal {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--contact-primary);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .contact-response-signal i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--contact-primary);
          box-shadow: 0 0 10px var(--contact-primary);
        }

        .contact-form-card {
          position: relative;
          min-height: 650px;
          padding: clamp(28px, 4.5vw, 50px);
          overflow: hidden;
          border: 1px solid color-mix(
            in srgb,
            var(--contact-primary) 12%,
            var(--contact-border)
          );
          border-radius: 30px;
          background:
            radial-gradient(
              circle at 100% 0%,
              color-mix(in srgb, var(--contact-primary) 11%, transparent),
              transparent 30%
            ),
            color-mix(in srgb, var(--contact-card) 94%, transparent);
          box-shadow:
            0 40px 100px rgba(0, 0, 0, 0.11),
            0 1px 0 color-mix(in srgb, var(--contact-text) 8%, transparent)
              inset;
          backdrop-filter: blur(24px);
          animation: contact-form-reveal 0.9s 0.12s
            cubic-bezier(0.16, 1, 0.3, 1) both;
          transition:
            border-color 0.35s ease,
            background-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        .contact-form-card:hover {
          border-color: color-mix(
            in srgb,
            var(--contact-primary) 28%,
            var(--contact-border)
          );
          box-shadow:
            0 48px 120px rgba(0, 0, 0, 0.14),
            0 1px 0 color-mix(in srgb, var(--contact-text) 8%, transparent)
              inset;
        }

        .contact-form-accent {
          position: absolute;
          top: 0;
          left: 50%;
          width: 42%;
          height: 3px;
          border-radius: 0 0 10px 10px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--contact-primary),
            transparent
          );
          box-shadow: 0 0 22px var(--contact-primary);
          transform: translateX(-50%);
        }

        .contact-form-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 35px;
        }

        .contact-form-heading h2 {
          font-size: clamp(2rem, 4vw, 2.6rem);
        }

        .contact-secure-label {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 7px;
          padding: 8px 10px;
          border: 1px solid var(--contact-border);
          border-radius: 999px;
          color: var(--contact-faint);
          background: color-mix(
            in srgb,
            var(--contact-card) 75%,
            transparent
          );
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .contact-secure-label svg {
          width: 13px;
          height: 13px;
          color: var(--contact-primary);
        }

        .contact-error {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          margin-bottom: 22px;
          padding: 13px 15px;
          border: 1px solid rgba(239, 68, 68, 0.28);
          border-radius: 13px;
          color: #dc3f3f;
          background: rgba(239, 68, 68, 0.08);
          animation: contact-shake 0.4s ease;
        }

        .contact-error > span {
          display: grid;
          flex: 0 0 auto;
          width: 20px;
          height: 20px;
          place-items: center;
        }

        .contact-error svg {
          width: 17px;
          height: 17px;
        }

        .contact-error p {
          margin: 1px 0 0;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.55;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .contact-field-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .contact-field {
          display: flex;
          min-width: 0;
          flex-direction: column;
          gap: 9px;
        }

        .contact-field label,
        .contact-label-row > small {
          color: var(--contact-muted);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.055em;
          text-transform: uppercase;
          transition: color 0.25s ease;
        }

        .contact-field label span {
          color: var(--contact-primary);
        }

        .contact-field label small {
          margin-left: 7px;
          color: var(--contact-faint);
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.08em;
        }

        .contact-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .contact-label-row > small {
          color: var(--contact-faint);
          font-size: 8px;
        }

        .contact-input-shell {
          position: relative;
          overflow: hidden;
          border: 1px solid var(--contact-border);
          border-radius: 13px;
          background: color-mix(
            in srgb,
            var(--contact-input) 92%,
            transparent
          );
          transition:
            border-color 0.25s ease,
            background-color 0.25s ease,
            box-shadow 0.25s ease,
            transform 0.25s ease;
        }

        .contact-input-shell:focus-within {
          border-color: var(--contact-primary);
          background: var(--contact-card);
          box-shadow:
            0 0 0 4px color-mix(
              in srgb,
              var(--contact-primary) 11%,
              transparent
            ),
            0 14px 30px rgba(0, 0, 0, 0.05);
          transform: translateY(-2px);
        }

        .contact-field:focus-within label {
          color: var(--contact-primary);
        }

        .contact-input-shell input,
        .contact-input-shell textarea {
          display: block;
          width: 100%;
          border: 0;
          outline: 0;
          color: var(--contact-text);
          background: transparent;
          font: inherit;
          font-size: 13px;
          line-height: 1.55;
          caret-color: var(--contact-primary);
        }

        .contact-input-shell input {
          height: 50px;
          padding: 0 17px;
        }

        .contact-input-shell textarea {
          min-height: 142px;
          padding: 15px 17px;
          resize: vertical;
        }

        .contact-input-shell input::placeholder,
        .contact-input-shell textarea::placeholder {
          color: var(--contact-faint);
          opacity: 0.7;
        }

        .contact-input-shell input:-webkit-autofill,
        .contact-input-shell input:-webkit-autofill:hover,
        .contact-input-shell input:-webkit-autofill:focus {
          -webkit-text-fill-color: var(--contact-text);
          box-shadow: 0 0 0 1000px var(--contact-input) inset;
          transition: background-color 9999s ease-in-out 0s;
        }

        .contact-field-status {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--contact-primary),
            transparent
          );
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.35s ease;
        }

        .contact-input-shell:focus-within .contact-field-status {
          transform: scaleX(1);
        }

        .contact-submit-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-top: 4px;
        }

        .contact-submit-row > p {
          max-width: 250px;
          margin: 0;
          color: var(--contact-faint);
          font-size: 9px;
          line-height: 1.55;
        }

        .contact-submit-button,
        .contact-secondary-button {
          position: relative;
          flex: 0 0 auto;
          overflow: hidden;
          border: 0;
          border-radius: 13px;
          cursor: pointer;
          font-family: inherit;
          font-weight: 800;
        }

        .contact-submit-button {
          min-width: 175px;
          min-height: 51px;
          padding: 0 21px;
          color: var(--on-primary, #ffffff);
          background: var(--contact-primary);
          box-shadow:
            0 14px 28px color-mix(
              in srgb,
              var(--contact-primary) 28%,
              transparent
            ),
            0 1px 0 rgba(255, 255, 255, 0.24) inset;
          transition:
            background-color 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease,
            opacity 0.25s ease;
        }

        .contact-submit-button::before {
          content: "";
          position: absolute;
          top: -100%;
          left: -40%;
          width: 28%;
          height: 300%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.24),
            transparent
          );
          transform: rotate(22deg);
          transition: left 0.65s ease;
        }

        .contact-submit-button:hover:not(:disabled) {
          background: var(--contact-primary-hover);
          box-shadow:
            0 19px 36px color-mix(
              in srgb,
              var(--contact-primary) 35%,
              transparent
            ),
            0 1px 0 rgba(255, 255, 255, 0.24) inset;
          transform: translateY(-3px);
        }

        .contact-submit-button:hover:not(:disabled)::before {
          left: 125%;
        }

        .contact-submit-button:active:not(:disabled) {
          transform: translateY(-1px) scale(0.99);
        }

        .contact-submit-button:disabled {
          cursor: not-allowed;
          opacity: 0.65;
        }

        .contact-button-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          font-size: 11px;
          letter-spacing: 0.015em;
        }

        .contact-button-content svg,
        .contact-secondary-button svg {
          width: 17px;
          height: 17px;
          transition: transform 0.25s ease;
        }

        .contact-submit-button:hover .contact-button-content svg,
        .contact-secondary-button:hover svg {
          transform: translateX(4px);
        }

        .contact-spinner {
          width: 15px;
          height: 15px;
          border: 2px solid rgba(255, 255, 255, 0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: contact-spin 0.7s linear infinite;
        }

        .contact-success {
          display: flex;
          min-height: 550px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          text-align: center;
          animation: contact-success-reveal 0.65s ease both;
        }

        .contact-success-rings {
          position: relative;
          display: grid;
          width: 142px;
          height: 142px;
          margin-bottom: 32px;
          place-items: center;
        }

        .contact-success-rings > span {
          position: absolute;
          border: 1px solid color-mix(
            in srgb,
            var(--contact-primary) 28%,
            transparent
          );
          border-radius: 50%;
          animation: contact-success-ring 2.6s ease-out infinite;
        }

        .contact-success-rings > span:first-child {
          inset: 0;
        }

        .contact-success-rings > span:nth-child(2) {
          inset: 16px;
          animation-delay: 0.45s;
        }

        .contact-success-check {
          position: relative;
          z-index: 2;
          display: grid;
          width: 82px;
          height: 82px;
          place-items: center;
          border-radius: 26px;
          color: var(--on-primary, #ffffff);
          background: var(--contact-primary);
          box-shadow: 0 22px 45px color-mix(
            in srgb,
            var(--contact-primary) 30%,
            transparent
          );
          transform: rotate(-6deg);
        }

        .contact-success-check svg {
          width: 38px;
          height: 38px;
        }

        .contact-success-label {
          margin-bottom: 13px;
          color: var(--contact-primary);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.17em;
          text-transform: uppercase;
        }

        .contact-success h2 {
          max-width: 470px;
          font-size: clamp(2.2rem, 5vw, 3.15rem);
        }

        .contact-success p {
          max-width: 450px;
          margin: 20px 0 28px;
          color: var(--contact-muted);
          font-size: 13px;
          line-height: 1.75;
        }

        .contact-secondary-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 46px;
          padding: 0 18px;
          border: 1px solid var(--contact-border);
          color: var(--contact-text);
          background: var(--contact-input);
          font-size: 10px;
          transition:
            color 0.25s ease,
            border-color 0.25s ease,
            background-color 0.25s ease,
            transform 0.25s ease;
        }

        .contact-secondary-button:hover {
          border-color: var(--contact-primary);
          color: var(--contact-primary);
          background: var(--contact-primary-soft);
          transform: translateY(-2px);
        }

        @keyframes contact-reveal {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes contact-form-reveal {
          from {
            opacity: 0;
            transform: translateY(45px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes contact-method-reveal {
          from {
            opacity: 0;
            transform: translateX(-18px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes contact-pulse {
          70% {
            box-shadow: 0 0 0 9px transparent;
          }
          100% {
            box-shadow: 0 0 0 0 transparent;
          }
        }

        @keyframes contact-orb-one {
          to {
            transform: translate(160px, 130px) scale(1.15);
          }
        }

        @keyframes contact-orb-two {
          to {
            transform: translate(-150px, 160px) scale(0.85);
          }
        }

        @keyframes contact-shake {
          0%,
          100% {
            transform: translateX(0);
          }
          35% {
            transform: translateX(-5px);
          }
          70% {
            transform: translateX(5px);
          }
        }

        @keyframes contact-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes contact-success-reveal {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes contact-success-ring {
          0% {
            opacity: 0.8;
            transform: scale(0.72);
          }
          100% {
            opacity: 0;
            transform: scale(1.28);
          }
        }

        @media (max-width: 930px) {
          .contact-layout {
            grid-template-columns: 1fr;
            width: min(690px, 100%);
          }

          .contact-information {
            padding-top: 0;
          }

          .contact-methods {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .contact-response-card {
            margin-bottom: 8px;
          }
        }

        @media (max-width: 640px) {
          .contact-hero {
            width: min(100% - 30px, 580px);
            padding: 124px 0 70px;
          }

          .contact-hero h1 {
            margin-top: 23px;
            font-size: clamp(3rem, 15vw, 4.7rem);
          }

          .contact-hero > p {
            margin-top: 24px;
            font-size: 14px;
            line-height: 1.72;
          }

          .contact-content {
            padding: 10px 14px 90px;
          }

          .contact-layout {
            gap: 45px;
          }

          .contact-methods {
            grid-template-columns: 1fr;
          }

          .contact-form-card {
            min-height: 0;
            padding: 29px 20px;
            border-radius: 23px;
          }

          .contact-form-heading {
            flex-direction: column;
            margin-bottom: 29px;
          }

          .contact-secure-label {
            align-self: flex-start;
          }

          .contact-field-row {
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .contact-submit-row {
            flex-direction: column-reverse;
            align-items: stretch;
          }

          .contact-submit-row > p {
            max-width: none;
            text-align: center;
          }

          .contact-submit-button {
            width: 100%;
          }

          .contact-success {
            min-height: 500px;
            padding: 5px;
          }
        }

        @media (max-width: 400px) {
          .contact-availability {
            max-width: 100%;
          }

          .contact-response-card {
            grid-template-columns: auto 1fr;
          }

          .contact-response-signal {
            display: none;
          }

          .contact-method {
            padding-right: 10px;
          }

          .contact-method-copy strong {
            font-size: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-page *,
          .contact-page *::before,
          .contact-page *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Contact;
