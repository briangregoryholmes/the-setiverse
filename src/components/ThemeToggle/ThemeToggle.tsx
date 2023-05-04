import * as React from 'react';
import styles from './ThemeToggle.module.css';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'react-feather';
import { useState, useEffect } from 'react';
function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <motion.button
      className={styles.themeButton}
      onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      style={
        theme === 'dark'
          ? { justifyContent: 'flex-end' }
          : { justifyContent: 'flex-start' }
      }
    >
      <div className={styles.channel}></div>
      <motion.div layout className={styles.themeButtonCircle}>
        {theme === 'dark' ? <Sun size={'13px'} /> : <Moon size={'13px'} />}
      </motion.div>
    </motion.button>
  );
}

export default ThemeToggle;
