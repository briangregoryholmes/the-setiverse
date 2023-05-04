import React, {
  useState,
  memo,
  useEffect,
  useCallback,
  useRef,
  RefObject,
  PropsWithChildren,
} from 'react';
import styles from './JoinGameModal.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameActions } from '@/stores/gameState';
import { emojiPages } from '@/utils/constants';
import { shuffleArray } from '@/utils/misc';
import { EmojiId, Emoji } from '@/types';
import { appear, heavySpring, spring } from '@/utils/motionObjects';
import { useConnectionStatus } from '@/stores/gameState';

function JoinGameModal() {
  const { joinGame, displayModal, updateConnectionStatus } = useGameActions();
  const status = useConnectionStatus();
  const [selected, setSelected] = useState<Array<Emoji>>([]);
  const pageNumber = selected.length;

  // Listen for escape and backspace keys to close modal or delete emoji
  const dismissModal = useCallback(() => {
    setSelected([]);
    displayModal(false);
  }, [setSelected, displayModal]);

  useEffect(() => {
    if (status === 'connected') {
      setTimeout(() => {
        dismissModal();
      }, 1000);
    } else if (status === 'error') {
      setTimeout(() => {
        setSelected([]);
        updateConnectionStatus('disconnected');
      }, 1500);
    }
  }, [status, dismissModal, setSelected, updateConnectionStatus]);

  function handleClick(emoji: Emoji) {
    if (selected.length >= 4) return;
    const newSelected = [...selected, emoji];
    setSelected(newSelected);
    if (newSelected.length === 4) {
      joinGame(newSelected as EmojiId);
    }
  }

  const onBackspace = useCallback(() => {
    setSelected((prev) => {
      if (prev.length === 0) return prev;
      return prev.slice(0, -1);
    });
  }, []);

  useEffect(() => {
    function listeners(e: KeyboardEvent) {
      if (e.key === 'Backspace') {
        onBackspace();
      }
    }
    window.addEventListener('keydown', listeners);
    return () => window.removeEventListener('keydown', listeners);
  }, [dismissModal, onBackspace]);

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.text}>Select Four Emoji to Join Room</h5>
      <EmojiField selected={selected} />
      <EmojiGrid pageNumber={pageNumber} handleClick={handleClick} />
    </div>
  );
}

export default memo(JoinGameModal);

const ModalWrapper = React.forwardRef<HTMLElement, PropsWithChildren<{}>>(
  (props, ref) => {
    return (
      <motion.aside
        ref={ref}
        layout
        initial={{ opacity: 0, x: -1000, scale: 0.5 }}
        animate={{ opacity: 1, x: 0, transition: heavySpring, scale: 1 }}
        exit={{
          opacity: 0,
          x: 1000,
          scale: 0.5,
          transition: heavySpring,
        }}
        className={styles.modalWrapper}
      >
        {props.children}
      </motion.aside>
    );
  }
);

ModalWrapper.displayName = 'ModalWrapper';

function EmojiGrid({
  pageNumber,
  handleClick,
}: {
  pageNumber: number;
  handleClick: (EMOJI: Emoji) => void;
}) {
  const status = useConnectionStatus();
  const page = React.useMemo(
    () => shuffleArray(emojiPages[pageNumber]),
    [pageNumber]
  );

  return (
    <article className={styles.emojigrid}>
      {page.map((EMOJI, index) => (
        <AnimatePresence key={index} mode={'wait'}>
          <motion.span
            className={styles.emoji}
            key={String(EMOJI.codePointAt(0))}
            layoutId={String(EMOJI.codePointAt(0))}
            animate={status === 'error' ? 'rotate' : 'appear'}
            exit={{
              scale: 0,
              transition: heavySpring,
            }}
            onTap={() => handleClick(EMOJI)}
            whileTap={{ scale: 0.9 }}
            whileHover={{
              scale: 1.2,
              rotate: -10,
            }}
            transition={spring}
            variants={{
              appear,
              rotate: { rotate: 180 },
            }}
          >
            {EMOJI}
          </motion.span>
        </AnimatePresence>
      ))}
    </article>
  );
}

function EmojiField({ selected }: { selected: Emoji[] }) {
  return (
    <span className={styles.selectedEmoji}>
      {selected.map((EMOJI, index) => (
        <motion.span
          id={EMOJI}
          layoutId={String(EMOJI.codePointAt(0))}
          initial={{ x: 0, y: 0 }}
          animate={{
            x: [0, 100, 0],
            y: [0, 100, 100, 100, 100, 0],
            scale: [1, 2, 1],
            transition: { duration: 0.5 },
          }}
          key={EMOJI}
          className={styles.fieldEmoji}
        >
          {EMOJI}
        </motion.span>
      ))}
    </span>
  );
}
