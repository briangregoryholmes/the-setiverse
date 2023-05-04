import React, {
  useState,
  memo,
  useEffect,
  useCallback,
  useRef,
  RefObject,
  PropsWithChildren,
} from 'react';
import type { Ref } from 'react';
import styles from './Modal.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket, useGameActions } from '@/stores/gameState';
import FocusLock from 'react-focus-lock';
import { XCircle } from 'react-feather';
import BackgroundBlur from '../BackgroundBlur';
import { appear, heavySpring, spring } from '@/utils/motionObjects';
import { useModalVisible, useConnectionStatus } from '@/stores/gameState';
import HowToModal from './HowToModal/HowToModal';
import JoinGameModal from './JoinGameModal/JoinGameModal';
function useOnClickOutside(ref: RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default function Modal(props: PropsWithChildren<{}>) {
  const { displayModal } = useGameActions();
  const modalVisible = useModalVisible();
  const ref: RefObject<HTMLElement> = useRef(null);

  // Listen for escape and backspace keys to close modal or delete emoji
  const dismissModal = useCallback(() => {
    displayModal(false);
  }, [displayModal]);

  useOnClickOutside(ref, () => displayModal(false));

  useEffect(() => {
    function listeners(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        dismissModal();
      }
    }
    window.addEventListener('keydown', listeners);
    return () => window.removeEventListener('keydown', listeners);
  }, [dismissModal]);

  return (
    <AnimatePresence>
      {modalVisible && (
        <>
          <BackgroundBlur dismissModal={dismissModal} />
          <ModalWrapper ref={ref}>
            <FocusLock autoFocus={false}>
              <button onClick={dismissModal} className={styles.quit}>
                <XCircle />
              </button>
              {modalVisible === 'join' ? <JoinGameModal /> : <HowToModal />}
            </FocusLock>
          </ModalWrapper>
        </>
      )}
    </AnimatePresence>
  );
}

const ModalWrapper = React.forwardRef<HTMLElement, PropsWithChildren<{}>>(
  (props, ref) => {
    return (
      <motion.aside
        ref={ref}
        layout
        initial={{ opacity: 0, left: -1000, scale: 0.5 }}
        animate={{ opacity: 1, left: 0, transition: heavySpring, scale: 1 }}
        exit={{
          opacity: 0,
          left: 1000,
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
