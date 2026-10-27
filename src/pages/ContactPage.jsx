import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CornerstoneMotif from '../components/CornerstoneMotif';
import TypewriterText from '../components/TypewriterText';
import { CONTACT_BUDGETS, CONTACT_SERVICES } from '../data/siteContent';
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
  const pageRef = useRef(null);
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
  const [submitError, setSubmitError] = useState(null);
  const [inquiryId, setInquiryId] = useState(null);
  const [honeypot, setHoneypot] = useState('');
  const [openFaq, setOpenFaq] = useState(0); // first FAQ open by default

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Reveal
      gsap.fromTo('.contact-hero-elem',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        }
      );

      // 2. Intake Form Columns Reveal
      gsap.fromTo('.contact-anim-col',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 3. Intake Protocol Steps Stagger
      gsap.fromTo('.contact-protocol-step',
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-protocol-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 4. FAQ items stagger
      gsap.fromTo('.contact-faq-item',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-faq-list',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      name: formData.name,
      company: formData.company || 'N/A',
      email: formData.email,
      phone: formData.phone || '',
      website: formData.website || '',
      budget: formData.budget || 'Not specified',
      timeline: 'Flexible',
      services: formData.services.length > 0 ? formData.services : 'General Inquiry',
      details: formData.details,
      hp_company_field: honeypot
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Server could not process your inquiry. Please try again.');
      }

      setInquiryId(data.inquiryId);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error submitting inquiry to database:', err);
      setSubmitError(err.message || 'An error occurred while submitting. Please reach out directly or try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={pageRef} style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      
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
          <div className="contact-hero-elem" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
            <CornerstoneMotif size={16} variant="bracket" />
            <span className="micro-label-lime">PROJECT INQUIRY &amp; ARCHITECTURAL INTAKE</span>
          </div>

          <h1
            className="display-mega contact-hero-elem"
            style={{
              margin: '0 0 1.5rem 0',
              maxWidth: '22ch'
            }}
          >
            HAVE SOMETHING WORTH{' '}
            <TypewriterText words={["BUILDING?", "SCALING?", "AUTOMATING?", "LAUNCHING?"]} />
          </h1>

          <div className="contact-hero-elem" style={{ borderTop: '1px solid var(--color-border-gray)', paddingTop: '1.75rem', maxWidth: '48ch' }}>
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
            className="contact-form-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)'
            }}
          >
            
            {/* Left: Contact Information & Expectations */}
            <div className="contact-anim-col">
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
                  Discuss your project directly.
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
                  Every submission is reviewed carefully to evaluate your project requirements and determine the most effective approach. We assess scope and feasibility before scheduling an introductory conversation.
                </p>
              </div>

              {/* Project Intake Status Card */}
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
                      INQUIRY STATUS
                    </span>
                  </div>
                  <span className="micro-label-lime">OPEN FOR INQUIRIES</span>
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--color-muted-gray)', margin: '0 0 0.75rem 0', lineHeight: 1.5 }}>
                  Currently accepting new client projects across AI automation, business websites, and creative production.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.65rem' }}>
                  <Clock size={13} color="#B8FF3D" />
                  <span className="micro-label" style={{ fontSize: '0.66rem', color: 'var(--color-warm-white)' }}>
                    TYPICAL INITIAL REVIEW: 1–2 BUSINESS DAYS
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
                    <span className="micro-label" style={{ display: 'block', fontSize: '0.62rem' }}>DIRECT MESSAGING</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--color-muted-gray)' }}>
                      Direct messaging channel provided upon inquiry confirmation
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <ShieldCheck size={16} color="#B8FF3D" />
                  <div>
                    <span className="micro-label" style={{ display: 'block', fontSize: '0.62rem' }}>CONFIDENTIALITY ASSURANCE</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#F4F3EF' }}>
                      Project details treated confidentially • Mutual NDAs available upon request
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MapPin size={16} color="#B8FF3D" />
                  <div>
                    <span className="micro-label" style={{ display: 'block', fontSize: '0.62rem' }}>STUDIO PRESENCE</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#F4F3EF' }}>
                      Remote Studio • Serving clients globally
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Architectural Intake Form */}
            <div className="contact-anim-col">
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
                    <span className="micro-label-lime">INTAKE PERSISTED • REF #{inquiryId || 'CRN-2026-ACTIVE'}</span>
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
                      marginBottom: '1.25rem'
                    }}
                  >
                    Your project inquiry for <strong>{formData.company || 'your organization'}</strong> has been received under reference <strong>{inquiryId}</strong>. We will review your scope and follow up promptly to discuss next steps.
                  </p>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 14px',
                      backgroundColor: 'rgba(184, 255, 61, 0.08)',
                      border: '1px solid rgba(184, 255, 61, 0.25)',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <ShieldCheck size={14} color="#B8FF3D" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#B8FF3D' }}>
                      INQUIRY ID: {inquiryId} • STATUS: NEW / QUEUED
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setInquiryId(null);
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        website: '',
                        details: '',
                        budget: '',
                        timeline: 'Flexible',
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
                  {/* Anti-spam honeypot field - invisible to real humans */}
                  <div style={{ display: 'none', position: 'absolute', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
                    <input
                      type="text"
                      name="hp_company_field"
                      tabIndex="-1"
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="corner-bracket-tl" />
                  <div className="corner-bracket-br" />

                  {/* Identification Fields: Name & Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label className="micro-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                        YOUR NAME <span style={{ color: 'var(--color-accent-lime)' }}>*</span>
                      </label>
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
                      <label className="micro-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                        BUSINESS EMAIL <span style={{ color: 'var(--color-accent-lime)' }}>*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marcus@company.com"
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

                  {/* Company / Organization (Optional) */}
                  <div>
                    <label className="micro-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                      COMPANY / ORGANIZATION <span style={{ color: 'var(--color-muted-gray)', fontSize: '0.62rem' }}>(OPTIONAL)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Vance Studio / Clinic / Brand"
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

                  {/* Project Type Multi-select */}
                  <div>
                    <label className="micro-label" style={{ display: 'block', marginBottom: '0.75rem' }}>
                      WHAT ARE YOU LOOKING TO BUILD? <span style={{ color: 'var(--color-muted-gray)', fontSize: '0.62rem' }}>(OPTIONAL)</span>
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

                  {/* Project Details / Brief */}
                  <div>
                    <label className="micro-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                      PROJECT BRIEF / SCOPE <span style={{ color: 'var(--color-accent-lime)' }}>*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Briefly describe what you're looking to build, solve, or launch..."
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

                  {/* Optional Budget Range */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <label className="micro-label" style={{ margin: 0 }}>
                        ESTIMATED BUDGET RANGE <span style={{ color: 'var(--color-muted-gray)', fontSize: '0.62rem' }}>(OPTIONAL)</span>
                      </label>
                      {formData.budget && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: '' })}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-muted-gray)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.62rem',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                          }}
                        >
                          Clear selection
                        </button>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {CONTACT_BUDGETS.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, budget: formData.budget === b ? '' : b })}
                          style={{
                            padding: '8px 12px',
                            backgroundColor: formData.budget === b ? '#FFF' : '#141414',
                            color: formData.budget === b ? '#0A0A0A' : '#9B9A96',
                            border: '1px solid',
                            borderColor: formData.budget === b ? '#FFF' : 'var(--color-border-gray)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {submitError && (
                    <div
                      style={{
                        padding: '0.85rem 1rem',
                        backgroundColor: 'rgba(255, 77, 77, 0.1)',
                        border: '1px solid #FF4D4D',
                        color: '#FF6B6B',
                        fontSize: '0.82rem',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {submitError}
                    </div>
                  )}

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
                    DIRECT PROJECT REVIEW • CONFIDENTIAL EVALUATION
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
            className="contact-protocol-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem'
            }}
          >
            {/* Step 1 */}
            <div
              className="arch-box contact-protocol-step"
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
                    REVIEW
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-warm-white)', marginBottom: '0.75rem' }}>
                  Inquiry Review &amp; Assessment
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--color-muted-gray)', margin: 0 }}>
                  We review your brief, assess technical feasibility and requirements, and determine how our capabilities match your goals.
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--color-border-gray)', paddingTop: '0.85rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={14} color="#B8FF3D" />
                <span className="micro-label" style={{ fontSize: '0.65rem' }}>THOROUGH EVALUATION</span>
              </div>
            </div>

            {/* Step 2 */}
            <div
              className="arch-box contact-protocol-step"
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
                    ALIGNMENT
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-warm-white)', marginBottom: '0.75rem' }}>
                  Discovery &amp; Scope Alignment
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--color-muted-gray)', margin: 0 }}>
                  We schedule an initial discussion to clarify project requirements, agree on deliverables, and outline estimated timelines and milestones.
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--color-border-gray)', paddingTop: '0.85rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={14} color="#B8FF3D" />
                <span className="micro-label" style={{ fontSize: '0.65rem' }}>CLEAR SCOPE &amp; EXPECTATIONS</span>
              </div>
            </div>

            {/* Step 3 */}
            <div
              className="arch-box contact-protocol-step"
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
                    EXECUTION
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-warm-white)', marginBottom: '0.75rem' }}>
                  Implementation &amp; Delivery
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--color-muted-gray)', margin: 0 }}>
                  We begin execution with staging links, regular progress updates, direct communication, and thorough testing prior to launch.
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--color-border-gray)', paddingTop: '0.85rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={14} color="#B8FF3D" />
                <span className="micro-label" style={{ fontSize: '0.65rem' }}>STRUCTURED PROGRESS UPDATES</span>
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
            <div className="contact-faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                {
                  q: "How quickly can an AI receptionist or WhatsApp automation system go live?",
                  a: "Standard AI receptionist voice assistants and WhatsApp automation workflows typically deploy to staging within 7 to 14 business days. We configure your incoming call handling, FAQ responses, enquiry capture, and appointment booking flows directly into your calendar and CRM."
                },
                {
                  q: "What is included with Business Websites and Landing Pages?",
                  a: "Every business website and landing page is custom engineered for maximum performance, with modern typography, mobile responsiveness, and integrated enquiry forms and appointment booking calendars. We build from scratch for sub-second load times and high conversion."
                },
                {
                  q: "How does Creative Production (AI photography, UGC video ads & ad creative) work?",
                  a: "We produce commercial-grade AI product & model photography (jewellery, fashion, beauty, and product visuals), scripted vertical 9:16 UGC-style video ads with natural AI spokespersons, and coordinated multi-placement static ad designs and carousels ready for digital ad campaigns."
                },
                {
                  q: "Which businesses do you typically work with?",
                  a: "Our AI automation serves salons, clinics, restaurants, real estate, and service businesses. Our websites support new businesses and companies with outdated websites. Our creative production is calibrated for jewellery, fashion, beauty and ecommerce brands running digital ads."
                },
                {
                  q: "Who owns the code, assets, model shoots, and model prompts?",
                  a: "You own 100% of all intellectual property, source repositories, generated photography and video assets, prompt definitions, and customer databases upon deployment. We never lock clients into closed proprietary systems."
                }
              ].map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    onClick={() => toggleFaq(index)}
                    className="arch-box contact-faq-item"
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

      {/* Section 04: Global Client Collaboration */}
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
              <span className="micro-label-lime">GLOBAL CLIENT COLLABORATION</span>
            </div>
            <span className="micro-label">REMOTE-FIRST STUDIO</span>
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
              { region: "AMERICAS", tz: "UTC-5 / UTC-8", role: "CLIENT COLLABORATION", status: "REMOTE" },
              { region: "UK & EUROPE", tz: "UTC+0 / UTC+1", role: "DESIGN & DEVELOPMENT", status: "REMOTE" },
              { region: "MIDDLE EAST & ASIA", tz: "UTC+4 / UTC+5:30", role: "SYSTEMS ENGINEERING", status: "REMOTE" },
              { region: "ASIA-PACIFIC", tz: "UTC+8", role: "PRODUCTION & REVIEW", status: "REMOTE" }
            ].map((node) => (
              <div
                key={node.region}
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
                    {node.region}
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

