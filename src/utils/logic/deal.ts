import { Deck, CardsOnTable, Actions } from '../../types';

const numbers = {
  BOARD: 12,
  ROW: 3,
  SET: 3,
};

export default function deal(
  fromDeck: Deck,
  cardsOnTable: CardsOnTable,
  action: Actions,
  toReplace: number[] = []
): { newTable: CardsOnTable; newDeck: Deck } {
  let newTable = [...cardsOnTable];
  const cardsToDeal = Math.min(fromDeck.length, numbers[action]);

  switch (action) {
    case Actions.ROW: {
      for (let i = 0; i < cardsToDeal; i++) {
        let card = fromDeck.pop();
        if (card) newTable.push(card);
      }
      break;
    }
    case Actions.SET: {
      if (cardsToDeal === 0) {
        newTable = newTable.filter(
          (card, index) => !toReplace.includes(index + 1)
        );
        break;
      }
      if (newTable.length > 12) {
        newTable = newTable.filter((card, index) => {
          const shouldKeep = !toReplace.includes(index + 1);

          return shouldKeep;
        });

        break;
      }
      for (let i = 0; i < cardsToDeal; i++) {
        const card = fromDeck.pop();
        if (card) newTable[toReplace[i] - 1] = card;
      }
      break;
    }
    case Actions.BOARD: {
      for (let i = 0; i < cardsToDeal; i++) {
        let card = fromDeck.pop();
        //console.log(card);
        if (card) newTable.push(card);
      }
      break;
    }
    default:
      break;
  }

  return { newTable, newDeck: fromDeck };
}
