import * as React from 'react';
import styles from './Waiting.module.css';
import Button from '../Button/Button';
import { Event, ScoreBoard } from '@/types';
import { useGameActions, useUsername } from '@/stores/gameState';
import { motion } from 'framer-motion';

function Waiting({ scoreBoard }: { scoreBoard: ScoreBoard }) {
  const { startOnlineGame, sendSocket, markPlayerReady } = useGameActions();
  const user = useUsername();

  function markReady() {
    sendSocket(Event.READY, user.name);
    markPlayerReady(user.name);
  }

  function startGame() {
    sendSocket(Event.GAME_START, null);
    setTimeout(() => startOnlineGame(), 4);
  }
  const allPlayersReady = Object.values(scoreBoard).every(({ ready }) => ready);
  const playersNotReady = Object.values(scoreBoard).reduce((acc, { ready }) => {
    if (!ready) acc++;
    return acc;
  }, 0);

  return (
    <div className={styles.wrapper}>
      <h1>Waiting for {playersNotReady} players</h1>
      <div className={styles.waiting}>
        {Object.entries(scoreBoard).map(([name, { ready }], index) => (
          <PlayerStatus key={name + index} name={name} ready={ready} />
        ))}
      </div>
      {!scoreBoard[user.name].ready && (
        <Button enabled={true} text="I'm Ready" func={markReady} />
      )}
      {allPlayersReady && (
        <Button enabled={true} text="Start Game" func={startGame} />
      )}
    </div>
  );
}

export default Waiting;

function PlayerStatus({ name, ready }: { name: string; ready: boolean }) {
  return (
    <div className={styles.playerStatus}>
      <div className={styles.name}>{name}</div>
      <LoadingStatus ready={ready} />
    </div>
  );
}

const LoadingStatus = ({ ready }: { ready: boolean }) => {
  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        yoyo: Infinity,
      },
    },
  };

  const checkmarkVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  const LoadingSvg = () => (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      fill="none"
      stroke="yellow"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );

  const CheckmarkSvg = () => (
    <svg
      width="2rem"
      height="2rem"
      viewBox="0 0 24 24"
      fill="none"
      stroke="green"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );

  return (
    <div>
      {ready ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={checkmarkVariants}
        >
          <CheckmarkSvg />
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={loadingVariants}
        >
          <LoadingSvg />
        </motion.div>
      )}
    </div>
  );
};
