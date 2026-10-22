import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURED_SHORTS, getYouTubeEmbedUrl } from '../data/adsProjects';
import CornerstoneMotif from './CornerstoneMotif';
import { Volume2, VolumeX, Maximize2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HomeVideoShowcase = ({ onSelectVideo, onNavigate }) => {
  const [activePlayingId, setActivePlayingId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mutedStates, setMutedStates] = useState({
    "short-01": true,
    "short-02": true,
    "short-03": true
  });
  const [isInFullscreen, setIsInFullscreen] = useState(false);

  const sectionRef = useRef(null);
  const videoCardsRef = useRef({});
  const videoContainerRefs = useRef({});
  const iframeRefs = useRef({});
  const activePlayingRef = useRef(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        typeof window !== 'undefined' &&
        (window.innerWidth <= 768 ||
          /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listen to fullscreen changes across browsers
  useEffect(() => {
    const onFullscreenChange = () => {
      const fsElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      setIsInFullscreen(Boolean(fsElement));
      // Refresh ScrollTrigger to prevent layout shift after exiting fullscreen
      ScrollTrigger.refresh();
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    document.addEventListener('mozfullscreenchange', onFullscreenChange);
    document.addEventListener('MSFullscreenChange', onFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
      document.removeEventListener('mozfullscreenchange', onFullscreenChange);
      document.removeEventListener('MSFullscreenChange', onFullscreenChange);
    };
  }, []);

  // =========================================================================
  // Visibility-Aware Autoplay Engine (Scroll In -> Play, Scroll Away -> Pause)
  // Desktop: Plays muted when in view
  // Mobile: Respects browser policy; pauses when scrolled away
  // =========================================================================
  useEffect(() => {
    const elements = Object.values(videoCardsRef.current).filter(Boolean);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = entry.target.getAttribute('data-video-id');
          const iframe = iframeRefs.current[videoId];
          if (!iframe || !iframe.contentWindow) return;

          // When video becomes at least 58% visible in viewport
          if (entry.isIntersecting && entry.intersectionRatio >= 0.58) {
            // Pause any previously playing video to avoid simultaneous playback
            if (activePlayingRef.current && activePlayingRef.current !== videoId) {
              const prevIframe = iframeRefs.current[activePlayingRef.current];
              try {
                prevIframe?.contentWindow?.postMessage(
                  JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
                  '*'
                );
              } catch (_) {}
            }

            // Start playing current video
            try {
              iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
                '*'
              );
              activePlayingRef.current = videoId;
              setActivePlayingId(videoId);
            } catch (_) {}
          } else if (entry.intersectionRatio < 0.45 && activePlayingRef.current === videoId) {
            // Pause when scrolled away
            try {
              iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
                '*'
              );
              activePlayingRef.current = null;
              setActivePlayingId(null);
            } catch (_) {}
          }
        });
      },
      {
        threshold: [0.2, 0.58, 0.85],
        rootMargin: '0px'
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      Object.values(iframeRefs.current).forEach((iframe) => {
        try {
          iframe?.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
            '*'
          );
        } catch (_) {}
      });
    };
  }, []);

  // Audio unmute / mute handler supporting mobile user interaction
  const toggleMute = (shortId) => {
    const isMuted = mutedStates[shortId];
    const iframe = iframeRefs.current[shortId];

    if (iframe && iframe.contentWindow) {
      try {
        if (isMuted) {
          // Unmute + set full volume
          iframe.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'unMute', args: [] }),
            '*'
          );
          iframe.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }),
            '*'
          );
          // Also ensure playback starts upon user tap
          iframe.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
            '*'
          );
          activePlayingRef.current = shortId;
          setActivePlayingId(shortId);
        } else {
          // Mute
          iframe.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'mute', args: [] }),
            '*'
          );
        }
        setMutedStates((prev) => ({ ...prev, [shortId]: !isMuted }));
      } catch (_) {}
    }
  };

  // Fullscreen trigger targeting actual player iframe or container
  const handleFullscreen = async (short) => {
    const shortId = short.id;
    const iframe = iframeRefs.current[shortId];
    const container = videoContainerRefs.current[shortId];
    if (!iframe) return;

    // Ensure playback is running
    try {
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
        '*'
      );
      activePlayingRef.current = shortId;
      setActivePlayingId(shortId);
    } catch (_) {}

    // Target the actual iframe directly for true video fullscreen
    const target = iframe;

    try {
      if (target.requestFullscreen) {
        await target.requestFullscreen();
      } else if (target.webkitRequestFullscreen) {
        target.webkitRequestFullscreen();
      } else if (target.webkitEnterFullscreen) {
        target.webkitEnterFullscreen();
      } else if (target.mozRequestFullScreen) {
        target.mozRequestFullScreen();
      } else if (target.msRequestFullscreen) {
        target.msRequestFullscreen();
      } else if (container && container.requestFullscreen) {
        await container.requestFullscreen();
      } else {
        // Fallback to lightbox modal
        if (onSelectVideo) onSelectVideo(short);
      }
    } catch (err) {
      console.warn('Native fullscreen request blocked or unsupported:', err);
      if (onSelectVideo) onSelectVideo(short);
    }
  };

  // GSAP Staggered Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set('.home-video-card, .home-video-header-elem', {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: 'all'
        });
        return;
      }

      gsap.fromTo('.home-video-header-elem',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo('.home-video-card',
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home-ads-showcase"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        backgroundColor: '#0A0A0A',
        paddingTop: 'clamp(4.5rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4.5rem, 8vw, 7rem)',
        borderBottom: '1px solid var(--color-border-gray)'
      }}
    >
      <div className="site-container">
        {/* Section Header: Minimal Single-Line Focus with "SELECTED FILMS" */}
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
          <div className="home-video-header-elem" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.65rem' }}>
            <CornerstoneMotif size={14} variant="bracket" />
            <span className="micro-label-lime">
              ADS / SELECTED FILMS
            </span>
          </div>

          <h2
            className="display-large home-video-header-elem"
            style={{
              margin: '0 0 0.5rem 0',
              fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
              lineHeight: 1.1,
              whiteSpace: 'nowrap'
            }}
          >
            SELECTED FILMS
          </h2>

          <p
            className="home-video-header-elem"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: 'var(--color-muted-gray)',
              margin: 0
            }}
          >
            High-velocity 9:16 portrait commercial films engineered for modern mobile feeds.
          </p>
        </div>

        {/* 3-Column Responsive Portrait Video Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            justifyContent: 'center'
          }}
        >
          {FEATURED_SHORTS.map((short, idx) => {
            const isPlaying = activePlayingId === short.id;
            const isMuted = mutedStates[short.id] ?? true;

            return (
              <div
                key={short.id}
                ref={(el) => (videoCardsRef.current[short.id] = el)}
                data-video-id={short.id}
                className="home-video-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#0E0E0E',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 'clamp(18px, 2.2vw, 24px)',
                  padding: 'clamp(0.85rem, 1.5vw, 1.15rem)',
                  boxShadow: isPlaying
                    ? '0 25px 55px rgba(0, 0, 0, 0.85), 0 0 40px -10px rgba(184, 255, 61, 0.15)'
                    : '0 20px 45px rgba(0, 0, 0, 0.6)',
                  borderColor: isPlaying ? 'rgba(184, 255, 61, 0.35)' : 'rgba(255, 255, 255, 0.08)',
                  transition: 'border-color 0.35s ease, box-shadow 0.35s ease, transform 0.3s ease'
                }}
              >
                {/* Portrait 9:16 Video Frame with Rounded Corners & Hardware Clipping */}
                <div
                  ref={(el) => (videoContainerRefs.current[short.id] = el)}
                  className="home-video-container-frame"
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '9 / 16',
                    borderRadius: 'clamp(16px, 2vw, 20px)',
                    overflow: 'hidden',
                    backgroundColor: '#050505',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* YouTube IFrame: enablejsapi=1, fs=1, fullscreen permission */}
                  <iframe
                    ref={(el) => (iframeRefs.current[short.id] = el)}
                    src={getYouTubeEmbedUrl(short.videoId, { autoplay: 0, mute: 1, controls: 0, loop: 1 })}
                    title={short.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    allowFullScreen
                    webkitallowfullscreen="true"
                    mozallowfullscreen="true"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      display: 'block'
                    }}
                  />

                  {/* Clean Floating Overlays (NO large blocking play button) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      right: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      pointerEvents: 'none',
                      zIndex: 10
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 8px',
                        backgroundColor: 'rgba(10, 10, 10, 0.85)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        color: isPlaying ? 'var(--color-accent-lime)' : 'var(--color-warm-white)',
                        pointerEvents: 'auto'
                      }}
                    >
                      <span
                        className="lime-dot"
                        style={{
                          width: '4px',
                          height: '4px',
                          backgroundColor: isPlaying ? 'var(--color-accent-lime)' : '#666'
                        }}
                      />
                      <span>{isPlaying ? (isMuted ? 'PLAYING MUTED' : 'PLAYING') : `FILM 0${idx + 1}`}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', pointerEvents: 'auto' }}>
                      <button
                        onClick={() => toggleMute(short.id)}
                        title={isMuted ? "Enable Sound" : "Mute Sound"}
                        aria-label={isMuted ? "Enable Sound" : "Mute Sound"}
                        style={{
                          minWidth: '32px',
                          height: '32px',
                          padding: isMobile ? '0 10px' : '0',
                          borderRadius: '999px',
                          backgroundColor: isMuted ? 'rgba(10, 10, 10, 0.85)' : 'var(--color-lime)',
                          backdropFilter: 'blur(8px)',
                          border: isMuted ? '1px solid rgba(255, 255, 255, 0.22)' : '1px solid var(--color-lime)',
                          color: isMuted ? 'var(--color-warm-white)' : '#000',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.65rem',
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                        {isMobile && <span>{isMuted ? "SOUND" : "ON"}</span>}
                      </button>

                      <button
                        onClick={() => handleFullscreen(short)}
                        title="View Fullscreen"
                        aria-label="View Fullscreen"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(10, 10, 10, 0.85)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255, 255, 255, 0.22)',
                          color: 'var(--color-warm-white)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <Maximize2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Sound Interaction Banner (Clearly visible on phone screens) */}
                  {isMobile && isMuted && isPlaying && (
                    <div
                      onClick={() => toggleMute(short.id)}
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '12px',
                        right: '12px',
                        backgroundColor: 'rgba(10, 10, 10, 0.92)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(184, 255, 61, 0.4)',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        color: 'var(--color-lime)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        cursor: 'pointer',
                        zIndex: 10,
                        letterSpacing: '0.08em'
                      }}
                    >
                      <Volume2 size={13} />
                      <span>TAP TO ENABLE AUDIO</span>
                    </div>
                  )}
                </div>

                {/* Minimal Single-Line Bottom Bar */}
                <div style={{ paddingTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span className="micro-label-lime" style={{ fontSize: '0.62rem', display: 'block', marginBottom: '2px' }}>
                      {short.category}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: 'var(--color-warm-white)',
                        margin: 0
                      }}
                    >
                      {short.title}
                    </h3>
                  </div>

                  <span className="micro-label" style={{ color: '#666', fontSize: '0.65rem' }}>
                    9:16 REEL
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen CSS styling ensuring zero blank screen */}
      <style>{`
        .home-video-card:hover {
          transform: translateY(-4px);
        }
        :fullscreen, :-webkit-full-screen {
          width: 100vw !important;
          height: 100vh !important;
          max-width: 100vw !important;
          max-height: 100vh !important;
          background-color: #000 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          border-radius: 0 !important;
          border: none !important;
        }
        :fullscreen iframe, :-webkit-full-screen iframe {
          width: 100% !important;
          height: 100% !important;
          max-width: 100% !important;
          max-height: 100% !important;
          border: none !important;
        }
      `}</style>
    </section>
  );
};

export default HomeVideoShowcase;
