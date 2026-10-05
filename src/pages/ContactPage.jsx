import React, { useState } from 'react';
import CornerstoneMotif from '../components/CornerstoneMotif';
import { CONTACT_BUDGETS, CONTACT_TIMELINES, CONTACT_SERVICES } from '../data/siteContent';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Mail, MapPin } from 'lucide-react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    details: '',
    budget: CONTACT_BUDGETS[1],
    timeline: CONTACT_TIMELINES[0],
    services: []
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleService = (srv) => {
    setFormData(prev => {
      const exists = prev.services.includes(srv);
      return {
        ...prev,
        services: exists ? prev.services.filter(s => s !== srv) : [...prev.services, srv]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
  };

  return (
    <div style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      
      {/* Contact Header */}
      <section
        style={{
          paddingTop: 'clamp(7rem, 15vh, 10rem)',
          paddingBottom: 'clamp(4rem, 8vh, 6rem)',
          backgroundColor: 'var(--color-near-black)',
          borderBottom: '1px solid var(--color-border-gray)'
        }}
      >
        <div className="site-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
            <CornerstoneMotif size={16} variant="bracket" />
            <span className="micro-label-lime">PROJECT INQUIRY &amp; ARCHITECTURAL INTAKE</span>
          </div>

          <h1
            className="display-mega"
            style={{
              color: 'var(--color-warm-white)',
              margin: '0 0 1.5rem 0',
              maxWidth: '14ch'
            }}
          >
            HAVE SOMETHING<br />
            WORTH BUILDING?
          </h1>

          <div style={{ borderTop: '1px solid var(--color-border-gray)', paddingTop: '1.75rem', maxWidth: '48ch' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
                lineHeight: 1.5,
                color: 'var(--color-warm-white)',
                margin: 0
              }}
            >
              Tell us what you're trying to build. We'll figure out what's possible.
            </p>
          </div>
        </div>
      </section>

      {/* Main Intake Form Section */}
      <section
        style={{
          paddingTop: 'clamp(4rem, 8vw, 7rem)',
          paddingBottom: 'clamp(5rem, 10vw, 8rem)',
          backgroundColor: 'var(--color-charcoal)'
        }}
      >
        <div className="site-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)'
            }}
          >
            
            {/* Left: Contact Information & Expectations */}
            <div>
              <div style={{ marginBottom: '2.5rem' }}>
                <span className="micro-label" style={{ display: 'block', marginBottom: '1rem' }}>
                  DIRECT ADVISORY CHANNEL
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                    fontWeight: 800,
                    color: 'var(--color-warm-white)',
                    marginBottom: '1rem'
                  }}
                >
                  Direct access to system architects.
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    color: 'var(--color-muted-gray)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem'
                  }}
                >
                  Every submission is reviewed directly by our founding partners and systems engineers. We review project scope, assess technical feasibility, and prepare an initial architecture outline before our first meeting.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', borderTop: '1px solid var(--color-border-gray)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail size={16} color="#B8FF3D" />
                  <div>
                    <span className="micro-label" style={{ display: 'block', fontSize: '0.62rem' }}>EMAIL PROTOCOL</span>
                    <a href="mailto:hello@cornerstone.build" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#F4F3EF', textDecoration: 'none' }}>
                      hello@cornerstone.build
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <ShieldCheck size={16} color="#B8FF3D" />
                  <div>
                    <span className="micro-label" style={{ display: 'block', fontSize: '0.62rem' }}>CONFIDENTIALITY</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#F4F3EF' }}>
                      Mutual NDA automatically honored for technical blueprints
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MapPin size={16} color="#B8FF3D" />
                  <div>
                    <span className="micro-label" style={{ display: 'block', fontSize: '0.62rem' }}>STUDIO PRESENCE</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#F4F3EF' }}>
                      Global Distributed Engineering / Remote Architecture
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Architectural Intake Form */}
            <div>
              {submitted ? (
                <div
                  style={{
                    backgroundColor: 'var(--color-near-black)',
                    border: '1px solid var(--color-accent-lime)',
                    padding: 'clamp(2rem, 4vw, 3.5rem)',
                    position: 'relative'
                  }}
                >
                  <div className="corner-bracket-tl" />
                  <div className="corner-bracket-br" />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                    <CheckCircle2 size={24} color="#B8FF3D" />
                    <span className="micro-label-lime">INTAKE CONFIRMED • REF #CRN-2026-98</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                      fontWeight: 800,
                      color: 'var(--color-warm-white)',
                      marginBottom: '1rem'
                    }}
                  >
                    Thank you, {formData.name || 'Partner'}.
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      color: 'var(--color-muted-gray)',
                      marginBottom: '1.5rem'
                    }}
                  >
                    Your project inquiry for <strong>{formData.company || 'your organization'}</strong> has been received by our systems desk. We will review your scope against current deployment capacity and reply within 24 hours.
                  </p>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        website: '',
                        details: '',
                        budget: CONTACT_BUDGETS[1],
                        timeline: CONTACT_TIMELINES[0],
                        services: []
                      });
                    }}
                    className="btn-cornerstone"
                  >
                    <span>SUBMIT ANOTHER INQUIRY</span>
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    backgroundColor: 'var(--color-near-black)',
                    border: '1px solid var(--color-border-gray)',
                    padding: 'clamp(1.75rem, 3.5vw, 3rem)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.75rem'
                  }}
                >
                  <div className="corner-bracket-tl" />
                  <div className="corner-bracket-br" />

                  {/* Identification Fields */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label className="micro-label" style={{ display: 'block', marginBottom: '0.5rem' }}>YOUR NAME *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Marcus Vance"
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          backgroundColor: '#141414',
                          border: '1px solid var(--color-border-gray)',
                          color: '#F4F3EF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label className="micro-label" style={{ display: 'block', marginBottom: '0.5rem' }}>COMPANY / ORGANIZATION *</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Vance Capital / Clinic"
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          backgroundColor: '#141414',
                          border: '1px solid var(--color-border-gray)',
                          color: '#F4F3EF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label className="micro-label" style={{ display: 'block', marginBottom: '0.5rem' }}>BUSINESS EMAIL *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marcus@vance.com"
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          backgroundColor: '#141414',
                          border: '1px solid var(--color-border-gray)',
                          color: '#F4F3EF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label className="micro-label" style={{ display: 'block', marginBottom: '0.5rem' }}>PHONE / WHATSAPP</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          backgroundColor: '#141414',
                          border: '1px solid var(--color-border-gray)',
                          color: '#F4F3EF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="micro-label" style={{ display: 'block', marginBottom: '0.5rem' }}>CURRENT WEBSITE (IF APPLICABLE)</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://yourcompany.com"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        backgroundColor: '#141414',
                        border: '1px solid var(--color-border-gray)',
                        color: '#F4F3EF',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Multi-select Services */}
                  <div>
                    <label className="micro-label" style={{ display: 'block', marginBottom: '0.75rem' }}>
                      WHAT ARE YOU LOOKING TO BUILD? (SELECT ALL THAT APPLY)
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {CONTACT_SERVICES.map((srv) => {
                        const selected = formData.services.includes(srv);
                        return (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => toggleService(srv)}
                            style={{
                              padding: '8px 12px',
                              backgroundColor: selected ? 'var(--color-accent-lime)' : '#141414',
                              color: selected ? '#0A0A0A' : '#9B9A96',
                              border: '1px solid',
                              borderColor: selected ? 'var(--color-accent-lime)' : 'var(--color-border-gray)',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'all 0.18s ease'
                            }}
                          >
                            {selected ? `✓ ${srv}` : `+ ${srv}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label className="micro-label" style={{ display: 'block', marginBottom: '0.75rem' }}>
                      ESTIMATED BUDGET RANGE
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {CONTACT_BUDGETS.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, budget: b })}
                          style={{
                            padding: '8px 12px',
                            backgroundColor: formData.budget === b ? '#FFF' : '#141414',
                            color: formData.budget === b ? '#0A0A0A' : '#9B9A96',
                            border: '1px solid',
                            borderColor: formData.budget === b ? '#FFF' : 'var(--color-border-gray)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline Selector */}
                  <div>
                    <label className="micro-label" style={{ display: 'block', marginBottom: '0.75rem' }}>
                      DEPLOYMENT TIMELINE
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {CONTACT_TIMELINES.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setFormData({ ...formData, timeline: t })}
                          style={{
                            padding: '8px 12px',
                            backgroundColor: formData.timeline === t ? '#FFF' : '#141414',
                            color: formData.timeline === t ? '#0A0A0A' : '#9B9A96',
                            border: '1px solid',
                            borderColor: formData.timeline === t ? '#FFF' : 'var(--color-border-gray)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="micro-label" style={{ display: 'block', marginBottom: '0.5rem' }}>PROJECT SCOPE / OBJECTIVES</label>
                    <textarea
                      rows={4}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Outline current bottlenecks, desired patient/customer response flows, or branding goals..."
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        backgroundColor: '#141414',
                        border: '1px solid var(--color-border-gray)',
                        color: '#F4F3EF',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Primary Form CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-cornerstone"
                    style={{
                      width: '100%',
                      padding: '1.25rem',
                      fontSize: '0.85rem',
                      justifyContent: 'center'
                    }}
                  >
                    <span>{isSubmitting ? 'TRANSMITTING BRIEF...' : 'START THE CONVERSATION'}</span>
                    <ArrowUpRight size={16} />
                  </button>

                  <span className="micro-label" style={{ textAlign: 'center', fontSize: '0.62rem' }}>
                    DIRECT ARCHITECTURAL REVIEW • STRICT CONFIDENTIALITY GUARANTEED
                  </span>

                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
