import { useEffect, memo } from 'react';
import { Table, CallSetButton, NewRowButton } from '@/components';
import {
  useGameActions,
  useSocket,
  useActivePlayer,
  useUsername,
  useGameStarted,
  useScoreBoard,
  useTableSets,
  useCurrentDeck,
} from '@/stores/gameState';
import styles from './game.module.css';
import { useDeckSeed } from '@/stores/gameState';
import { NewGameButton } from '@/components';
import Waiting from '@/components/Waiting/Waiting';
import { toast } from 'react-hot-toast';
function Game() {
  // Grab relevant state from store
  const socket = useSocket();
  const activePlayer = useActivePlayer();
  const user = useUsername();
  const deckSeed = useDeckSeed();
  const gameStarted = useGameStarted();
  const tableSets = useTableSets();
  const scoreBoard = useScoreBoard();
  const currentDeck = useCurrentDeck();

  // Grab relevant actions
  const { startLocalGame, addPlayer, clearScoreBoard } = useGameActions();

  // Enable table if local user is active player
  // Or when there is no socket (local game)
  const enabled = activePlayer === user.name || !socket;

  // // Add local user to game when username is set
  useEffect(() => {
    clearScoreBoard();
    if (user) {
      addPlayer(user.name);
    }
  }, [user, addPlayer, clearScoreBoard]);

  // // Start game on mount
  useEffect(() => {
    if (!deckSeed && !socket) startLocalGame();
  }, [deckSeed, startLocalGame, socket]);

  useEffect(() => {
    if (gameStarted && currentDeck.length === 0 && tableSets.size === 0) {
      toast.success('You found all the sets!', { duration: 5000, icon: '🎉' });
    }
  }, [currentDeck, tableSets, gameStarted]);

  return (
    <>
      <section className={styles.main}>
        {!gameStarted && socket ? (
          <Waiting scoreBoard={scoreBoard} />
        ) : (
          <Table enabled={enabled} />
        )}
        <div className={styles.buttonWrapper}>
          {socket && gameStarted && <CallSetButton />}
          {currentDeck.length > 0 && gameStarted && <NewRowButton />}
          {currentDeck.length === 0 && tableSets.size === 0 && (
            <NewGameButton />
          )}
        </div>
      </section>
    </>
  );
}

export default memo(Game);
