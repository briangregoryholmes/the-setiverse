import type { Deck } from '@/types';

export default function shuffleDeck(deck: Deck, seed: number) {
  const shuffledDeck = [...deck];
  var m = shuffledDeck.length,
    t,
    i;

  while (m) {
    i = Math.floor(random(seed) * m--);

    t = shuffledDeck[m];
    shuffledDeck[m] = shuffledDeck[i];
    shuffledDeck[i] = t;
    ++seed;
  }

  return shuffledDeck;
}

function random(seed: number) {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

interface JSONOBject {
  [key: string]: JSON;
}
