import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  charDelay?: number;
  style?: React.CSSProperties;
}

const TextReveal = ({
  text,
  className = '',
  delay = 0,
  once = true,
  as: Tag = 'div',
  charDelay = 0.03,
  style,
}: TextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  const words = text.split(' ');

  return (
    <Tag className={className} style={style} ref={ref as any}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block">
          {word.split('').map((char, charIdx) => {
            const totalIdx = words.slice(0, wordIdx).join(' ').length + charIdx;
            return (
              <motion.span
                key={`${wordIdx}-${charIdx}`}
                className="inline-block"
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 20, filter: 'blur(4px)' }
                }
                transition={{
                  duration: 0.4,
                  delay: delay + totalIdx * charDelay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {wordIdx < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
};

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  wordDelay?: number;
  style?: React.CSSProperties;
}

export const WordReveal = ({
  text,
  className = '',
  delay = 0,
  once = true,
  as: Tag = 'div',
  wordDelay = 0.08,
  style,
}: WordRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  const words = text.split(' ');

  return (
    <Tag className={className} style={style} ref={ref as any}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          className="inline-block mx-1"
          initial={{ opacity: 0, y: 30, rotateX: -90 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, rotateX: 0 }
              : { opacity: 0, y: 30, rotateX: -90 }
          }
          transition={{
            duration: 0.5,
            delay: delay + idx * wordDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
};

export default TextReveal;
