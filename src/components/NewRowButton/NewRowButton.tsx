import {
  useGameActions,
  useTableSets,
  useSocket,
  useRowRequests,
  useScoreBoard,
  useOnTable,
  useCurrentDeck,
} from '@/stores/gameState';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components';
import { toast } from 'react-hot-toast';
import styles from './NewRowButton.module.css';

function NewRowButton() {
  const rowRequests = useRowRequests();
  const score = useScoreBoard();
  const socket = useSocket();
  const tableSets = useTableSets();
  const { requestNewRow, clearRowRequests } = useGameActions();
  const { addNewRow } = useGameActions();
  const percentage = rowRequests.size / Object.keys(score).length;

  const newRow = useCallback(() => {
    addNewRow();
    if (!tableSets.size) {
    } else {
      toast.error("There's a set!");
    }
    if (socket) clearRowRequests();
  }, [tableSets, addNewRow, socket, clearRowRequests]);

  useEffect(() => {
    if (rowRequests.size && percentage > 0.5) {
      newRow();
    }
  }, [rowRequests, score, newRow, percentage]);

  return (
    <Button
      color="secondary"
      unanimous={percentage}
      enabled={true}
      text="New Row"
      func={socket ? () => requestNewRow() : newRow}
    />
  );
}

export default NewRowButton;
