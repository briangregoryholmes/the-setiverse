import * as React from 'react';
import styles from './MostCommonCardVisualizer.module.css';
import StatWrapper from '../StatWrapper';
import { Card } from '@/components/index';
import { Card as CardType } from '@/types';

function MostCommonCardVisualizer({ card }: { card: CardType }) {
  return (
    <StatWrapper title={'Most Common Card'}>
      <div className={styles.wrapper}>
        <Card card={card} enabled={false} position={0} />
      </div>
    </StatWrapper>
  );
}

export default MostCommonCardVisualizer;
