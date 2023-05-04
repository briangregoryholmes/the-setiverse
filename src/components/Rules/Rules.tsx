import * as React from 'react';
import styles from './Rules.module.css';

function Rules() {
  return (
    <ul className={styles.rules}>
      <li>
        SET is a fast-paced, pattern matching card game that uses a special deck
        of 81 unique cards, each featuring a combination of four features:
      </li>
      <li>
        <div className={styles.features}>
          <span className={styles.emphasis}> color</span>
          <span className={styles.emphasis}>shape</span>
          <span className={styles.emphasis}>number</span>
          <span className={styles.emphasis}>fill</span>
        </div>
      </li>
      <li className={styles.primary}>
        A set consists of three cards where these features are either{' '}
        <em>all the same</em> OR <em>all different</em>.
      </li>
      <li>
        {`There are no turns. Players continuously look for cards, calling "Set!,"
        when they believe they've found one.`}
      </li>
      <li>
        {`If a player thinks there are no sets on the table, they can
        request a new row.`}
      </li>
      <li>
        The game ends when the deck is empty and there are no more sets on the
        table. The player with the most collected cards wins!
      </li>
    </ul>
  );
}

export default Rules;
