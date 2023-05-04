import generateCards from './generateCards';
import shuffleDeck from './shuffleDeck';
import determineSets from './determineSets';
import deal from './deal';
import { Actions } from '@/types';

export default function newGame(seed = Math.random()) {
  const deck = shuffleDeck(generateCards(), seed);
  const { newTable, newDeck } = deal(deck, [], Actions.BOARD);
  const sets = determineSets(newTable);
  return { newTable, newDeck, sets };
}
