import React, { useState } from 'react';
import CornerstoneMotif from '../components/CornerstoneMotif';
import TypewriterText from '../components/TypewriterText';
import { CONTACT_BUDGETS, CONTACT_TIMELINES, CONTACT_SERVICES } from '../data/siteContent';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Clock, 
  HelpCircle, 
  ChevronDown, 
  Check, 
  Zap, 
  Globe, 
  Lock 
} from 'lucide-react';

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
  const [openFaq, setOpenFaq] = useState(0); // first FAQ open by default

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

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
              margin: '0 0 1.5rem 0',
              maxWidth: '22ch'
            }}
          >
            HAVE SOMETHING WORTH{' '}
            <TypewriterText words={["BUILDING?", "SCALING?", "AUTOMATING?", "LAUNCHING?"]} />
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

              {/* Advisory Telemetry Status Card */}
              <div
                style={{
                  backgroundColor: 'rgba(20, 20, 20, 0.75)',
                  border: '1px solid var(--color-border-gray)',
                  padding: '1.25rem',
                  marginBottom: '2rem',
                  position: 'relative'
                }}
              >
                <div className="corner-bracket-tl" />
                <div className="corner-bracket-br" />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="lime-dot" style={{ width: '6px', height: '6px' }} />
                    <span className="micro-label" style={{ color: 'var(--color-warm-white)', fontWeight: 600 }}>
                      SYSTEM CAPACITY STATUS
                    </span>
                  </div>
                  <span className="micro-label-lime">Q2 / Q3 ACTIVE</span>
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--color-muted-gray)', margin: '0 0 0.75rem 0', lineHeight: 1.5 }}>
                  Currently accepting 2 select enterprise clients for full-cycle autonomous systems deployment.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.65rem' }}>
                  <Clock size={13} color="#B8FF3D" />
                  <span className="micro-label" style={{ fontSize: '0.66rem', color: 'var(--color-warm-white)' }}>
                    TYPICAL INITIAL TRIAGE: &lt; 4 HOURS
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', borderTop: '1px solid var(--color-border-gray)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail size={16} color="#B8FF3D" />
                  <div>
                    <span className="micro-label" style={{ display: 'block', fontSize: '0.62rem' }}>DIRECT INTAKE EMAIL</span>
                    <a href="mailto:hello@cornerstone.build" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#F4F3EF', textDecoration: 'none' }}>
                      hello@cornerstone.build
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MessageSquare size={16} color="#B8FF3D" />
                  <div>
                    <span className="micro-label" style={{ display: 'block', fontSize: '0.62rem' }}>DIRECT WHATSAPP CHANNEL</span>
                    <a
                      href="https://wa.me/15550000000?text=Hi%20Cornerstone%2C%20I%20would%20like%20to%20discuss%20an%20architecture%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--color-accent-lime)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <span>Connect with Desk on WhatsApp</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <ShieldCheck size={16} color="#B8FF3D" />
                  <div>
                    <span className="micro-label" style={{ display: 'block', fontSize: '0.62rem' }}>CONFIDENTIALITY ASSURANCE</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#F4F3EF' }}>
                      Mutual NDA automatically honored for technical blueprints
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MapPin size={16} color="#B8FF3D" />
                  <div>
                    <span className="micro-label" style={{ display: 'block', fontSize: '0.62rem' }}>STUDIO PRESENCE</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#F4F3EF' }}>
                      Global Engineering • London • New York • Dubai • Singapore
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

      {/* Section 02: What Happens Next / Intake Protocol */}
      <section
        style={{
          paddingTop: 'clamp(4.5rem, 9vw, 7.5rem)',
          paddingBottom: 'clamp(4.5rem, 9vw, 7.5rem)',
          backgroundColor: 'var(--color-near-black)',
          borderBottom: '1px solid var(--color-border-gray)'
        }}
      >
        <div className="site-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(2rem, 4vw, 3.5rem)', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '1rem' }}>
            <span className="micro-label-lime">02 / INTAKE PROTOCOL</span>
            <span className="micro-label">TRANSPARENT ENGAGEMENT LIFECYCLE</span>
          </div>

          <div style={{ maxWidth: '38ch', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <h2 className="display-large" style={{ margin: 0 }}>
              WHAT HAPPENS AFTER YOU TRANSMIT YOUR BRIEF.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem'
            }}
          >
            {/* Step 1 */}
            <div
              className="arch-box"
              style={{
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                backgroundColor: 'var(--color-charcoal)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '260px'
              }}
            >
              <div className="corner-bracket-tl" />
              <div className="corner-bracket-tr" />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
                  <span className="micro-label-lime" style={{ fontSize: '0.85rem' }}>STAGE 01</span>
                  <span className="micro-label" style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '3px 8px' }}>
                    0 — 24 HOURS
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-warm-white)', marginBottom: '0.75rem' }}>
                  Technical Audit &amp; Feasibility
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--color-muted-gray)', margin: 0 }}>
                  A founding systems engineer reviews your submission, audits current integration endpoints (WhatsApp, CRM, telephony), and models latency expectations.
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--color-border-gray)', paddingTop: '0.85rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={14} color="#B8FF3D" />
                <span className="micro-label" style={{ fontSize: '0.65rem' }}>NO GENERIC SALES CALLS</span>
              </div>
            </div>

            {/* Step 2 */}
            <div
              className="arch-box"
              style={{
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                backgroundColor: 'var(--color-charcoal)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '260px'
              }}
            >
              <div className="corner-bracket-tl" />
              <div className="corner-bracket-tr" />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
                  <span className="micro-label-lime" style={{ fontSize: '0.85rem' }}>STAGE 02</span>
                  <span className="micro-label" style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '3px 8px' }}>
                    DAY 2 — 3
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-warm-white)', marginBottom: '0.75rem' }}>
                  Architectural Scope &amp; Blueprint
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--color-muted-gray)', margin: 0 }}>
                  We present a concrete architecture specification document with system node diagrams, fixed deployment milestones, and predictable deliverables.
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--color-border-gray)', paddingTop: '0.85rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={14} color="#B8FF3D" />
                <span className="micro-label" style={{ fontSize: '0.65rem' }}>FIXED SCOPE &amp; TIMELINE</span>
              </div>
            </div>

            {/* Step 3 */}
            <div
              className="arch-box"
              style={{
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                backgroundColor: 'var(--color-charcoal)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '260px'
              }}
            >
              <div className="corner-bracket-tl" />
              <div className="corner-bracket-tr" />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
                  <span className="micro-label-lime" style={{ fontSize: '0.85rem' }}>STAGE 03</span>
                  <span className="micro-label" style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '3px 8px' }}>
                    WEEK 1 ONWARD
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-warm-white)', marginBottom: '0.75rem' }}>
                  Sprint 01 Production Rollout
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--color-muted-gray)', margin: 0 }}>
                  Immediate development sprints with live staging links, dedicated private communication channel, and 30-day post-launch hypercare.
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--color-border-gray)', paddingTop: '0.85rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={14} color="#B8FF3D" />
                <span className="micro-label" style={{ fontSize: '0.65rem' }}>24/7 SLA HYPERCARE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: Frequently Asked Questions Accordion */}
      <section
        style={{
          paddingTop: 'clamp(4.5rem, 9vw, 7.5rem)',
          paddingBottom: 'clamp(4.5rem, 9vw, 7.5rem)',
          backgroundColor: 'var(--color-charcoal)',
          borderBottom: '1px solid var(--color-border-gray)'
        }}
      >
        <div className="site-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(2rem, 4vw, 3.5rem)', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '1rem' }}>
            <span className="micro-label-lime">03 / FREQUENTLY ANSWERED QUESTIONS</span>
            <span className="micro-label">OPERATIONAL TRANSPARENCY</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: 'clamp(2rem, 5vw, 4.5rem)',
              alignItems: 'start'
            }}
          >
            {/* Left Column: Heading & Context */}
            <div>
              <h2 className="display-large" style={{ margin: '0 0 1.25rem 0' }}>
                ARCHITECTURAL CLARITY BEFORE WE BEGIN.
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-muted-gray)', lineHeight: 1.6, marginBottom: '2rem' }}>
                Everything you need to know about working with Cornerstone, from intellectual property ownership to deployment velocity and system security.
              </p>

              <div style={{ backgroundColor: 'rgba(10, 10, 10, 0.65)', border: '1px solid var(--color-border-gray)', padding: '1.25rem', position: 'relative' }}>
                <div className="corner-bracket-tl" />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <HelpCircle size={15} color="#B8FF3D" />
                  <span className="micro-label" style={{ color: 'var(--color-warm-white)' }}>HAVE A SPECIALIZED QUESTION?</span>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-muted-gray)', margin: '0 0 1rem 0' }}>
                  Ask our engineering desk directly for custom compliance or enterprise multi-tenant specifications.
                </p>
                <a
                  href="mailto:hello@cornerstone.build?subject=Custom%20Architecture%20Inquiry"
                  className="btn-cornerstone-secondary"
                  style={{ padding: '0.65rem 1.15rem', fontSize: '0.7rem' }}
                >
                  <span>ASK THE ARCHITECT</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>

            {/* Right Column: Expandable FAQ List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                {
                  q: "How quickly can an AI receptionist or WhatsApp workflow go live?",
                  a: "Standard conversational pipelines, clinical voice triage, and WhatsApp Cloud API agents typically deploy to staging within 7 to 14 business days. Custom enterprise flagships and multi-funnel growth telemetry stacks launch in 3 to 5 weeks with full unit tests."
                },
                {
                  q: "Do you build custom solutions or use off-the-shelf templates?",
                  a: "Every Cornerstone system is built from scratch. We write bespoke codebases on modern React/Vite, train domain-specific AI agents on your proprietary SOPs and knowledge bases, and configure low-latency webhooks directly into your CRM, EHR, or booking engines."
                },
                {
                  q: "Who owns the code, intellectual property, and model prompts?",
                  a: "You own 100% of all intellectual property, source repositories, prompt definitions, and customer databases upon final deployment. We never lock clients into proprietary black boxes or closed platforms."
                },
                {
                  q: "How does Cornerstone handle enterprise compliance & data privacy?",
                  a: "We adhere strictly to HIPAA, GDPR, and enterprise SOC-2 guidelines. Audio streams, patient inquiries, and customer transactions are encrypted in transit and at rest with zero unauthorized model training on your data."
                },
                {
                  q: "What ongoing maintenance and monitoring do you provide after launch?",
                  a: "Every deployment includes 30 days of complimentary hypercare. Following launch, our Retainer Protocol provides 24/7 uptime monitoring, latency tracking, prompt drift calibration, and scheduled system upgrades to ensure zero degradation."
                }
              ].map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    onClick={() => toggleFaq(index)}
                    className="arch-box"
                    style={{
                      backgroundColor: isOpen ? '#141414' : '#0D0D0D',
                      border: '1px solid',
                      borderColor: isOpen ? 'var(--color-accent-lime)' : 'var(--color-border-gray)',
                      padding: '1.25rem 1.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                          fontWeight: 700,
                          color: isOpen ? 'var(--color-accent-lime)' : 'var(--color-warm-white)',
                          transition: 'color 0.2s ease'
                        }}
                      >
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={16}
                        color={isOpen ? 'var(--color-accent-lime)' : 'var(--color-muted-gray)'}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                          flexShrink: 0
                        }}
                      />
                    </div>

                    {isOpen && (
                      <div style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--color-muted-gray)', margin: 0 }}>
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 04: Global Studio Telemetry & Nodes */}
      <section
        style={{
          paddingTop: 'clamp(3.5rem, 7vw, 5.5rem)',
          paddingBottom: 'clamp(3.5rem, 7vw, 5.5rem)',
          backgroundColor: 'var(--color-near-black)'
        }}
      >
        <div className="site-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={15} color="#B8FF3D" />
              <span className="micro-label-lime">GLOBAL STUDIO TOPOLOGY</span>
            </div>
            <span className="micro-label">SYNCHRONIZED TIMEZONES</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: '1px',
              backgroundColor: 'var(--color-border-gray)',
              border: '1px solid var(--color-border-gray)'
            }}
          >
            {[
              { city: "LONDON", tz: "UTC+0", role: "EMEA SYSTEMS DESK", status: "ACTIVE" },
              { city: "NEW YORK", tz: "UTC-5", role: "US ENTERPRISE OPS", status: "ACTIVE" },
              { city: "DUBAI", tz: "UTC+4", role: "MENA INTEGRATION HUB", status: "ACTIVE" },
              { city: "SINGAPORE", tz: "UTC+8", role: "APAC VELOCITY NODE", status: "ACTIVE" }
            ].map((node) => (
              <div
                key={node.city}
                style={{
                  backgroundColor: 'var(--color-charcoal)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-warm-white)' }}>
                    {node.city}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span className="lime-dot" style={{ width: '5px', height: '5px' }} />
                    <span className="micro-label" style={{ fontSize: '0.62rem', color: 'var(--color-accent-lime)' }}>{node.status}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className="micro-label" style={{ color: 'var(--color-muted-gray)', fontSize: '0.68rem' }}>{node.role}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-muted-gray)' }}>{node.tz}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;

