import React, { useState, useEffect } from 'react';

export const TypewriterText = ({
  words = [],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2200,
  color = 'var(--color-accent-lime)',
  cursorColor = 'var(--color-accent-lime)',
  style = {}
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[currentWordIndex % words.length];

    let timer;

    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, displayedText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span style={{ display: 'inline-block', position: 'relative', color, ...style }}>
      {displayedText}
      <span
        style={{
          display: 'inline-block',
          marginLeft: '2px',
          width: '3px',
          height: '1em',
          verticalAlign: 'middle',
          backgroundColor: cursorColor,
          animation: 'cursorBlink 1s infinite'
        }}
      />
    </span>
  );
};

export default TypewriterText;
