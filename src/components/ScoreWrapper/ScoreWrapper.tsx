import * as React from 'react';
import styles from './ScoreWrapper.module.css';
import Score from '../Score/Score';
import { useScoreBoard, useUsername, useSocket } from '@/stores/gameState';

function ScoreWrapper() {
  const scoreBoard = useScoreBoard();
  const user = useUsername();
  const socket = useSocket();

  const orderedScoreBoard = Object.keys(scoreBoard).sort((a, b) => {
    if (scoreBoard[a].found > scoreBoard[b].found) return -1;
    if (scoreBoard[a].found < scoreBoard[b].found) return 1;
    return 0;
  });

  // Local user last
  const localuserLast = orderedScoreBoard.sort((a, b) => {
    if (a === user.name) return 1;
    if (b === user.name) return -1;
    return 0;
  });

  return (
    <div className={styles.wrapper}>
      {localuserLast.map((key) => (
        <Score key={key} name={key} setsFound={scoreBoard[key].found} />
      ))}
    </div>
  );
}

export default ScoreWrapper;
