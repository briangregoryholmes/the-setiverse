import * as React from 'react';
import styles from './TotalGamesVisualizer.module.css';
import StatWrapper from '../StatWrapper';

function TotalGamesVisualizer({ count }: { count: number }) {
  return <StatWrapper title={`${count} Games Played`}>{null}</StatWrapper>;
}

export default TotalGamesVisualizer;
