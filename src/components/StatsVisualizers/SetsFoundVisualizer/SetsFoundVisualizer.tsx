import * as React from 'react';
import styles from './SetsFoundVisualizer.module.css';
import { StatWrapper } from '@/components/index';
import { motion } from 'framer-motion';

function SetsFoundVisualizer({ count }: { count: number }) {
  return (
    <StatWrapper title={`${count} Sets Found`}>
      <motion.div className={styles.wrapper}>
        {Array(count)
          .fill(1)
          .map((_, index) => (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: 1,
                x: 0,
                //prettier ignore
                transition: { duration: 0.02 * index + 0.5 },
              }}
              exit={{ opacity: 0, y: 20 }}
              key={index}
              className={styles.score}
            ></motion.div>
          ))}
      </motion.div>
    </StatWrapper>
  );
}

export default SetsFoundVisualizer;
