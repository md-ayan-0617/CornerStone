import React, { useState, useEffect, useCallback } from 'react';
import {
  LayoutDashboard,
  Inbox,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  LogOut,
  RefreshCw,
  Search,
  Download,
  Calendar,
  ChevronLeft,
  ChevronRight,
  KeyRound,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  ExternalLink,
  Menu,
  X,
  CheckSquare,
  Square,
  ArrowUpRight,
  Mail
} from 'lucide-react';
import CornerstoneMotif from '../CornerstoneMotif';
import InquiryDetailModal from './InquiryDetailModal';
import ChangePasswordModal from './ChangePasswordModal';
import ToastNotification from './ToastNotification';

export const AdminDashboard = ({ user, onLogout, onNavigateHome }) => {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'all' | 'new' | 'in_progress' | 'replied' | 'trash'
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Inquiries data state
  const [inquiries, setInquiries] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    new: 0,
    in_progress: 0,
    replied: 0,
    completed: 0,
    spam: 0,
    trash: 0,
    unread: 0,
    today: 0,
    this_week: 0
  });
  const [pagination, setPagination] = useState({ page: 1, limit: 15, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Gmail OAuth status state
  const [gmailStatus, setGmailStatus] = useState({
    configured: false,
    connected: false,
    email: null,
    lastUpdated: null
  });

  // Filters & Sorting state
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState('all'); // 'all' | 'today' | '7days' | '30days'
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  // Selected inquiries for bulk actions
  const [selectedIds, setSelectedIds] = useState([]);

  // Detail Modal state
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Password Modal state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState(null);

  // Analytics state
  const [analytics, setAnalytics] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Fetch inquiries from database
  const fetchInquiries = useCallback(
    async (pageToLoad = pagination.page, showSpinner = true) => {
      if (showSpinner) setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          status: activeTab === 'overview' ? 'all' : activeTab,
          search: search.trim(),
          dateRange,
          sortBy,
          sortOrder,
          page: String(pageToLoad),
          limit: String(pagination.limit)
        });

        const res = await fetch(`/api/inquiries?${queryParams.toString()}`, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to fetch inquiries.');
        }

        setInquiries(data.inquiries || []);
        if (data.counts) setCounts(data.counts);
        if (data.pagination) setPagination(data.pagination);
      } catch (err) {
        showToast(err.message || 'Error communicating with database.', 'error');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [activeTab, search, dateRange, sortBy, sortOrder, pagination.limit]
  );

  // Fetch analytics data
  const fetchAnalytics = useCallback(async () => {
    try {
      const res = await fetch('/api/inquiries/analytics', {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setAnalytics(data.analytics);
      }
    } catch {
      // ignore
    }
  }, []);

  // Fetch Gmail OAuth connection status
  const fetchGmailStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/gmail/status', {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setGmailStatus({
          configured: Boolean(data.configured),
          connected: Boolean(data.connected),
          email: data.email || null,
          lastUpdated: data.lastUpdated || null
        });
      }
    } catch {
      // ignore
    }
  }, []);

  // Connect Gmail OAuth
  const handleConnectGmail = async () => {
    try {
      const res = await fetch('/api/gmail/auth-url', {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success || !data.url) {
        throw new Error(data.error || 'Failed to initialize Google OAuth session.');
      }
      window.location.href = data.url;
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Disconnect Gmail
  const handleDisconnectGmail = async () => {
    if (!window.confirm('Disconnect your authorized Gmail account? You will need to re-authorize before sending replies.')) {
      return;
    }
    try {
      const res = await fetch('/api/gmail/disconnect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to disconnect Gmail.');
      }
      showToast('Gmail account disconnected successfully.');
      fetchGmailStatus();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Check URL parameters from Google OAuth callback on mount
  useEffect(() => {
    fetchGmailStatus();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('gmail_connected') === 'true') {
      const email = urlParams.get('email');
      showToast(`Gmail account ${email ? `(${email}) ` : ''}connected successfully.`);
      window.history.replaceState({}, '', '/admin/9827988375');
      fetchGmailStatus();
    } else if (urlParams.get('gmail_error')) {
      showToast(`Gmail authorization error: ${decodeURIComponent(urlParams.get('gmail_error'))}`, 'error');
      window.history.replaceState({}, '', '/admin/9827988375');
    }
  }, [fetchGmailStatus]);

  // Initial load and filter change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInquiries(1, true);
      setSelectedIds([]);
    }, 200);
    return () => clearTimeout(timer);
  }, [fetchInquiries]);

  // Load analytics when switching to overview
  useEffect(() => {
    if (activeTab === 'overview') {
      fetchAnalytics();
    }
  }, [activeTab, fetchAnalytics]);

  // Handle Refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchInquiries(pagination.page, false);
    await fetchGmailStatus();
    if (activeTab === 'overview') {
      await fetchAnalytics();
    }
    showToast('Dashboard data synchronized with database.');
  };

  // Update Status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to update status.');

      showToast(`Inquiry ${id} marked as ${newStatus.replace('_', ' ')}.`);
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(data.inquiry);
      }
      fetchInquiries(pagination.page, false);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Update Notes
  const handleUpdateNotes = async (id, internal_notes) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ internal_notes })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to save internal notes.');

      showToast('Confidential internal notes saved.');
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(data.inquiry);
      }
      fetchInquiries(pagination.page, false);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Toggle Spam
  const handleToggleSpam = async (id, isSpam) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ is_spam: isSpam })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to update spam status.');

      showToast(isSpam ? `Inquiry ${id} flagged as spam.` : `Inquiry ${id} restored from spam.`);
      setIsDetailOpen(false);
      fetchInquiries(pagination.page, false);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Soft Delete / Permanent Delete
  const handleDelete = async (id, permanent = false) => {
    try {
      const res = await fetch(`/api/inquiries/${id}?permanent=${permanent}`, {
        method: 'DELETE',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to delete inquiry.');

      showToast(permanent ? `Inquiry ${id} permanently purged.` : `Inquiry ${id} moved to trash.`);
      setIsDetailOpen(false);
      fetchInquiries(pagination.page, false);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Restore from Trash
  const handleRestore = async (id) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ is_deleted: false, is_spam: false, status: 'new' })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to restore inquiry.');

      showToast(`Inquiry ${id} restored to active queue.`);
      setIsDetailOpen(false);
      fetchInquiries(pagination.page, false);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Bulk Actions
  const handleBulkAction = async (action) => {
    if (selectedIds.length === 0) return;
    try {
      const res = await fetch('/api/inquiries/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ ids: selectedIds, action })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.error || 'Bulk action failed.');

      showToast(`Successfully processed ${selectedIds.length} inquiries.`);
      setSelectedIds([]);
      fetchInquiries(pagination.page, false);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // CSV Export
  const handleExportCsv = () => {
    const exportStatus = activeTab === 'overview' ? 'all' : activeTab;
    window.location.href = `/api/inquiries/export?status=${exportStatus}`;
    showToast('Exporting inquiries CSV data file...');
  };

  // Open detail modal and mark as read
  const openInquiryDetail = async (inq) => {
    setSelectedInquiry(inq);
    setIsDetailOpen(true);

    if (!inq.is_read) {
      // Mark read on server
      try {
        await fetch(`/api/inquiries/${inq.id}`, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
        setInquiries((prev) =>
          prev.map((item) => (item.id === inq.id ? { ...item, is_read: true } : item))
        );
        setCounts((prev) => ({ ...prev, unread: Math.max(0, prev.unread - 1) }));
      } catch {
        // ignore
      }
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === inquiries.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(inquiries.map((i) => i.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

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

  // Navigation Items
  const navItems = [
    { id: 'overview', label: 'OVERVIEW', icon: LayoutDashboard },
    { id: 'all', label: 'ALL INQUIRIES', icon: Inbox, count: counts.total },
    { id: 'new', label: 'NEW', icon: AlertTriangle, count: counts.new, highlight: true },
    { id: 'in_progress', label: 'IN PROGRESS', icon: Clock, count: counts.in_progress },
    { id: 'replied', label: 'REPLIED', icon: CheckCircle2, count: counts.replied },
    { id: 'trash', label: 'TRASH ARCHIVE', icon: Trash2, count: counts.trash }
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: 'var(--color-near-black)',
        color: 'var(--color-warm-white)',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden'
      }}
    >
      {/* Top Architecture Bar */}
      <header
        style={{
          height: '64px',
          borderBottom: '1px solid var(--color-border-gray)',
          backgroundColor: '#090909',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(1rem, 3vw, 2rem)',
          position: 'sticky',
          top: 0,
          zIndex: 900
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#F4F3EF',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '6px'
            }}
            className="admin-mobile-menu-btn"
            aria-label="Toggle Sidebar Menu"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CornerstoneMotif size={22} variant="mark" />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.05rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
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
                letterSpacing: '0.08em'
              }}
            >
              MANAGEMENT CONSOLE
            </span>
          </div>
        </div>

        {/* Header Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleRefresh}
            style={{
              background: 'none',
              border: '1px solid var(--color-border-gray)',
              color: '#9B9A96',
              padding: '6px 12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="Refresh database records"
          >
            <RefreshCw size={13} className={refreshing ? 'spin-icon' : ''} />
            <span className="hide-on-mobile">REFRESH</span>
          </button>

          <button
            onClick={onNavigateHome}
            style={{
              background: 'none',
              border: '1px solid var(--color-border-gray)',
              color: '#9B9A96',
              padding: '6px 12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="View public website"
          >
            <ExternalLink size={13} />
            <span className="hide-on-mobile">LIVE SITE</span>
          </button>

          {/* Gmail OAuth Connection Pill / Action */}
          {gmailStatus.connected ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 10px',
                backgroundColor: 'rgba(74, 222, 128, 0.08)',
                border: '1px solid rgba(74, 222, 128, 0.25)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#4ADE80'
              }}
              title="Authorized Gmail account for customer replies"
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4ADE80' }} />
              <span className="hide-on-mobile">GMAIL: {gmailStatus.email}</span>
              <button
                onClick={handleDisconnectGmail}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9B9A96',
                  cursor: 'pointer',
                  padding: '2px 4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem'
                }}
                title="Disconnect Gmail account"
              >
                ✕
              </button>
            </div>
          ) : gmailStatus.configured ? (
            <button
              onClick={handleConnectGmail}
              style={{
                background: 'none',
                border: '1px solid var(--color-accent-lime)',
                color: 'var(--color-accent-lime)',
                padding: '6px 12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Authorize your Gmail account to send customer replies"
            >
              <Mail size={13} />
              <span>CONNECT GMAIL</span>
            </button>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 10px',
                backgroundColor: 'rgba(255, 184, 0, 0.08)',
                border: '1px solid rgba(255, 184, 0, 0.25)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#FFB800'
              }}
              title="Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in environment to enable Gmail replies"
            >
              <AlertTriangle size={12} />
              <span className="hide-on-mobile">GMAIL SETUP PENDING</span>
            </div>
          )}

          {/* Account Details & Password Modal Trigger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '8px', borderLeft: '1px solid var(--color-border-gray)' }}>
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#9B9A96',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 8px'
              }}
              title="Change Password"
            >
              <KeyRound size={14} color="#B8FF3D" />
              <span>{user?.username || 'admin'}</span>
            </button>

            <button
              onClick={onLogout}
              style={{
                background: 'none',
                border: 'none',
                color: '#FF6B6B',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        
        {/* Sidebar Navigation */}
        <aside
          style={{
            width: '260px',
            backgroundColor: '#0B0B0B',
            borderRight: '1px solid var(--color-border-gray)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.5rem 1rem',
            position: 'sticky',
            top: '64px',
            height: 'calc(100vh - 64px)',
            zIndex: 800
          }}
          className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}
        >
          <div>
            <span className="micro-label" style={{ display: 'block', padding: '0 0.75rem 0.75rem 0.75rem' }}>
              DIRECTIVES &amp; QUEUES
            </span>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '10px 12px',
                      background: isActive ? 'rgba(184, 255, 61, 0.08)' : 'transparent',
                      border: 'none',
                      borderLeft: isActive ? '3px solid var(--color-accent-lime)' : '3px solid transparent',
                      color: isActive ? 'var(--color-warm-white)' : 'var(--color-muted-gray)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      letterSpacing: '0.04em',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = '#F4F3EF';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = 'var(--color-muted-gray)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={16} color={isActive ? '#B8FF3D' : '#9B9A96'} />
                      <span>{item.label}</span>
                    </div>

                    {typeof item.count === 'number' && (
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '1px 6px',
                          borderRadius: '2px',
                          backgroundColor: item.highlight && item.count > 0 ? 'rgba(184, 255, 61, 0.2)' : '#181818',
                          color: item.highlight && item.count > 0 ? '#B8FF3D' : '#9B9A96',
                          fontWeight: item.highlight && item.count > 0 ? 700 : 400
                        }}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Bottom Metadata */}
          <div
            style={{
              paddingTop: '1rem',
              borderTop: '1px solid var(--color-border-gray)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: '#666'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span className="lime-dot" style={{ width: '5px', height: '5px' }} />
              <span style={{ color: '#B8FF3D' }}>DB ENCRYPTED &amp; ONLINE</span>
            </div>
            <span>CornerStone Systems v2.4</span>
          </div>
        </aside>

        {/* Main Content Area */}
        <main
          style={{
            flex: 1,
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            overflowY: 'auto',
            maxWidth: '1440px'
          }}
        >
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === 'overview' && (
            <div>
              {/* Overview Header */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <CornerstoneMotif size={16} variant="bracket" />
                  <span className="micro-label-lime">EXECUTIVE INTAKE TELEMETRY</span>
                </div>
                <h1
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                    fontWeight: 800,
                    margin: 0,
                    color: 'var(--color-warm-white)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  SYSTEMS OVERVIEW
                </h1>
              </div>

              {/* 6 Real Database Metric Summary Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}
              >
                {[
                  { label: 'TOTAL INQUIRIES', value: counts.total, icon: Inbox, color: '#F4F3EF' },
                  { label: 'NEW INQUIRIES', value: counts.new, icon: AlertTriangle, color: '#B8FF3D', highlight: true },
                  { label: 'IN PROGRESS', value: counts.in_progress, icon: Clock, color: '#FFB800' },
                  { label: 'REPLIED INQUIRIES', value: counts.replied, icon: CheckCircle2, color: '#4ADE80' },
                  { label: "TODAY'S INTAKES", value: counts.today, icon: TrendingUp, color: '#B8FF3D' },
                  { label: "THIS WEEK", value: counts.this_week, icon: Calendar, color: '#F4F3EF' }
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#121212',
                        border: `1px solid ${stat.highlight && stat.value > 0 ? 'rgba(184, 255, 61, 0.4)' : 'var(--color-border-gray)'}`,
                        padding: '1.25rem',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span className="micro-label">{stat.label}</span>
                        <Icon size={16} color={stat.color} />
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.8rem, 2.8vw, 2.3rem)',
                          fontWeight: 800,
                          color: stat.color,
                          letterSpacing: '-0.02em'
                        }}
                      >
                        {stat.value}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Analytics Section: 30-Day Inquiries Chart & Status Breakdown */}
              {analytics && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2.5rem'
                  }}
                >
                  {/* 30-Day Activity Bar Chart */}
                  <div
                    style={{
                      backgroundColor: '#121212',
                      border: '1px solid var(--color-border-gray)',
                      padding: '1.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <BarChart3 size={16} color="#B8FF3D" />
                        <span className="micro-label">30-DAY INTAKE VELOCITY</span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#9B9A96' }}>
                        REAL DATABASE RECORDS
                      </span>
                    </div>

                    {/* SVG Interactive Chart */}
                    <div style={{ height: '140px', width: '100%', display: 'flex', alignItems: 'flex-end', gap: '4px', paddingTop: '10px' }}>
                      {analytics.dailyTrends.map((d, i) => {
                        const maxVal = Math.max(...analytics.dailyTrends.map((t) => t.count), 1);
                        const barHeight = Math.max(6, (d.count / maxVal) * 110);
                        return (
                          <div
                            key={i}
                            style={{
                              flex: 1,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              height: '100%',
                              justifyContent: 'flex-end'
                            }}
                            title={`${d.date}: ${d.count} inquiries`}
                          >
                            <div
                              style={{
                                width: '100%',
                                height: `${barHeight}px`,
                                backgroundColor: d.count > 0 ? '#B8FF3D' : '#222',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer'
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = d.count > 0 ? '#B8FF3D' : '#222')}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#666' }}>
                      <span>30 DAYS AGO</span>
                      <span>TODAY</span>
                    </div>
                  </div>

                  {/* Status Breakdown & Workload Distribution */}
                  <div
                    style={{
                      backgroundColor: '#121212',
                      border: '1px solid var(--color-border-gray)',
                      padding: '1.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                      <span className="micro-label">ACTIVE PIPELINE DISTRIBUTION</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#B8FF3D' }}>
                        LIVE STATUS
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {[
                        { label: 'NEW INTAKES', count: counts.new, color: '#B8FF3D' },
                        { label: 'UNDER ACTIVE ARCHITECTURE', count: counts.in_progress, color: '#FFB800' },
                        { label: 'REPLIED VIA GMAIL', count: counts.replied, color: '#4ADE80' },
                        { label: 'FLAGGED / FILTERED SPAM', count: counts.spam, color: '#FF6B6B' }
                      ].map((bar, i) => {
                        const totalActive = Math.max(1, counts.total + counts.spam);
                        const pct = Math.round((bar.count / totalActive) * 100);
                        return (
                          <div key={i}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                              <span style={{ color: '#E0DFDA' }}>{bar.label}</span>
                              <span style={{ color: bar.color, fontWeight: 700 }}>
                                {bar.count} ({pct}%)
                              </span>
                            </div>
                            <div style={{ width: '100%', height: '6px', backgroundColor: '#222', overflow: 'hidden' }}>
                              <div
                                style={{
                                  width: `${pct}%`,
                                  height: '100%',
                                  backgroundColor: bar.color,
                                  transition: 'width 0.4s ease'
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Inquiries List in Overview */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="micro-label">RECENT INTAKES STREAM</span>
                  <button
                    onClick={() => setActiveTab('all')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-accent-lime)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>VIEW ALL INTAKES</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>

                {inquiries.slice(0, 5).map((inq) => (
                  <div
                    key={inq.id}
                    onClick={() => openInquiryDetail(inq)}
                    style={{
                      backgroundColor: '#121212',
                      border: '1px solid var(--color-border-gray)',
                      padding: '1rem 1.25rem',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s ease, background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(184, 255, 61, 0.4)';
                      e.currentTarget.style.backgroundColor = '#161616';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border-gray)';
                      e.currentTarget.style.backgroundColor = '#121212';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: getStatusColor(inq.status)
                        }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: '#F4F3EF' }}>
                            {inq.name}
                          </span>
                          {inq.company && inq.company !== 'N/A' && (
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#9B9A96' }}>
                              • {inq.company}
                            </span>
                          )}
                          {!inq.is_read && (
                            <span
                              style={{
                                fontSize: '0.65rem',
                                fontFamily: 'var(--font-mono)',
                                backgroundColor: 'rgba(184, 255, 61, 0.15)',
                                color: '#B8FF3D',
                                padding: '1px 5px',
                                border: '1px solid rgba(184, 255, 61, 0.3)'
                              }}
                            >
                              NEW
                            </span>
                          )}
                        </div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#777' }}>
                          {inq.email} • {inq.budget || 'Budget Unspecified'}
                        </span>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#9B9A96' }}>
                        {new Date(inq.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: INQUIRIES DATA TABLE (All, New, In Progress, Completed, Spam, Trash) */}
          {activeTab !== 'overview' && (
            <div>
              {/* Table Header Section */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.25rem' }}>
                    <CornerstoneMotif size={14} variant="bracket" />
                    <span className="micro-label-lime">{activeTab.toUpperCase().replace('_', ' ')} DIRECTIVE</span>
                  </div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.75rem',
                      fontWeight: 800,
                      margin: 0,
                      color: 'var(--color-warm-white)'
                    }}
                  >
                    {activeTab === 'all'
                      ? 'ALL INQUIRIES'
                      : activeTab === 'new'
                      ? 'NEW INQUIRIES'
                      : activeTab === 'in_progress'
                      ? 'IN PROGRESS WORKFLOW'
                      : activeTab === 'replied'
                      ? 'REPLIED INQUIRIES'
                      : activeTab === 'completed'
                      ? 'COMPLETED INTAKES'
                      : activeTab === 'spam'
                      ? 'FLAGGED SPAM'
                      : 'TRASH ARCHIVE'}
                  </h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={handleExportCsv}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      backgroundColor: 'transparent',
                      border: '1px solid var(--color-border-gray)',
                      color: '#E0DFDA',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                    title="Export data as CSV"
                  >
                    <Download size={14} />
                    <span>EXPORT CSV</span>
                  </button>
                </div>
              </div>

              {/* Search & Filter Toolbar */}
              <div
                style={{
                  backgroundColor: '#111111',
                  border: '1px solid var(--color-border-gray)',
                  padding: '1rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                {/* Search Box */}
                <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
                  <Search
                    size={15}
                    color="#666"
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none'
                    }}
                  />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, email, company, scope, or ID..."
                    className="input-cornerstone"
                    style={{ width: '100%', paddingLeft: '36px', height: '38px', fontSize: '0.82rem' }}
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#999',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Date Range Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} color="#9B9A96" />
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    style={{
                      backgroundColor: '#0A0A0A',
                      border: '1px solid var(--color-border-gray)',
                      color: '#E0DFDA',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      padding: '6px 10px',
                      height: '38px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Dates</option>
                    <option value="today">Today</option>
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      backgroundColor: '#0A0A0A',
                      border: '1px solid var(--color-border-gray)',
                      color: '#E0DFDA',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      padding: '6px 10px',
                      height: '38px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="created_at">Sort: Date</option>
                    <option value="name">Sort: Name</option>
                    <option value="status">Sort: Status</option>
                  </select>

                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    style={{
                      backgroundColor: '#0A0A0A',
                      border: '1px solid var(--color-border-gray)',
                      color: '#E0DFDA',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      height: '38px',
                      padding: '0 10px',
                      cursor: 'pointer'
                    }}
                  >
                    {sortOrder === 'asc' ? '↑ ASC' : '↓ DESC'}
                  </button>
                </div>
              </div>

              {/* Bulk Action Bar (Visible when items selected) */}
              {selectedIds.length > 0 && (
                <div
                  style={{
                    backgroundColor: '#181818',
                    border: '1px solid var(--color-accent-lime)',
                    padding: '10px 16px',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                    animation: 'fadeIn 0.2s ease'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#B8FF3D' }}>
                    {selectedIds.length} INQUIRIES SELECTED
                  </span>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleBulkAction('mark_in_progress')}
                      style={{
                        padding: '4px 10px',
                        backgroundColor: 'transparent',
                        border: '1px solid #FFB800',
                        color: '#FFB800',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        cursor: 'pointer'
                      }}
                    >
                      MARK IN PROGRESS
                    </button>
                    <button
                      onClick={() => handleBulkAction('mark_replied')}
                      style={{
                        padding: '4px 10px',
                        backgroundColor: 'transparent',
                        border: '1px solid #4ADE80',
                        color: '#4ADE80',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        cursor: 'pointer'
                      }}
                    >
                      MARK REPLIED
                    </button>
                    {activeTab === 'trash' ? (
                      <>
                        <button
                          onClick={() => handleBulkAction('restore')}
                          style={{
                            padding: '4px 10px',
                            backgroundColor: 'transparent',
                            border: '1px solid var(--color-accent-lime)',
                            color: 'var(--color-accent-lime)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            cursor: 'pointer'
                          }}
                        >
                          RESTORE SELECTED
                        </button>
                        <button
                          onClick={() => handleBulkAction('delete_permanent')}
                          style={{
                            padding: '4px 10px',
                            backgroundColor: '#FF4444',
                            border: 'none',
                            color: '#FFF',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                        >
                          PURGE PERMANENTLY
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleBulkAction('trash')}
                        style={{
                          padding: '4px 10px',
                          backgroundColor: 'transparent',
                          border: '1px solid #FF6B6B',
                          color: '#FF6B6B',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          cursor: 'pointer'
                        }}
                      >
                        MOVE TO TRASH
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Data Table */}
              <div
                style={{
                  backgroundColor: '#0F0F0F',
                  border: '1px solid var(--color-border-gray)',
                  overflowX: 'auto',
                  position: 'relative'
                }}
              >
                {loading && (
                  <div
                    style={{
                      padding: '3rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px'
                    }}
                  >
                    <div style={{ width: '40px', height: '2px', backgroundColor: '#B8FF3D', animation: 'loadLine 0.6s infinite' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#9B9A96' }}>
                      SYNCHRONIZING WITH DATABASE...
                    </span>
                  </div>
                )}

                {!loading && inquiries.length === 0 && (
                  <div
                    style={{
                      padding: '4rem 2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center'
                    }}
                  >
                    <CornerstoneMotif size={32} variant="foundation" />
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginTop: '1rem', color: '#F4F3EF' }}>
                      NO INQUIRIES LOCATED
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#9B9A96', maxWidth: '34ch' }}>
                      {search
                        ? 'No records matched your search query. Try broadening your terms.'
                        : 'No inquiry records found in this category queue.'}
                    </p>
                  </div>
                )}

                {!loading && inquiries.length > 0 && (
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      textAlign: 'left'
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          borderBottom: '1px solid var(--color-border-gray)',
                          backgroundColor: '#141414',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: '#9B9A96',
                          letterSpacing: '0.04em'
                        }}
                      >
                        <th style={{ padding: '12px 16px', width: '40px' }}>
                          <button
                            onClick={toggleSelectAll}
                            style={{ background: 'none', border: 'none', color: '#9B9A96', cursor: 'pointer', padding: 0 }}
                            aria-label="Select all"
                          >
                            {selectedIds.length === inquiries.length ? (
                              <CheckSquare size={16} color="#B8FF3D" />
                            ) : (
                              <Square size={16} />
                            )}
                          </button>
                        </th>
                        <th style={{ padding: '12px 16px' }}>CLIENT / ORGANIZATION</th>
                        <th style={{ padding: '12px 16px' }}>CONTACT DETAILS</th>
                        <th style={{ padding: '12px 16px' }}>SCOPE / BUDGET</th>
                        <th style={{ padding: '12px 16px' }}>DATE RECEIVED</th>
                        <th style={{ padding: '12px 16px' }}>STATUS</th>
                        <th style={{ padding: '12px 16px', textAlign: 'right' }}>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map((inq) => {
                        const isSelected = selectedIds.includes(inq.id);
                        return (
                          <tr
                            key={inq.id}
                            style={{
                              borderBottom: '1px solid rgba(255,255,255,0.04)',
                              backgroundColor: isSelected
                                ? 'rgba(184, 255, 61, 0.04)'
                                : !inq.is_read
                                ? 'rgba(255, 255, 255, 0.02)'
                                : 'transparent',
                              cursor: 'pointer',
                              transition: 'background-color 0.15s ease'
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.backgroundColor = !inq.is_read ? 'rgba(255, 255, 255, 0.02)' : 'transparent';
                              }
                            }}
                          >
                            <td
                              style={{ padding: '14px 16px' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSelectOne(inq.id);
                              }}
                            >
                              <button
                                style={{ background: 'none', border: 'none', color: '#9B9A96', cursor: 'pointer', padding: 0 }}
                              >
                                {isSelected ? <CheckSquare size={16} color="#B8FF3D" /> : <Square size={16} />}
                              </button>
                            </td>

                            <td style={{ padding: '14px 16px' }} onClick={() => openInquiryDetail(inq)}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span
                                  style={{
                                    fontFamily: 'var(--font-display)',
                                    fontWeight: 700,
                                    fontSize: '0.92rem',
                                    color: '#F4F3EF'
                                  }}
                                >
                                  {inq.name}
                                </span>
                                {!inq.is_read && (
                                  <span
                                    style={{
                                      width: '6px',
                                      height: '6px',
                                      borderRadius: '50%',
                                      backgroundColor: '#B8FF3D'
                                    }}
                                  />
                                )}
                              </div>
                              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#9B9A96' }}>
                                {inq.company || 'Direct Partner'}
                              </span>
                            </td>

                            <td style={{ padding: '14px 16px' }} onClick={() => openInquiryDetail(inq)}>
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#B8FF3D' }}>
                                {inq.email}
                              </div>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#777' }}>
                                {inq.phone || 'No phone provided'}
                              </span>
                            </td>

                            <td style={{ padding: '14px 16px' }} onClick={() => openInquiryDetail(inq)}>
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#F4F3EF' }}>
                                {inq.budget || 'Standard Tier'}
                              </div>
                              <span
                                style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '0.75rem',
                                  color: '#9B9A96',
                                  display: 'block',
                                  maxWidth: '220px',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}
                              >
                                {inq.services || 'General Enquiry'}
                              </span>
                            </td>

                            <td style={{ padding: '14px 16px' }} onClick={() => openInquiryDetail(inq)}>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#9B9A96' }}>
                                {new Date(inq.created_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </td>

                            <td style={{ padding: '14px 16px' }} onClick={() => openInquiryDetail(inq)}>
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  padding: '3px 8px',
                                  fontSize: '0.7rem',
                                  fontFamily: 'var(--font-mono)',
                                  backgroundColor: `${getStatusColor(inq.status)}15`,
                                  color: getStatusColor(inq.status),
                                  border: `1px solid ${getStatusColor(inq.status)}35`,
                                  textTransform: 'uppercase'
                                }}
                              >
                                <span
                                  style={{
                                    width: '5px',
                                    height: '5px',
                                    borderRadius: '50%',
                                    backgroundColor: getStatusColor(inq.status)
                                  }}
                                />
                                {inq.status.replace('_', ' ')}
                              </span>
                            </td>

                            <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '6px' }}>
                                <button
                                  onClick={() => openInquiryDetail(inq)}
                                  style={{
                                    background: 'none',
                                    border: '1px solid var(--color-border-gray)',
                                    color: '#E0DFDA',
                                    padding: '6px 12px',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.72rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#B8FF3D';
                                    e.currentTarget.style.color = '#B8FF3D';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--color-border-gray)';
                                    e.currentTarget.style.color = '#E0DFDA';
                                  }}
                                >
                                  INSPECT
                                </button>
                                <button
                                  onClick={() => openInquiryDetail(inq)}
                                  style={{
                                    background: 'rgba(184, 255, 61, 0.08)',
                                    border: '1px solid rgba(184, 255, 61, 0.3)',
                                    color: '#B8FF3D',
                                    padding: '6px 10px',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.72rem',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    transition: 'all 0.15s ease'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#B8FF3D';
                                    e.currentTarget.style.color = '#0A0A0A';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(184, 255, 61, 0.08)';
                                    e.currentTarget.style.color = '#B8FF3D';
                                  }}
                                  title="Reply to client via authorized Gmail"
                                >
                                  <Mail size={12} />
                                  <span>REPLY</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}

                {/* Pagination Footer */}
                {pagination.totalPages > 1 && (
                  <div
                    style={{
                      padding: '12px 16px',
                      borderTop: '1px solid var(--color-border-gray)',
                      backgroundColor: '#121212',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: '#9B9A96'
                    }}
                  >
                    <span>
                      SHOWING PAGE {pagination.page} OF {pagination.totalPages} ({pagination.total} TOTAL)
                    </span>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        disabled={pagination.page <= 1}
                        onClick={() => fetchInquiries(pagination.page - 1)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#1A1A1A',
                          border: '1px solid var(--color-border-gray)',
                          color: pagination.page <= 1 ? '#555' : '#F4F3EF',
                          cursor: pagination.page <= 1 ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <ChevronLeft size={13} />
                        PREV
                      </button>

                      <button
                        disabled={pagination.page >= pagination.totalPages}
                        onClick={() => fetchInquiries(pagination.page + 1)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#1A1A1A',
                          border: '1px solid var(--color-border-gray)',
                          color: pagination.page >= pagination.totalPages ? '#555' : '#F4F3EF',
                          cursor: pagination.page >= pagination.totalPages ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        NEXT
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Inquiry Detail Modal */}
      <InquiryDetailModal
        inquiry={selectedInquiry}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onUpdateStatus={handleUpdateStatus}
        onUpdateNotes={handleUpdateNotes}
        onToggleSpam={handleToggleSpam}
        onDelete={handleDelete}
        onRestore={handleRestore}
        gmailStatus={gmailStatus}
        onConnectGmail={handleConnectGmail}
        onReplySuccess={(id) => {
          showToast(`Reply sent successfully via authorized Gmail.`);
          fetchInquiries(pagination.page, false);
        }}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onPasswordChanged={() => showToast('Admin access password updated successfully.')}
      />

      {/* Toast Notification Container */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      <style>{`
        .spin-icon {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .admin-sidebar {
            position: fixed !important;
            left: -280px;
            top: 64px;
            bottom: 0;
            transition: left 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .admin-sidebar.open {
            left: 0 !important;
          }
          .admin-mobile-menu-btn {
            display: flex !important;
          }
          .hide-on-mobile {
            display: none !important;
          }
        }
        @media (min-width: 901px) {
          .admin-mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
