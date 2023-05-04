import { useEffect, useState } from 'react';
import styles from './TimeToFindVisualizer.module.css';
import { StatWrapper } from '@/components/index';
import { motion, animate } from 'framer-motion';

function TimeToFindVisualizer({ time }: { time: string }) {
  const [counter, setCounter] = useState(0);
  //animate the nmbers
  useEffect(() => {
    const controls = animate(0, Number(time), {
      duration: 0.75,
      onUpdate(value) {
        setCounter(value);
      },
    });
  }, [time]);

  return (
    <StatWrapper title={'Average Time to Find'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, y: 20 }}
        className={styles.wrapper}
      >
        {counter.toFixed(2)} s
      </motion.div>
    </StatWrapper>
  );
}

export default TimeToFindVisualizer;
