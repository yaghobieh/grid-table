import { useState, useEffect, useRef, useCallback } from 'react';

// ── Constants ────────────────────────────────────────
const DEFAULT_TYPING_SPEED = 40;
const DEFAULT_DELETE_SPEED = 25;
const DEFAULT_PAUSE_MS = 2500;

// ── Types ────────────────────────────────────────────
interface UseTypewriterOptions {
  texts: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
  loop?: boolean;
}

interface UseTypewriterReturn {
  displayed: string;
  isTyping: boolean;
  isDeleting: boolean;
  textIndex: number;
}

/**
 * useTypewriter — React 18 StrictMode-safe typewriter effect.
 *
 * Unlike the Bear Typewriter component, this hook resets its internal
 * `started` ref on cleanup so double-mount in dev works correctly.
 */
export function useTypewriter({
  texts,
  typingSpeed = DEFAULT_TYPING_SPEED,
  deleteSpeed = DEFAULT_DELETE_SPEED,
  pauseMs = DEFAULT_PAUSE_MS,
  loop = true,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayed, setDisplayed] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'paused' | 'deleting' | 'done'>('typing');
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const clear = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    const currentText = texts[textIdx] ?? '';

    if (phase === 'typing') {
      if (charIdx < currentText.length) {
        timerRef.current = setTimeout(() => {
          setDisplayed(currentText.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, typingSpeed);
      } else {
        // Finished typing this text — pause before deleting
        timerRef.current = setTimeout(() => setPhase('paused'), pauseMs);
      }
    }

    if (phase === 'paused') {
      if (texts.length === 1 && !loop) {
        setPhase('done');
        return;
      }
      setPhase('deleting');
    }

    if (phase === 'deleting') {
      if (charIdx > 0) {
        timerRef.current = setTimeout(() => {
          setCharIdx((c) => c - 1);
          setDisplayed(currentText.slice(0, charIdx - 1));
        }, deleteSpeed);
      } else {
        // Move to next text
        const next = textIdx + 1;
        if (next >= texts.length) {
          if (loop) {
            setTextIdx(0);
          } else {
            setPhase('done');
            return;
          }
        } else {
          setTextIdx(next);
        }
        setPhase('typing');
      }
    }

    return clear;
  }, [phase, charIdx, textIdx, texts, typingSpeed, deleteSpeed, pauseMs, loop, clear]);

  // Reset everything on unmount (StrictMode safe)
  useEffect(() => {
    return () => {
      clear();
      // These will be reset on next mount via initial state
    };
  }, [clear]);

  return {
    displayed,
    isTyping: phase === 'typing',
    isDeleting: phase === 'deleting',
    textIndex: textIdx,
  };
}
