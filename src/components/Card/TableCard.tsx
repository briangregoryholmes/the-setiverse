'use client';
import styles from './Card.module.css';
import { Card, Event } from '@/types';
import { useSelected, useGameActions } from '@/stores/gameState';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, memo } from 'react';
import { CardElement } from './Card';
import { shakeMotion } from '@/utils/motionObjects';
import { enter, tilt, bouncySpring } from '@/utils/motionObjects';

interface CardProps {
  position: number;
  card: Card;
  enabled: boolean;
}

function CardComponent({ position, card, enabled }: CardProps) {
  const selected = useSelected(position);
  const controls = useAnimation();

  const { selectCard, sendSocket } = useGameActions();

  const handleCardClick = (e: MouseEvent) => {
    e.preventDefault();
    // If connected, send selection to server
    sendSocket(Event.CARD, position.toString());

    // If not connected, set local state
    selectCard(position);
  };

  useEffect(() => {
    if (selected === null) controls.start(shakeMotion);
    if (selected === 'found') controls.start(tilt);
  }, [controls, selected]);

  return (
    <motion.button
      initial={{ boxShadow: '0 0 0 black' }}
      className={`${styles.cardButton} ${
        selected
          ? enabled
            ? `${styles.chosen}`
            : `${styles.remoteChosen}`
          : null
      }`}
      animate={controls}
      whileTap={{ scale: 0.9, transition: bouncySpring }}
      disabled={!enabled}
      whileHover={
        selected
          ? {}
          : {
              scale: 1.1,
              rotate: 5 * (0.5 - Math.random()),
              boxShadow: 'var(--card-shadow)',
              zIndex: 60,
              transition: {
                type: 'spring',
                stiffness: 1000,
                damping: 26,
                mass: 3,
              },
            }
      }
      onTap={handleCardClick}
    >
      <CardElement card={card} />
    </motion.button>
  );
}

export default memo(CardComponent);
