'use client';
import styles from './Card.module.css';
import { Card } from '@/types';
import { Diamond, Pill, Squiggle } from '../Shapes/index';
import { memo } from 'react';

function ShapeContainer({ card }: { card: Card }) {
  const shapeCount = Array(Number(card.number)).fill(true);
  const { color, shape, fill } = card;

  return (
    <div className={`${styles[fill]} ${styles[color]} ${styles.container}`}>
      {shapeCount.map((_, index) => {
        return shape === 'diamond' ? (
          <Diamond key={index} fill={fill} />
        ) : shape === 'squiggle' ? (
          <Squiggle key={index} fill={fill} />
        ) : (
          <Pill key={index} fill={fill} />
        );
      })}
    </div>
  );
}

export default memo(ShapeContainer);
