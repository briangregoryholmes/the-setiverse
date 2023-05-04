type Props = [selected: Array<number>, tableSets: Set<string>];

export default function checkGuess(...props: Props) {
  const [selected, tableSets] = props;

  const guessedSet = selected.sort((a, b) => a - b).join('-');

  return tableSets.has(guessedSet);
}
