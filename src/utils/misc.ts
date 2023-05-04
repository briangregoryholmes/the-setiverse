import { EmojiPage } from '@/types';

export function shuffleArray(array: EmojiPage): EmojiPage {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function arrayToBase64<T>(array: Array<T>) {
  const buffer = Buffer.from(array.join(''));
  const base64String = buffer.toString('base64');
  return base64String;
}
