import { Server } from '@/stores/gameState';
import { arr1, arr2, arr3, arr4 } from '@/utils/constants';

// Make type of card that extends the object type and has strings as keys
export interface Card {
  id: number;
  number: SetNumber;
  color: SetColor;
  fill: SetFill;
  shape: SetShape;
}

export type SetNumber = '1' | '2' | '3';
export type SetColor = 'primary' | 'secondary' | 'tertiary';
export type SetFill = 'solid' | 'hatched' | 'void';
export type SetShape = 'pill' | 'squiggle' | 'diamond';

export interface LambdaResponse {
  server: Server;
  players: string[];
  gameId: string;
  seed: number;
}

export interface FoundSet {
  timeToFind: number;
  cards: Array<Card>;
}

//prettier-ignore
export type PageOneEmoji = '🦷' | '👑' | '🚀' | '🐢'| '🐳'| '🐸'| '🍁' | '💡' | '🐘' | '🌵'| '🍔' | '🍟'
//prettier-ignore
export type PageTwoEmoji = '🧦' | '🧠' | '🐍' | '🦉' | '🦆' | '🐌' | '🌽' | '🧀' | '🪑' | '🔑' | '🍄' | '🌞'
//prettier-ignore
export type PageThreeEmoji =  '🐝' | '🐣' | '🐷' | '🌈' | '🪨' | '🔥' | '🍎' | '🍊' | '🍌' | '🥑' | '🥨' | '🍕'
//prettier-ignore
export type PageFourEmoji =   '📬' | '🌳' | '🧼' | '💎' | '🥦' | '🍩' | '🎲' | '🛹' | '🚗' | '🛩️' | '📺' | '📸'

export type EmojiId = [
  PageOneEmoji,
  PageTwoEmoji,
  PageThreeEmoji,
  PageFourEmoji
];
export type EmojiPage =
  | PageOneEmoji[]
  | PageTwoEmoji[]
  | PageThreeEmoji[]
  | PageFourEmoji[];
export type Emoji =
  | PageOneEmoji
  | PageTwoEmoji
  | PageThreeEmoji
  | PageFourEmoji;

export type EmojiOptions = [
  PageOneEmoji[],
  PageTwoEmoji[],
  PageThreeEmoji[],
  PageFourEmoji[]
];

export interface User {
  name: string;
  auth: boolean;
}

export interface PlayerData {
  ready: boolean;
  found: Array<FoundSet>;
}

export type ScoreBoard = Record<string, PlayerData>;

export interface CursorPosition {
  x: number;
  y: number;
}

export type Data = CursorPosition | number | null | string;

// Holds all possible cards
export type Deck = Array<Card>;

// Set of three Cards whose parameters are all different or all the same
export type CardSet = Set<Card>;
export type CardSetString = string;

// The current set of cards on the table
// Extends Deck so that it can be used as a Deck
export type CardsOnTable = Deck;

// The current CardSets on the table
export type SetsOnTable = Set<CardSetString>;

export type FoundByPlayer = Set<CardSet>;

export interface Selected {
  [key: number]: true | false | null;
  length: number;
}

export enum Actions {
  ROW = 'ROW',
  SET = 'SET',
  BOARD = 'BOARD',
}

export enum Event {
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
  CARD = 'CARD',
  SET = 'SET',
  NEW_ROW = 'NEW_ROW',
  CURSOR = 'CURSOR',
  GAME_START = 'GAME_START',
  READY = 'READY',
}

// Properties that are keys of Card
export type property = keyof Card;

// Properties that are keys of Card
export type Properties = Array<property>;

export type Stats = {
  totalSetsFound: number;
  averageTimeToFind: number;
  gamesPlayed: number;
  mostCommonCard: string;
  fastestTime: number;
};
