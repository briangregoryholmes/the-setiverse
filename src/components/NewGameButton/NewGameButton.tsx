import { useGameActions, useSocket } from '@/stores/gameState';

import { Button } from '@/components';

function NewRowButton() {
  const { startLocalGame, startOnlineGame } = useGameActions();
  const socket = useSocket();

  return (
    <Button
      color="primary"
      enabled={true}
      text="New Game"
      func={socket ? startOnlineGame : startLocalGame}
    />
  );
}

export default NewRowButton;
