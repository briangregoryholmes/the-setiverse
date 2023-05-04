import {
  PageOneEmoji,
  PageFourEmoji,
  PageThreeEmoji,
  PageTwoEmoji,
} from '@/types';

export const NUMBERS = ['1', '2', '3'];
export const COLORS = ['primary', 'secondary', 'tertiary'];
export const FILLS = ['solid', 'hatched', 'void'];
export const SHAPES = ['pill', 'squiggle', 'diamond'];

export const options = {
  number: ['1', '2', '3'],
  color: ['primary', 'secondary', 'tertiary'],
  fill: ['solid', 'hatched', 'void'],
  shape: ['pill', 'squiggle', 'diamond'],
  id: Array(81)
    .fill(0)
    .map((_, i) => i + 1),
};

export const strokeWidth = 2;

//prettier-ignore
export const arr1: PageOneEmoji[] = ['🦷', '👑', '🚀', '🐢', '🐳', '🐸', '🍁', '💡', '🐘', '🌵', '🍔', '🍟']
export const arr2: PageTwoEmoji[] = [
  '🧦',
  '🧠',
  '🐍',
  '🦉',
  '🦆',
  '🐌',
  '🌽',
  '🧀',
  '🪑',
  '🔑',
  '🍄',
  '🌞',
];
export const arr3: PageThreeEmoji[] = [
  '🐝',
  '🐣',
  '🐷',
  '🌈',
  '🪨',
  '🔥',
  '🍎',
  '🍊',
  '🍌',
  '🥑',
  '🥨',
  '🍕',
];
export const arr4: PageFourEmoji[] = [
  '📬',
  '🌳',
  '🧼',
  '💎',
  '🥦',
  '🍩',
  '🎲',
  '🛹',
  '🚗',
  '🛩️',
  '📺',
  '📸',
];

const allThumbs = Array(12).fill('👍');

export const emojiPages = [arr1, arr2, arr3, arr4, allThumbs];
