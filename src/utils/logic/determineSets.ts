import {
  Card,
  CardsOnTable,
  SetsOnTable,
  Properties,
  SetNumber,
  SetColor,
  SetFill,
  SetShape,
} from '@/types';
const properties: Properties = ['number', 'color', 'fill', 'shape', 'id'];
import { options } from '../constants';

export default function determineSets(cardsOnTable: CardsOnTable) {
  let sets = new Set() as SetsOnTable;
  let tableDictionary = {} as { [key: string]: number };
  cardsOnTable.forEach((card, index) => {
    let cardString = card.number + card.color + card.fill + card.shape;
    tableDictionary[cardString] = index;
  });

  for (let i = 0; i < cardsOnTable.length - 1; i++) {
    for (let j = i + 1; j < cardsOnTable.length; j++) {
      let card1 = cardsOnTable[i];
      let card2 = cardsOnTable[j];
      let card3 = {
        id: 0,
        number: '1',
        color: 'primary',
        fill: 'solid',
        shape: 'pill',
      } as Card;

      for (let property of properties) {
        if (card1[property] === card2[property]) {
          switch (property) {
            case 'number':
              card3.number = card1[property];
              break;
            case 'color':
              card3.color = card1[property];
              break;
            case 'fill':
              card3.fill = card1[property];
              break;
            case 'shape':
              card3.shape = card1[property];
              break;
          }
        } else {
          const optionsArray = options[property] as string[];
          switch (property) {
            case 'number':
              card3.number = optionsArray.find(
                (option) =>
                  option !== card1[property] && option !== card2[property]
              ) as SetNumber;
              break;
            case 'color':
              card3.color = optionsArray.find(
                (option) =>
                  option !== card1[property] && option !== card2[property]
              ) as SetColor;
              break;
            case 'fill':
              card3.fill = optionsArray.find(
                (option) =>
                  option !== card1[property] && option !== card2[property]
              ) as SetFill;
              break;
            case 'shape':
              card3.shape = optionsArray.find(
                (option) =>
                  option !== card1[property] && option !== card2[property]
              ) as SetShape;
              break;
          }
        }
      }
      let card3String = card3.number + card3.color + card3.fill + card3.shape;
      if (tableDictionary[card3String]) {
        sets.add(
          [i + 1, j + 1, tableDictionary[card3String] + 1]
            .sort((a, b) => a - b)
            .join('-')
        );
      }
    }
  }
  // console.log(sets);
  return sets;
}

export function findMatchingThird(cardOne: Card, cardTwo: Card) {
  // Return the third card that would make a set with the first two cards
  let cardThree = {
    id: 0,
    number: '1',
    color: 'primary',
    fill: 'solid',
    shape: 'pill',
  } as Card;

  for (let property of properties) {
    if (cardOne[property] === cardTwo[property]) {
      switch (property) {
        case 'number':
          cardThree.number = cardOne[property];
          break;
        case 'color':
          cardThree.color = cardOne[property];
          break;
        case 'fill':
          cardThree.fill = cardOne[property];
          break;
        case 'shape':
          cardThree.shape = cardOne[property];
          break;
      }
    } else {
      const optionsArray = options[property] as string[];
      switch (property) {
        case 'number':
          cardThree.number = optionsArray.find(
            (option) =>
              option !== cardOne[property] && option !== cardTwo[property]
          ) as SetNumber;
          break;
        case 'color':
          cardThree.color = optionsArray.find(
            (option) =>
              option !== cardOne[property] && option !== cardTwo[property]
          ) as SetColor;
          break;
        case 'fill':
          cardThree.fill = optionsArray.find(
            (option) =>
              option !== cardOne[property] && option !== cardTwo[property]
          ) as SetFill;
          break;
        case 'shape':
          cardThree.shape = optionsArray.find(
            (option) =>
              option !== cardOne[property] && option !== cardTwo[property]
          ) as SetShape;
          break;
      }
    }
  }
  return cardThree;
}
