import useGameStore from '@/stores/gameState';

export default function handleEvent(event: string, data: any, user: string) {
  const {
    callSet,
    requestNewRow,
    selectCard,
    addPlayer,
    startOnlineGame,
    markPlayerReady,
  } = useGameStore.getState().actions;

  switch (event) {
    case 'CARD': {
      selectCard(data);
      break;
    }

    case 'SET': {
      callSet(data);
      break;
    }

    case 'NEW_ROW': {
      requestNewRow(data);
      break;
    }

    case 'JOIN': {
      addPlayer(data);
      break;
    }

    case 'GAME_START': {
      startOnlineGame();
      break;
    }

    case 'READY': {
      markPlayerReady(data);
      break;
    }

    default:
      break;
  }
}
