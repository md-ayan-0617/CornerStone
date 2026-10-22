import React, { useState, useEffect } from 'react';
import {
  X,
  Copy,
  Check,
  Mail,
  Phone,
  Globe,
  Building,
  ShieldAlert,
  Trash2,
  RotateCcw,
  Save,
  ExternalLink,
  Send,
  AlertCircle,
  CheckCircle2,
  Clock,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Quote,
  RefreshCw
} from 'lucide-react';
import CornerstoneMotif from '../CornerstoneMotif';

export const InquiryDetailModal = ({
  inquiry,
  isOpen,
  onClose,
  onUpdateStatus,
  onUpdateNotes,
  onToggleSpam,
  onDelete,
  onRestore,
  gmailStatus = {},
  onConnectGmail,
  onReplySuccess
}) => {
  const [copiedField, setCopiedField] = useState(null);
  const [notes, setNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesDirty, setNotesDirty] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Reply Composer State
  const [showReplyComposer, setShowReplyComposer] = useState(false);
  const [replyTo, setReplyTo] = useState('');
  const [replySubject, setReplySubject] = useState('');
  const [replyBody, setReplyBody] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [replyError, setReplyError] = useState(null);
  const [replySuccess, setReplySuccess] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loadingReplies, setLoadingReplies] = useState(false);

  const fetchReplies = async (id) => {
    if (!id) return;
    setLoadingReplies(true);
    try {
      const res = await fetch(`/api/inquiries/${id}/replies`, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success && Array.isArray(data.replies)) {
        setReplies(data.replies);
      }
    } catch {
      // ignore
    } finally {
      setLoadingReplies(false);
    }
  };

  useEffect(() => {
    if (inquiry) {
      setNotes(inquiry.internal_notes || '');
      setNotesDirty(false);
      setConfirmDelete(false);
      setReplyTo(inquiry.email || '');
      setReplySubject(`Re: Project Inquiry [${inquiry.id}] - Cornerstone`);
      const greetingName = inquiry.name?.split(' ')[0] || inquiry.name || 'there';
      setReplyBody(
        `Hi ${greetingName},\n\nThank you for reaching out to Cornerstone regarding your project inquiry.\n\nWe have reviewed your submission and would like to discuss next steps.\n\nBest regards,\nCornerstone Architecture Desk\nhello@cornerstone.build`
      );
      setReplyError(null);
      setReplySuccess(null);
      if (Array.isArray(inquiry.replies)) {
        setReplies(inquiry.replies);
      } else {
        fetchReplies(inquiry.id);
      }
    }
  }, [inquiry]);

  if (!isOpen || !inquiry) return null;

  const handleCopy = (text, field) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    await onUpdateNotes(inquiry.id, notes);
    setIsSavingNotes(false);
    setNotesDirty(false);
  };

  const formattedDate = new Date(inquiry.created_at).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return '#B8FF3D';
      case 'in_progress':
        return '#FFB800';
      case 'replied':
      case 'completed':
        return '#4ADE80';
      default:
        return '#9B9A96';
    }
  };

  const servicesList = Array.isArray(inquiry.services)
    ? inquiry.services
    : typeof inquiry.services === 'string'
    ? inquiry.services.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const insertOriginalScopeQuote = () => {
    const quote = `\n\n--- Original Customer Inquiry (${inquiry.id}) ---\nDate: ${formattedDate}\nFrom: ${inquiry.name} <${inquiry.email}>\nCompany: ${inquiry.company || 'N/A'}\nServices: ${servicesList.join(', ') || 'None specified'}\nScope:\n${inquiry.details || 'No additional details provided'}\n-----------------------------------------------`;
    setReplyBody((prev) => prev + quote);
  };

  const handleSendReply = async (e) => {
    if (e) e.preventDefault();
    setReplyError(null);
    setReplySuccess(null);
    setIsSendingReply(true);

    try {
      const res = await fetch(`/api/inquiries/${inquiry.id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          to: replyTo,
          subject: replySubject,
          message: replyBody
        })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send reply via Gmail API.');
      }

      setReplySuccess(`Reply successfully transmitted to ${replyTo} via authorized Gmail.`);
      // Refresh replies from database
      await fetchReplies(inquiry.id);
      // Notify parent dashboard to update status to 'replied'
      if (onReplySuccess) {
        onReplySuccess(inquiry.id);
      } else if (onUpdateStatus) {
        onUpdateStatus(inquiry.id, 'replied');
      }
    } catch (err) {
      setReplyError(err.message || 'An error occurred while transmitting your reply.');
    } finally {
      setIsSendingReply(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99980,
        backgroundColor: 'rgba(5, 5, 5, 0.88)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 3vw, 2.5rem)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '92vh',
          backgroundColor: '#0C0C0C',
          border: '1px solid var(--color-border-gray)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.85)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'modalSlideUp 0.24s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Modal Top Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--color-border-gray)',
            backgroundColor: '#111111',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CornerstoneMotif size={20} variant="mark" />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: 'var(--color-warm-white)',
                    letterSpacing: '0.05em'
                  }}
                >
                  {inquiry.id}
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '2px 8px',
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: `${getStatusColor(inquiry.status)}15`,
                    color: getStatusColor(inquiry.status),
                    border: `1px solid ${getStatusColor(inquiry.status)}40`,
                    textTransform: 'uppercase'
                  }}
                >
                  <span
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor: getStatusColor(inquiry.status)
                    }}
                  />
                  {inquiry.status.replace('_', ' ')}
                </span>
                {inquiry.is_spam && (
                  <span
                    style={{
                      padding: '2px 8px',
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: 'rgba(255, 85, 85, 0.2)',
                      color: '#FF6B6B',
                      border: '1px solid rgba(255, 85, 85, 0.4)'
                    }}
                  >
                    SPAM
                  </span>
                )}
                {inquiry.is_deleted && (
                  <span
                    style={{
                      padding: '2px 8px',
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: 'rgba(155, 154, 150, 0.2)',
                      color: '#9B9A96',
                      border: '1px solid rgba(155, 154, 150, 0.4)'
                    }}
                  >
                    TRASH
                  </span>
                )}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#9B9A96' }}>
                Received {formattedDate}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setShowReplyComposer(!showReplyComposer)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                backgroundColor: showReplyComposer ? 'var(--color-accent-lime)' : '#181818',
                color: showReplyComposer ? '#0A0A0A' : '#B8FF3D',
                border: '1px solid rgba(184, 255, 61, 0.4)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Mail size={13} />
              <span>{showReplyComposer ? 'CLOSE REPLY COMPOSER' : 'REPLY VIA GMAIL'}</span>
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#9B9A96',
                cursor: 'pointer',
                padding: '6px',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Close inquiry detail"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.75rem' }}>
          {/* Status Quick Switcher Bar */}
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: '#141414',
              border: '1px solid var(--color-border-gray)',
              marginBottom: '1.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <span className="micro-label">WORKFLOW STATUS</span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['new', 'in_progress', 'replied'].map((st) => (
                <button
                  key={st}
                  onClick={() => onUpdateStatus(inquiry.id, st)}
                  style={{
                    padding: '6px 14px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                    backgroundColor: inquiry.status === st ? getStatusColor(st) : 'transparent',
                    color: inquiry.status === st ? '#0A0A0A' : '#9B9A96',
                    border: `1px solid ${inquiry.status === st ? getStatusColor(st) : 'var(--color-border-gray)'}`,
                    fontWeight: inquiry.status === st ? 700 : 500,
                    transition: 'all 0.18s ease'
                  }}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* SECTION: REPLY VIA GMAIL COMPOSER (Prominently rendered when open) */}
          {showReplyComposer && (
            <div
              style={{
                backgroundColor: '#121212',
                border: '1px solid var(--color-accent-lime)',
                padding: '1.5rem',
                marginBottom: '1.75rem',
                position: 'relative',
                animation: 'fadeIn 0.2s ease-out'
              }}
            >
              <div className="corner-bracket-tl" />
              <div className="corner-bracket-br" />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Send size={15} color="#B8FF3D" />
                  <span className="micro-label-lime">COMPOSE GMAIL REPLY</span>
                </div>

                {/* Sender authorization status badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {gmailStatus.connected ? (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        backgroundColor: 'rgba(74, 222, 128, 0.1)',
                        border: '1px solid rgba(74, 222, 128, 0.3)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: '#4ADE80'
                      }}
                    >
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4ADE80' }} />
                      <span>SENDER: {gmailStatus.email}</span>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        backgroundColor: 'rgba(255, 184, 0, 0.1)',
                        border: '1px solid rgba(255, 184, 0, 0.3)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: '#FFB800'
                      }}
                    >
                      <AlertCircle size={12} />
                      <span>GMAIL NOT AUTHORIZED</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Warning if Gmail account is not yet connected */}
              {!gmailStatus.connected && (
                <div
                  style={{
                    padding: '12px 14px',
                    backgroundColor: 'rgba(255, 184, 0, 0.08)',
                    border: '1px solid rgba(255, 184, 0, 0.3)',
                    color: '#FFD666',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}
                >
                  <div>
                    <strong>Action Required:</strong> Authorize your Gmail account to send direct email replies to this client.
                  </div>
                  {onConnectGmail && (
                    <button
                      type="button"
                      onClick={onConnectGmail}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#FFB800',
                        color: '#0A0A0A',
                        border: 'none',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      CONNECT GMAIL ACCOUNT
                    </button>
                  )}
                </div>
              )}

              {/* Success Notification */}
              {replySuccess && (
                <div
                  style={{
                    padding: '12px 14px',
                    backgroundColor: 'rgba(74, 222, 128, 0.1)',
                    border: '1px solid rgba(74, 222, 128, 0.4)',
                    color: '#4ADE80',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>{replySuccess}</span>
                </div>
              )}

              {/* Error Notification */}
              {replyError && (
                <div
                  style={{
                    padding: '12px 14px',
                    backgroundColor: 'rgba(255, 85, 85, 0.1)',
                    border: '1px solid rgba(255, 85, 85, 0.4)',
                    color: '#FF6B6B',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <AlertCircle size={16} />
                  <span>{replyError}</span>
                </div>
              )}

              <form onSubmit={handleSendReply} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label className="micro-label" style={{ display: 'block', marginBottom: '4px' }}>
                      RECIPIENT EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={replyTo}
                      onChange={(e) => setReplyTo(e.target.value)}
                      className="input-cornerstone"
                      style={{ width: '100%', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <label className="micro-label" style={{ display: 'block', marginBottom: '4px' }}>
                      SUBJECT LINE *
                    </label>
                    <input
                      type="text"
                      required
                      value={replySubject}
                      onChange={(e) => setReplySubject(e.target.value)}
                      className="input-cornerstone"
                      style={{ width: '100%', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label className="micro-label">REPLY MESSAGE BODY *</label>
                    <button
                      type="button"
                      onClick={insertOriginalScopeQuote}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-accent-lime)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: 0
                      }}
                      title="Append client's original brief below message"
                    >
                      <Quote size={12} />
                      <span>INSERT ORIGINAL INQUIRY QUOTE</span>
                    </button>
                  </div>
                  <textarea
                    rows={8}
                    required
                    value={replyBody}
                    onChange={(e) => setReplyBody(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: '#0A0A0A',
                      border: '1px solid var(--color-border-gray)',
                      color: '#F4F3EF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      padding: '12px 14px',
                      outline: 'none',
                      resize: 'vertical',
                      lineHeight: 1.6,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', paddingTop: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#777' }}>
                    Sent securely via authorized Google Gmail API • Marked as Replied on success
                  </span>

                  <button
                    type="submit"
                    disabled={isSendingReply || !gmailStatus.connected}
                    className="btn-cornerstone"
                    style={{
                      padding: '10px 20px',
                      fontSize: '0.78rem',
                      opacity: !gmailStatus.connected ? 0.6 : 1
                    }}
                  >
                    <Send size={14} />
                    <span>{isSendingReply ? 'TRANSMITTING VIA GMAIL API...' : 'SEND GMAIL REPLY'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Grid Layout: Contact Info & Scope */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginBottom: '1.75rem'
            }}
          >
            {/* Primary Contact Card */}
            <div
              style={{
                backgroundColor: '#121212',
                border: '1px solid var(--color-border-gray)',
                padding: '1.25rem'
              }}
            >
              <span className="micro-label" style={{ display: 'block', marginBottom: '0.75rem' }}>
                CLIENT CONTACT DATA
              </span>

              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#9B9A96' }}>NAME</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, margin: '2px 0 0 0', color: '#F4F3EF' }}>
                    {inquiry.name}
                  </h4>
                  <button
                    onClick={() => handleCopy(inquiry.name, 'name')}
                    style={{ background: 'none', border: 'none', color: '#9B9A96', cursor: 'pointer', padding: '4px' }}
                    title="Copy Name"
                  >
                    {copiedField === 'name' ? <Check size={14} color="#B8FF3D" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#9B9A96' }}>ORGANIZATION</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F4F3EF', marginTop: '2px' }}>
                  <Building size={14} color="#9B9A96" />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>
                    {inquiry.company || 'Not provided'}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#9B9A96' }}>EMAIL</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                  <a
                    href={`mailto:${inquiry.email}`}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      color: 'var(--color-accent-lime)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Mail size={13} />
                    {inquiry.email}
                  </a>
                  <button
                    onClick={() => handleCopy(inquiry.email, 'email')}
                    style={{ background: 'none', border: 'none', color: '#9B9A96', cursor: 'pointer', padding: '4px' }}
                    title="Copy Email"
                  >
                    {copiedField === 'email' ? <Check size={14} color="#B8FF3D" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {inquiry.phone && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#9B9A96' }}>PHONE</span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                    <a
                      href={`tel:${inquiry.phone}`}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        color: '#F4F3EF',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Phone size={13} color="#9B9A96" />
                      {inquiry.phone}
                    </a>
                    <button
                      onClick={() => handleCopy(inquiry.phone, 'phone')}
                      style={{ background: 'none', border: 'none', color: '#9B9A96', cursor: 'pointer', padding: '4px' }}
                      title="Copy Phone"
                    >
                      {copiedField === 'phone' ? <Check size={14} color="#B8FF3D" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              )}

              {inquiry.website && inquiry.website !== 'N/A' && (
                <div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#9B9A96' }}>WEBSITE / DOMAIN</span>
                  <div style={{ marginTop: '2px' }}>
                    <a
                      href={inquiry.website.startsWith('http') ? inquiry.website : `https://${inquiry.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        color: 'var(--color-warm-white)',
                        textDecoration: 'underline',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Globe size={13} color="#9B9A96" />
                      {inquiry.website}
                      <ExternalLink size={11} color="#B8FF3D" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Scope & Commercials Card */}
            <div
              style={{
                backgroundColor: '#121212',
                border: '1px solid var(--color-border-gray)',
                padding: '1.25rem'
              }}
            >
              <span className="micro-label" style={{ display: 'block', marginBottom: '0.75rem' }}>
                COMMERCIAL SPECIFICATIONS
              </span>

              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#9B9A96' }}>PROJECT BUDGET</span>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: '#B8FF3D', margin: '2px 0 0 0', fontWeight: 600 }}>
                  {inquiry.budget || 'Unspecified'}
                </p>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#9B9A96' }}>TIMELINE HORIZON</span>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#F4F3EF', margin: '2px 0 0 0' }}>
                  {inquiry.timeline || 'Immediate'}
                </p>
              </div>

              <div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#9B9A96', display: 'block', marginBottom: '6px' }}>
                  REQUESTED ARCHITECTURAL CAPABILITIES
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {servicesList.length > 0 ? (
                    servicesList.map((srv, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '4px 10px',
                          backgroundColor: '#1E1E1E',
                          border: '1px solid rgba(255,255,255,0.08)',
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          color: '#E0DFDA'
                        }}
                      >
                        {srv}
                      </span>
                    ))
                  ) : (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#9B9A96' }}>
                      None explicitly selected
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Full Inquiry Details Section */}
          <div
            style={{
              backgroundColor: '#121212',
              border: '1px solid var(--color-border-gray)',
              padding: '1.25rem',
              marginBottom: '1.75rem'
            }}
          >
            <span className="micro-label" style={{ display: 'block', marginBottom: '0.75rem' }}>
              PROJECT SCOPE &amp; SUBMITTED SPECIFICATION
            </span>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                lineHeight: 1.65,
                color: '#E0DFDA',
                whiteSpace: 'pre-wrap',
                backgroundColor: '#0A0A0A',
                border: '1px solid rgba(255,255,255,0.05)',
                padding: '1rem',
                minHeight: '80px'
              }}
            >
              {inquiry.details || <span style={{ color: '#666', fontStyle: 'italic' }}>No additional details provided in the submission.</span>}
            </div>
          </div>

          {/* SECTION: REPLY HISTORY */}
          <div
            style={{
              backgroundColor: '#121212',
              border: '1px solid var(--color-border-gray)',
              padding: '1.25rem',
              marginBottom: '1.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CornerstoneMotif size={14} variant="bracket" />
                <span className="micro-label">GMAIL REPLY HISTORY ({replies.length})</span>
              </div>
              <button
                type="button"
                onClick={() => fetchReplies(inquiry.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9B9A96',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem'
                }}
                title="Refresh reply history"
              >
                <RefreshCw size={11} className={loadingReplies ? 'spin-icon' : ''} />
                <span>SYNC</span>
              </button>
            </div>

            {replies.length === 0 ? (
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#0A0A0A',
                  border: '1px solid rgba(255,255,255,0.04)',
                  textAlign: 'center',
                  color: '#777',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem'
                }}
              >
                No Gmail replies recorded yet for this inquiry. Click "REPLY VIA GMAIL" to send the first response.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {replies.map((rep) => {
                  const isSent = rep.status === 'sent';
                  return (
                    <div
                      key={rep.id}
                      style={{
                        backgroundColor: '#0A0A0A',
                        border: `1px solid ${isSent ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255, 85, 85, 0.3)'}`,
                        padding: '12px 14px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', flexWrap: 'wrap', gap: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '2px 6px',
                              fontSize: '0.65rem',
                              fontFamily: 'var(--font-mono)',
                              fontWeight: 700,
                              backgroundColor: isSent ? 'rgba(74, 222, 128, 0.15)' : 'rgba(255, 85, 85, 0.15)',
                              color: isSent ? '#4ADE80' : '#FF6B6B',
                              border: `1px solid ${isSent ? 'rgba(74, 222, 128, 0.3)' : 'rgba(255, 85, 85, 0.3)'}`
                            }}
                          >
                            {isSent ? 'SENT VIA GMAIL' : 'SEND FAILED'}
                          </span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#F4F3EF', fontWeight: 600 }}>
                            {rep.subject}
                          </span>
                        </div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#777' }}>
                          {new Date(rep.created_at).toLocaleString()}
                        </span>
                      </div>

                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#9B9A96', marginBottom: '8px' }}>
                        <span>From: {rep.sender_email}</span> &bull; <span>To: {rep.recipient_email}</span>
                      </div>

                      {rep.error_message && (
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#FF6B6B', marginBottom: '6px' }}>
                          Error: {rep.error_message}
                        </div>
                      )}

                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          color: '#C0BFBA',
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                          backgroundColor: '#121212',
                          padding: '10px',
                          border: '1px solid rgba(255,255,255,0.04)'
                        }}
                      >
                        {rep.message_body}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Private Internal Notes Section */}
          <div
            style={{
              backgroundColor: '#121212',
              border: '1px solid rgba(184, 255, 61, 0.2)',
              padding: '1.25rem',
              marginBottom: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CornerstoneMotif size={14} variant="bracket" />
                <span className="micro-label-lime">CONFIDENTIAL INTERNAL NOTES</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#9B9A96' }}>
                Never visible to client
              </span>
            </div>

            <textarea
              rows={4}
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setNotesDirty(true);
              }}
              placeholder="Record private internal notes, call logs, qualification criteria, or action items..."
              style={{
                width: '100%',
                backgroundColor: '#0A0A0A',
                border: '1px solid var(--color-border-gray)',
                color: '#F4F3EF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                padding: '10px 14px',
                outline: 'none',
                resize: 'vertical',
                lineHeight: 1.5,
                boxSizing: 'border-box'
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button
                onClick={handleSaveNotes}
                disabled={isSavingNotes || !notesDirty}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  backgroundColor: notesDirty ? 'var(--color-accent-lime)' : '#222',
                  color: notesDirty ? '#0A0A0A' : '#777',
                  border: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: notesDirty ? 'pointer' : 'default',
                  transition: 'all 0.2s ease'
                }}
              >
                <Save size={13} />
                <span>{isSavingNotes ? 'SAVING...' : notesDirty ? 'SAVE NOTES' : 'NOTES SAVED'}</span>
              </button>
            </div>
          </div>

          {/* Technical Metadata Bar */}
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: '#080808',
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: '#777'
            }}
          >
            <span>IP: {inquiry.ip_address || '127.0.0.1'}</span>
            <span>SYSTEM ID: {inquiry.id}</span>
            <span>UPDATED: {new Date(inquiry.updated_at).toLocaleString()}</span>
          </div>
        </div>

        {/* Modal Bottom Action Footer */}
        <div
          style={{
            padding: '1rem 1.75rem',
            borderTop: '1px solid var(--color-border-gray)',
            backgroundColor: '#111111',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                const summary = `Inquiry ${inquiry.id}\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nPhone: ${inquiry.phone || 'N/A'}\nCompany: ${inquiry.company || 'N/A'}\nBudget: ${inquiry.budget}\nTimeline: ${inquiry.timeline}\nServices: ${inquiry.services}\nScope: ${inquiry.details}`;
                handleCopy(summary, 'all');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                backgroundColor: 'transparent',
                border: '1px solid var(--color-border-gray)',
                color: '#E0DFDA',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              {copiedField === 'all' ? <Check size={13} color="#B8FF3D" /> : <Copy size={13} />}
              <span>{copiedField === 'all' ? 'SUMMARY COPIED' : 'COPY SUMMARY'}</span>
            </button>

            <button
              onClick={() => onToggleSpam(inquiry.id, !inquiry.is_spam)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                backgroundColor: inquiry.is_spam ? 'rgba(255, 85, 85, 0.15)' : 'transparent',
                border: `1px solid ${inquiry.is_spam ? '#FF5555' : 'var(--color-border-gray)'}`,
                color: inquiry.is_spam ? '#FF6B6B' : '#9B9A96',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              <ShieldAlert size={13} />
              <span>{inquiry.is_spam ? 'UNMARK SPAM' : 'MARK SPAM'}</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {inquiry.is_deleted ? (
              <>
                <button
                  onClick={() => onRestore(inquiry.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--color-accent-lime)',
                    color: 'var(--color-accent-lime)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  <RotateCcw size={13} />
                  <span>RESTORE INQUIRY</span>
                </button>
                <button
                  onClick={() => {
                    if (confirmDelete) {
                      onDelete(inquiry.id, true);
                    } else {
                      setConfirmDelete(true);
                    }
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    backgroundColor: confirmDelete ? '#FF4444' : 'transparent',
                    border: '1px solid #FF4444',
                    color: confirmDelete ? '#FFF' : '#FF6B6B',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    fontWeight: confirmDelete ? 700 : 500
                  }}
                >
                  <Trash2 size={13} />
                  <span>{confirmDelete ? 'CONFIRM PERMANENT PURGE' : 'PERMANENT DELETE'}</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => onDelete(inquiry.id, false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--color-border-gray)',
                  color: '#FF6B6B',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={13} />
                <span>MOVE TO TRASH</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default InquiryDetailModal;
