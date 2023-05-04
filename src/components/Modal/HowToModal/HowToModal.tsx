import * as React from 'react';
import styles from './HowToModal.module.css';
import Card from '../../Card/Card';
import type { Card as CardType } from '@/types';
import Rules from '../../Rules/Rules';
import { AnimatePresence, motion } from 'framer-motion';
import { findMatchingThird } from '@/utils/logic/determineSets';
import { tilt, enter, heavySpring } from '@/utils/motionObjects';
import { generateCards } from '@/utils/logic';
import { determineSets } from '@/utils/logic';

const deck = generateCards();

function HowToModal() {
  return (
    <div className={styles.wrapper}>
      <h1>How to Play</h1>
      <Rules />
      <div className={styles.setWrapper}>
        <CardGroup />
      </div>
    </div>
  );
}

export default HowToModal;

export function CardGroup() {
  function randomSetGenerator() {
    const randomSetIDs = new Set<number>();
    while (randomSetIDs.size < 3) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      randomSetIDs.add(randomIndex);
    }
    return Array.from(randomSetIDs).map((id) => deck[id]);
  }
  const [currentCards, setCurrentCards] = React.useState<Array<CardType>>(
    randomSetGenerator()
  );

  function replaceWithThird(index: number) {
    if (isASet) {
      setCurrentCards(randomSetGenerator());
      return;
    }
    const otherTwoCards = currentCards.filter((_, i) => i !== index);
    const thirdCard = findMatchingThird(otherTwoCards[0], otherTwoCards[1]);
    if (thirdCard) {
      setCurrentCards((current) => {
        const newCards = [...current];
        newCards[index] = thirdCard;
        return newCards;
      });
    }
  }
  const [isASet, setIsASet] = React.useState(false);
  function onComplete() {
    setIsASet(determineSets(currentCards).size > 0);
  }
  return (
    <div className={styles.exampleWrapper}>
      <p className={styles.text}>
        {isASet ? 'THIS IS A SET!' : `This is not a set.`}
      </p>

      <div className={styles.cardGroup}>
        {currentCards.map((card, index) => (
          <AnimatePresence key={index} mode="wait">
            <motion.button
              onAnimationComplete={() => onComplete()}
              initial={{ x: 400 + 400 * index }}
              exit={isASet ? tilt : { x: -1200 }}
              animate={enter}
              transition={heavySpring}
              className={styles.card}
              key={JSON.stringify(card)}
              onTap={() => replaceWithThird(index)}
            >
              <Card card={card} />
            </motion.button>
          </AnimatePresence>
        ))}
      </div>

      <p className={styles.clickText}>
        {isASet ? 'Tap for a new example.' : 'Tap a card to make it one.'}
      </p>
    </div>
  );
}
