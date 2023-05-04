import { useEffect, useState } from 'react';
import handleSocket from '../handleSocket';
import { toast } from 'react-hot-toast';
import {
  useGameActions,
  useEmojiId,
  useUsername,
  useDeckSeed,
} from '@/stores/gameState';
import { Event } from '@/types';

function messageListener(socketEvent: MessageEvent) {
  const { user, event, data } = JSON.parse(socketEvent.data);
  handleSocket(event, data, user);
}

const useSocketEventListener = (socket: WebSocket | null) => {
  const user = useUsername();
  const { updateConnectionStatus, leaveGame, sendSocket, createServerRoom } =
    useGameActions();
  const [listening, setListening] = useState(false);
  const seed = useDeckSeed();
  const emojiId = useEmojiId();

  useEffect(() => {
    if (socket && !listening) {
      // Add event listener for open
      socket.addEventListener('open', () => {
        // Display successful connection message
        toast.success('Joined game ' + emojiId?.join(''));

        // Update connection status in the store
        updateConnectionStatus('connected');

        // Send join event to server
        sendSocket(Event.JOIN, user.name);

        // If you are the first player, create a new room
        if (!seed) createServerRoom();

        // Add event listener for messages
        socket.addEventListener('message', messageListener);
        setListening(true);

        // Add event listener for close
        socket.addEventListener('close', () => {
          //Display disconnected message
          toast.error('Disconnected from server');

          // Update connection status in the store
          updateConnectionStatus('disconnected');
        });
      });

      // Add event listener for error
      socket.addEventListener('error', () => {
        // Display error message
        toast.error('Error connecting to server');

        updateConnectionStatus('error');
        // setTimeout(() => {
        //   updateConnectionStatus('disconnected');
        // }, 0);
        leaveGame();
      });
    }
  }, [
    socket,
    updateConnectionStatus,
    emojiId,
    user,
    sendSocket,
    leaveGame,
    createServerRoom,
    listening,
    seed,
  ]);
};

export default useSocketEventListener;
