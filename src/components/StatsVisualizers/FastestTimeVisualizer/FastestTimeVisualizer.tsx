import * as React from 'react';
import styles from './FastestTimeVisualizer.module.css';
import StatWrapper from '../StatWrapper';

function FastestTimeVisualizer({ time }: { time: string }) {
  return (
    <StatWrapper title={'Fastest Time'}>
      <div className={styles.wrapper}>{time} s</div>
    </StatWrapper>
  );
}

export default FastestTimeVisualizer;
