import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import CornerstoneMotif from '../CornerstoneMotif';

export const AdminLogin = ({ onLoginSuccess, onNavigateHome }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid administrator credentials.');
      }

      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: 'var(--color-near-black)',
        color: 'var(--color-warm-white)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Architectural Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none'
        }}
      />

      {/* Decorative Radial Lime Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184, 255, 61, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Login Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#0F0F0F',
          border: '1px solid var(--color-border-gray)',
          boxShadow: '0 32px 80px rgba(0, 0, 0, 0.9)',
          position: 'relative',
          padding: 'clamp(2rem, 5vw, 3rem)',
          zIndex: 1,
          animation: 'adminLoginFade 0.4s ease-out'
        }}
      >
        {/* Architectural Corner Brackets */}
        <div className="corner-bracket-tl" />
        <div className="corner-bracket-br" />

        {/* Brand Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
            <CornerstoneMotif size={24} variant="mark" />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: 'var(--color-warm-white)'
              }}
            >
              CORNERSTONE
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                backgroundColor: 'rgba(184, 255, 61, 0.1)',
                color: '#B8FF3D',
                padding: '2px 6px',
                border: '1px solid rgba(184, 255, 61, 0.25)',
                letterSpacing: '0.08em',
                marginLeft: 'auto'
              }}
            >
              ADMIN CORE
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.65rem',
              fontWeight: 800,
              color: 'var(--color-warm-white)',
              margin: '0 0 0.5rem 0',
              letterSpacing: '-0.02em'
            }}
          >
            SYSTEM ACCESS
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem',
              color: 'var(--color-muted-gray)',
              margin: 0
            }}
          >
            Authenticate with verified administrator credentials to access the intake console.
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: 'rgba(255, 85, 85, 0.1)',
              border: '1px solid rgba(255, 85, 85, 0.4)',
              color: '#FF6B6B',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            role="alert"
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label className="micro-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
              ADMINISTRATOR IDENTIFIER *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="input-cornerstone"
                style={{ width: '100%', paddingLeft: '38px' }}
                disabled={loading}
              />
              <User
                size={16}
                color="#666"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label className="micro-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
              AUTHENTICATION KEY / PASSWORD *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="input-cornerstone"
                style={{ width: '100%', paddingLeft: '38px', paddingRight: '40px' }}
                disabled={loading}
              />
              <Lock
                size={16}
                color="#666"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
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
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-cornerstone"
            style={{
              marginTop: '0.5rem',
              width: '100%',
              justifyContent: 'center',
              padding: '14px'
            }}
          >
            <span>{loading ? 'AUTHENTICATING...' : 'ACCESS CONSOLE'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Security Notice */}
        <div
          style={{
            marginTop: '2rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--color-border-gray)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: '#666'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} color="#B8FF3D" />
            <span>SESSION ENCRYPTION ACTIVE</span>
          </div>

          <button
            onClick={onNavigateHome}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: 'var(--color-muted-gray)',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            RETURN TO SITE
          </button>
        </div>
      </div>

      <style>{`
        @keyframes adminLoginFade {
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

export default AdminLogin;
