import * as React from 'react';
import styles from './MiniSet.module.css';
import CardElement from '../Card/Card';
import type { Card as CardType } from '@/types';
import { motion } from 'framer-motion';
import { heavySpring, spring } from '@/utils/motionObjects';

const mediumSpring = {
  type: 'spring',
  stiffness: 290,
  damping: 14,
  mass: 0.75,
};

const backSpring = {
  type: 'spring',
  damping: 20,
  stiffness: 300,
  mass: 0.75,
};

function MiniSet({ cards }: { cards: Array<CardType> }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.span
      onHoverStart={() => {
        setIsHovered(true);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
      }}
      onTap={() => setIsHovered((prev) => !prev)}
      whileHover={{ height: '135px', transform: 'rotate(0deg)' }}
      className={styles.miniSet}
    >
      {cards.map((card, index) => (
        <motion.span
          key={index}
          initial={{
            bottom: `-400px`,
            left: (-1 + index) * Math.random() * 15 + '%',
            position: index ? 'absolute' : 'relative',
            transform: `rotate(${90 + (-1 + index) * Math.random() * 8}deg)`,
            y: 400,
          }}
          animate={
            isHovered
              ? {
                  bottom: index * 46 + 'px',
                  left: '0px',
                  position: 'absolute',
                  transform: `rotate(0deg)`,
                  transition: { ...mediumSpring, delay: (2 - index) * 0.03 },
                }
              : {
                  bottom: `${(0.5 - Math.random()) * 4}px`,
                  left: (-1 + index) * Math.random() * 15 + '%',
                  position: index ? 'absolute' : 'relative',
                  transform: `rotate(${
                    90 + (-1 + index) * Math.random() * 8
                  }deg)`,
                  transition: { ...backSpring, delay: index * 0.05 }, // Add 2.5 seconds to the delay
                  y: 0,
                }
          }
          className={styles.miniCard}
        >
          <CardElement card={card} />
        </motion.span>
      ))}
      <div className={styles.glow} />
    </motion.span>
  );
}

export default React.memo(MiniSet);
