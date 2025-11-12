import { BUILD_VERSION, parseVersion } from '../utils/version';
import { useState } from 'react';

interface VersionProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  style?: React.CSSProperties;
  showDetails?: boolean;
}

export const Version: React.FC<VersionProps> = ({ 
  position = 'bottom-right', 
  style = {},
  showDetails = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const versionInfo = parseVersion(`v${BUILD_VERSION}`);

  const positionStyles: Record<string, React.CSSProperties> = {
    'bottom-right': {
      position: 'fixed',
      bottom: '10px',
      right: '10px'
    },
    'bottom-left': {
      position: 'fixed',
      bottom: '10px',
      left: '10px'
    },
    'top-right': {
      position: 'fixed',
      top: '10px',
      right: '10px'
    },
    'top-left': {
      position: 'fixed',
      top: '10px',
      left: '10px'
    }
  };

  const defaultStyle: React.CSSProperties = {
    fontSize: '0.8rem',
    color: '#666',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontFamily: 'monospace',
    zIndex: 1000,
    userSelect: 'none',
    cursor: showDetails ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
    ...positionStyles[position],
    ...style
  };

  const expandedStyle: React.CSSProperties = {
    ...defaultStyle,
    padding: '8px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid #999',
    maxWidth: '200px',
    whiteSpace: 'nowrap'
  };

  const handleClick = () => {
    if (showDetails) {
      setIsExpanded(!isExpanded);
    }
  };

  if (showDetails && isExpanded && versionInfo) {
    return (
      <div style={expandedStyle} onClick={handleClick}>
        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
          v{BUILD_VERSION}
        </div>
        <div style={{ fontSize: '0.7rem', color: '#888' }}>
          📅 {versionInfo.formatted.date}
        </div>
        <div style={{ fontSize: '0.7rem', color: '#888' }}>
          🚀 Deploy {versionInfo.formatted.deployment}
        </div>
        <div style={{ fontSize: '0.7rem', color: '#888' }}>
          ⏰ {versionInfo.formatted.time}
        </div>
      </div>
    );
  }

  return (
    <div style={defaultStyle} onClick={handleClick}>
      v{BUILD_VERSION}
      {showDetails && (
        <span style={{ fontSize: '0.6rem', opacity: 0.7, marginLeft: '4px' }}>
          ℹ️
        </span>
      )}
    </div>
  );
};
