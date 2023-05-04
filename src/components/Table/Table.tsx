import styles from './Table.module.css';
import { Card as CardComponent } from '@/components/index';
import { useOnTable } from '@/stores/gameState';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { enter, heavySpring } from '@/utils/motionObjects';
function Table({ enabled }: { enabled: boolean }) {
  const cardsOnTable = useOnTable();

  return (
    <div className={styles.table}>
      {cardsOnTable.map((card, index) => {
        return (
          <motion.span
            initial={{ x: 1200 }}
            animate={{
              x: 0,
              transition: {
                type: 'spring',
                damping: 28,
                stiffness: 250,
                delay: Math.random() * 0.8,
              },
            }}
            key={card.id}
            layoutId={card.id.toString()}
            transition={{ ...heavySpring, delay: index * 0.15 }}
          >
            <CardComponent
              key={card.id}
              enabled={enabled}
              position={index + 1}
              card={card}
            />
          </motion.span>
        );
      })}
    </div>
  );
}

export default memo(Table);
