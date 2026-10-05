import React from 'react';

/**
 * CornerstoneMotif
 * Original recurring geometric mark inspired by foundational architectural corners.
 * Represents modular blocks, intersections, and structural stability.
 */
export const CornerstoneMotif = ({ 
  size = 28, 
  variant = "mark", // "mark" | "bracket" | "crosshair" | "foundation"
  className = "",
  color = "#F4F3EF",
  accent = "#B8FF3D"
}) => {
  if (variant === "bracket") {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        className={className}
        aria-hidden="true"
      >
        <path d="M4 14V4H14" stroke={color} strokeWidth="2" strokeLinecap="square" />
        <rect x="16" y="16" width="4" height="4" fill={accent} />
      </svg>
    );
  }

  if (variant === "crosshair") {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        className={className}
        aria-hidden="true"
      >
        <line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
        <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
        <rect x="10" y="10" width="4" height="4" fill={accent} />
      </svg>
    );
  }

  if (variant === "foundation") {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 32 32" 
        fill="none" 
        className={className}
        aria-hidden="true"
      >
        <rect x="2" y="2" width="12" height="12" stroke={color} strokeWidth="1.5" />
        <rect x="18" y="2" width="12" height="12" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
        <rect x="2" y="18" width="12" height="12" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
        <rect x="18" y="18" width="12" height="12" fill={accent} />
      </svg>
    );
  }

  // Default "mark": An architectural foundational interlocking L-corner
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Foundational base corner */}
      <path d="M4 4H18V10H10V28H4V4Z" fill={color} />
      {/* Intersecting secondary cornerstone block */}
      <path d="M16 16H28V22H22V28H16V16Z" fill={accent} />
    </svg>
  );
};

export default CornerstoneMotif;
