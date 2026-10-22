import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import CornerstoneMotif from '../CornerstoneMotif';

export const ChangePasswordModal = ({ isOpen, onClose, onPasswordChanged }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update password.');
      }

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      onPasswordChanged();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99990,
        backgroundColor: 'rgba(5, 5, 5, 0.82)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#0E0E0E',
          border: '1px solid var(--color-border-gray)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
          position: 'relative',
          padding: '2rem',
          animation: 'modalFadeIn 0.22s ease-out'
        }}
      >
        {/* Top Decorative Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CornerstoneMotif size={18} variant="bracket" />
            <span className="micro-label-lime">ADMIN SECURITY PROTOCOL</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#9B9A96',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '4px'
            }}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.35rem',
            fontWeight: 800,
            color: 'var(--color-warm-white)',
            marginBottom: '0.5rem'
          }}
        >
          UPDATE PASSWORD
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#9B9A96', marginBottom: '1.5rem' }}>
          Current password verification is required before establishing new access credentials.
        </p>

        {error && (
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: 'rgba(255, 85, 85, 0.1)',
              border: '1px solid rgba(255, 85, 85, 0.4)',
              color: '#FF6B6B',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              marginBottom: '1.25rem'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label className="micro-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
              CURRENT PASSWORD *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showCurrent ? 'text' : 'password'}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="input-cornerstone"
                style={{ width: '100%', paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#9B9A96',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="micro-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
              NEW PASSWORD (MIN. 8 CHARS) *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showNew ? 'text' : 'password'}
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new strong password"
                className="input-cornerstone"
                style={{ width: '100%', paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#9B9A96',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="micro-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
              CONFIRM NEW PASSWORD *
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="input-cornerstone"
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '0.75rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: 'transparent',
                border: '1px solid var(--color-border-gray)',
                color: '#9B9A96',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                letterSpacing: '0.05em'
              }}
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-cornerstone"
              style={{ flex: 1, padding: '12px', justifyContent: 'center' }}
            >
              <span>{loading ? 'COMMITTING...' : 'UPDATE PASSWORD'}</span>
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ChangePasswordModal;
