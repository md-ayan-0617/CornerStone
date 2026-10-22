import React, { useState, useEffect } from 'react';
import CornerstoneMotif from '../components/CornerstoneMotif';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';

export const AdminPage = ({ onNavigate }) => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState(null);

  // Check authentication session on mount
  useEffect(() => {
    let isMounted = true;
    const verifyAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
        const data = await res.json().catch(() => ({}));
        if (isMounted) {
          if (res.ok && data.authenticated && data.user) {
            setUser(data.user);
          } else {
            setUser(null);
          }
        }
      } catch {
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setCheckingAuth(false);
      }
    };

    verifyAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLoginSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
    } catch {
      // ignore
    }
    setUser(null);
  };

  const handleNavigateHome = () => {
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.location.href = '/';
    }
  };

  if (checkingAuth) {
    return (
      <div
        style={{
          minHeight: '100vh',
          width: '100vw',
          backgroundColor: '#0A0A0A',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <CornerstoneMotif size={24} variant="bracket" />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              color: '#F4F3EF'
            }}
          >
            CORNERSTONE ADMIN CONSOLE
          </span>
        </div>

        <div style={{ width: '120px', height: '1.5px', backgroundColor: '#222', position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '45%',
              backgroundColor: '#B8FF3D',
              animation: 'loadLine 0.5s ease-in-out infinite'
            }}
          />
        </div>

        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#777' }}>
          VERIFYING ENCRYPTED SESSION...
        </span>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} onNavigateHome={handleNavigateHome} />;
  }

  return <AdminDashboard user={user} onLogout={handleLogout} onNavigateHome={handleNavigateHome} />;
};

export default AdminPage;
