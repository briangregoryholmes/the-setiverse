import * as React from 'react';
import styles from './BackgroundBlur.module.css';
import { motion } from 'framer-motion';

export function BackgroundBlur({ dismissModal }: { dismissModal: () => void }) {
  return (
    <motion.div
      onClick={dismissModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className={styles.background}
    ></motion.div>
  );
}

export default BackgroundBlur;
