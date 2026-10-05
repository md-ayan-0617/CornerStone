import React, { useEffect, useState, useRef } from 'react';

/**
 * CustomCursor
 * Restrained, high-end desktop cursor with magnetic interaction and contextual labels.
 * Gracefully deactivates on touch/pointer-coarse devices.
 */
export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const requestRef = useRef(null);

  useEffect(() => {
    // Check if device uses touch
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if target has custom cursor attributes
      const interactiveEl = e.target.closest('a, button, [data-cursor], input, select, textarea');
      if (interactiveEl) {
        setIsHovered(true);
        const label = interactiveEl.getAttribute('data-cursor');
        setCursorText(label || "");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  // Smooth lerp trailing loop
  useEffect(() => {
    if (isTouchDevice) return;

    const followMouse = () => {
      setTrailing(prev => ({
        x: prev.x + (position.x - prev.x) * 0.22,
        y: prev.y + (position.y - prev.y) * 0.22
      }));
      requestRef.current = requestAnimationFrame(followMouse);
    };

    requestRef.current = requestAnimationFrame(followMouse);
    return () => cancelAnimationFrame(requestRef.current);
  }, [position, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 99999 }}>
      {/* Inner precise dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '6px' : '4px',
          height: isHovered ? '6px' : '4px',
          backgroundColor: '#B8FF3D',
          borderRadius: '50%',
          transform: `translate3d(${position.x - (isHovered ? 3 : 2)}px, ${position.y - (isHovered ? 3 : 2)}px, 0)`,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
          boxShadow: '0 0 8px rgba(184, 255, 61, 0.6)'
        }}
      />

      {/* Trailing ring / badge */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: cursorText ? '64px' : isHovered ? '42px' : '26px',
          height: cursorText ? '64px' : isHovered ? '42px' : '26px',
          border: '1px solid rgba(244, 243, 239, 0.45)',
          backgroundColor: cursorText ? 'rgba(10, 10, 10, 0.85)' : isHovered ? 'rgba(184, 255, 61, 0.08)' : 'transparent',
          backdropFilter: cursorText ? 'blur(4px)' : 'none',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translate3d(${trailing.x - (cursorText ? 32 : isHovered ? 21 : 13)}px, ${trailing.y - (cursorText ? 32 : isHovered ? 21 : 13)}px, 0)`,
          transition: 'width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease',
          boxShadow: isHovered ? '0 0 15px rgba(184, 255, 61, 0.15)' : 'none'
        }}
      >
        {cursorText && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '8px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#B8FF3D',
              textTransform: 'uppercase'
            }}
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomCursor;
