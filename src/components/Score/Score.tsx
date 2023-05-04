import styles from './Score.module.css';
import type { FoundSet } from '@/types';
import MiniSet from '../MiniSet/MiniSet';
import { AnimatePresence, motion } from 'framer-motion';
import IncrementingNumber from '../IncrementingNumber/IncrementingNumber';
import { useUsername } from '@/stores/gameState';

export default function Score({
  setsFound,
  name,
}: {
  setsFound: Array<FoundSet>;
  name: string;
}): JSX.Element {
  const last5 = setsFound.slice(-3);
  const user = useUsername();

  return (
    <div className={styles.display}>
      <p className={styles.name}>{name + ': '}</p>
      {(setsFound.length > 3 || name !== user.name) && (
        <div className={styles.circle}>
          <IncrementingNumber value={setsFound.length} />
        </div>
      )}
      {name == user.name && (
        <AnimatePresence>
          {last5.map(({ cards }, index) => {
            return (
              <motion.div
                exit={{ y: 100, scale: 0, transition: { delay: 1 } }}
                layoutId={JSON.stringify(cards)}
                className={styles.wrapper}
                key={JSON.stringify(cards)}
              >
                <MiniSet cards={cards} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      )}
    </div>
  );
}
