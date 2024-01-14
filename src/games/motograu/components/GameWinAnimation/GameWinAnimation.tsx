import React, { useEffect, useState } from 'react';

const GameWinAnimation = () => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowMessage(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  const blinkStyle = {
    position: 'relative',
    bottom: '40%',
    right: '5%',
    borderRadius: '8px',
    padding: '15px',
    display: showMessage ? 'flex' : 'none',
    flexDirection: 'column',
    alignItems: 'flex-end',
    animation: 'blink 1s step-start infinite',
    fontSize: '5rem',
  };
  const slideTop = {
    animation: 'slideTop 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'
  }

  const keyframes = `
  @keyframes slideTop {
    0% {
      transform: translateY(100%);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 0;
    }
  }
`;

  return (
    <>
      <style>{keyframes}</style>
      <div style={{ ...blinkStyle, ...slideTop }}>
      <p style={{ margin: 0, color: 'green' }}>🤑🤑🤑🤑🤑🤑</p>
    </div>
    </>
  );
};

export default GameWinAnimation;
