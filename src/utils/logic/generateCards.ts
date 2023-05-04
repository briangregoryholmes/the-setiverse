import type { Card, Deck } from '@/types';
import { NUMBERS, COLORS, FILLS, SHAPES } from '../constants';

export default function generateCards(): Deck {
  const deck: Deck = [];
  let id = 1;

  NUMBERS.forEach((number) => {
    COLORS.forEach((color) => {
      FILLS.forEach((fill) => {
        SHAPES.forEach((shape) => {
          deck.push({ id, number, color, fill, shape } as Card);
          id++;
        });
      });
    });
  });

  return deck;
}
