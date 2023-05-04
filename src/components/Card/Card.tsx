'use client';
import styles from './Card.module.css';
import { Card } from '@/types';
import { memo } from 'react';
import ShapeContainer from './ShapeContainer';
import { motion, useAnimation } from 'framer-motion';
import { enter, tilt } from '@/utils/motionObjects';

const variants = { enter, tilt };

export function CardElement({ card }: { card: Card }) {
  const controls = useAnimation();

  return (
    <motion.div className={styles.cardElement}>
      <ShapeContainer card={card} />
    </motion.div>
  );
}

export default memo(CardElement);
