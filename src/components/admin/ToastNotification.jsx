import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';

export const ToastNotification = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99999,
        backgroundColor: '#141414',
        border: `1px solid ${isError ? '#FF5555' : 'var(--color-accent-lime)'}`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 16px ${isError ? 'rgba(255,85,85,0.2)' : 'rgba(184,255,61,0.2)'}`,
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '420px',
        animation: 'toastSlideIn 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      role="alert"
    >
      {isError ? (
        <AlertTriangle size={18} color="#FF5555" />
      ) : (
        <CheckCircle2 size={18} color="#B8FF3D" />
      )}
      <div style={{ flex: 1 }}>
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: '#F4F3EF',
            letterSpacing: '0.01em'
          }}
        >
          {toast.message}
        </p>
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#9B9A96',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center'
        }}
        aria-label="Close notification"
      >
        <X size={15} />
      </button>

      <style>{`
        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
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

export default ToastNotification;
