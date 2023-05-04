import * as React from 'react';
import styles from './CallSetButton.module.css';
import { Button } from '@/components';
import {
  useActivePlayer,
  useRowRequests,
  useGameActions,
  useUsername,
} from '@/stores/gameState';
import { Event } from '@/types';

function CallSetButton() {
  const active = useActivePlayer();
  const user = useUsername();
  const rowRequests = useRowRequests();
  const { sendSocket, callSet } = useGameActions();

  function callSetFunc() {
    callSet();
    sendSocket(Event.SET, user.name);
  }

  return (
    <Button
      color="primary"
      enabled={active === null}
      text={active && active !== true ? `${active} called set` : 'Call Set'}
      func={callSetFunc}
    />
  );
}

export default CallSetButton;
