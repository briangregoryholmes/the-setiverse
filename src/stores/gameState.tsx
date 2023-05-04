import { create } from 'zustand';
import { produce, enableMapSet } from 'immer';
import {
  Card,
  CardsOnTable,
  SetsOnTable,
  Data,
  ScoreBoard,
  FoundSet,
  Deck,
  User,
  Event,
  EmojiId,
} from '@/types';
import * as methods from '../utils/logic';
import checkGuess from '../utils/logic/checkGuess';
import { toast } from 'react-hot-toast';
import { Actions } from '../types';
import { arrayToBase64 } from '@/utils/misc';

const CALL_SET_DURATION = 3000;

enableMapSet();

class SelectedClass {
  [key: number]: true | null | 'found';
}

Object.defineProperty(SelectedClass.prototype, 'add', {
  value: function (position: number) {
    this[position] = true;
  },
  enumerable: false,
});

Object.defineProperty(SelectedClass.prototype, 'getLength', {
  value: function () {
    return Object.entries(this).filter(([_, status]) => status).length;
  },
  enumerable: false,
});

Object.defineProperty(SelectedClass.prototype, 'remove', {
  value: function (position: number) {
    delete this[position];
  },
  enumerable: false,
});

Object.defineProperty(SelectedClass.prototype, 'getSelections', {
  value: function () {
    // return all enumerable properties as an array
    const selectionsArray: Array<number> = [];
    for (let key in this) {
      if (this[key]) selectionsArray.push(Number(key));
    }
    return selectionsArray;
  },
  enumerable: false,
});

Object.defineProperty(SelectedClass.prototype, 'setShake', {
  value: function () {
    // Set all enumerable properties to null
    Object.entries(this).forEach(([position, _]) => {
      this[Number(position)] = null;
    });
    setTimeout(() => {
      Object.entries(this).forEach(([position, _]) => {
        delete this[Number(position)];
      });
    }, 50);
  },
  enumerable: false,
});

Object.defineProperty(SelectedClass.prototype, 'setFound', {
  value: function () {
    // Set all enumerable properties to null
    Object.entries(this).forEach(([position, _]) => {
      this[Number(position)] = 'found';
    });
  },
  enumerable: false,
});

interface Selected extends SelectedClass {
  add: (position: number) => void;
  remove: (position: number) => void;
  getLength: () => number;
  getSelections: () => Array<number>;
  setShake: () => void;
  setFound: () => void;
}
type ActivePlayer = string | null | true;
export type Server = 'alpha' | 'bravo' | 'charlie' | null;
export type ConnectionStatus =
  | 'connected'
  | 'disconnected'
  | 'connecting'
  | 'error';
export interface GameInterface {
  user: User;
  gameId: string | null;
  server: Server;
  socket: WebSocket | null;
  connectionStatus: ConnectionStatus;
  gameStarted: true | false;
  emojiId: EmojiId | null;
  deckSeed: number | null;
  waitingForPlayers: boolean;
  currentDeck: Deck;
  selected: Selected;
  cardsOnTable: CardsOnTable;
  setsOnTable: SetsOnTable;
  scoreBoard: ScoreBoard;
  rowRequests: Set<string>;
  activePlayer: ActivePlayer;
  lastSetFoundTime: number;
  modalVisible: 'join' | 'rules' | false;
  actions: {
    updateUser: (user: User) => void;
    updateActivePlayer: (user: string | null) => void;
    startLocalGame: () => void;
    startOnlineGame: () => void;
    callSet: (user?: string) => void;
    selectCard: (position: number) => void;
    collectSet: (
      cardPositions: Array<number>,
      activePlayer: ActivePlayer
    ) => void;
    requestNewRow: (username?: string) => void;
    addNewRow: () => void;
    clearRowRequests: () => void;
    markPlayerReady: (user: string) => void;
    expireSetCall: (timeToExpire: number) => void;
    clearScoreBoard: () => void;
    resetScoreBoard: () => void;
    createServerRoom: () => void;
    displayModal: (type: 'join' | 'rules' | false) => void;
    joinGame: (emojiId: EmojiId) => void;
    leaveGame: () => void;
    addPlayer: (user: string) => void;
    removePlayer: (user: string) => void;
    updateTable: (action: Actions, cards?: Array<number>) => void;
    sendSocket: (event: Event, data: Data) => void;
    updateConnectionStatus: (status: ConnectionStatus) => void;
  };
  setters: {
    setUser: (name: User) => void;
    setLastSetFoundTime: (time: number) => void;
    setSelected: (selections: Selected | null) => void;
    setTable: (cards: Array<Card>) => void;
    setDeck: (deck: Card[]) => void;
    setConnectionStatus: (status: ConnectionStatus) => void;
    setScoreBoard: (
      user: string | null,
      newSet: FoundSet | null,
      clear?: boolean
    ) => void;
    setGameId: (id: string) => void;
    setModal: (type: 'join' | 'rules' | false) => void;
    setSocket: (socket: WebSocket | null) => void;
    setGameStarted: (started: boolean) => void;
    setEmojiId: (emojiId: EmojiId) => void;
    setDeckSeed: (seed: number | null) => void;
    setServer: (server: Server) => void;
    setCurrentDeck: (newDeck: Deck) => void;
    setCardsOnTable: (newCards: CardsOnTable) => void;
    setSetsOnTable: (newSets: SetsOnTable) => void;
    setRowRequests: (user: string | null) => void;
    setActivePlayer: (user: string | null | true) => void;
    setWaitingForPlayers: (waiting: boolean) => void;
    setPlayerReady: (user: string) => void;
  };
}

const useGameStore = create<GameInterface>((set) => ({
  gameId: null,
  socket: null,
  server: null,
  user: { name: '', auth: false },
  connectionStatus: 'disconnected',
  gameStarted: false,
  modalVisible: false,
  emojiId: null,
  waitingForPlayers: true,
  deckSeed: null,
  currentDeck: [],
  selected: new SelectedClass() as Selected,
  cardsOnTable: [],
  setsOnTable: new Set(),
  scoreBoard: {},
  rowRequests: new Set(),
  activePlayer: null,
  lastSetFoundTime: 0,
  actions: {
    startLocalGame: () => {
      set(({ setters, actions, user }) => {
        const {
          setGameStarted,
          setCurrentDeck,
          setCardsOnTable,
          setSetsOnTable,
          setLastSetFoundTime,
          setDeckSeed,
          setActivePlayer,
        } = setters;
        const { resetScoreBoard } = actions;
        resetScoreBoard();
        // Generate seed for local game
        const localSeed = Math.random();
        // Update the store
        setDeckSeed(localSeed);
        // Use the seed to generate the deck and table
        const { newDeck, newTable, sets } = methods.newGame(localSeed);
        // Update the last set found time to the start of the game
        setLastSetFoundTime(Date.now());
        // Update the game state
        setCurrentDeck(newDeck);
        setCardsOnTable(newTable);
        setSetsOnTable(sets);
        setGameStarted(true);
        setActivePlayer(true);
        return {};
      });
    },
    startOnlineGame: () => {
      set(({ setters, actions, deckSeed }) => {
        const {
          setGameStarted,
          setCurrentDeck,
          setCardsOnTable,
          setSetsOnTable,
          setLastSetFoundTime,
          setDeckSeed,
          setActivePlayer,
        } = setters;
        const { resetScoreBoard } = actions;

        if (!deckSeed) return toast.error('Issue starting game');
        resetScoreBoard();
        // Update the store
        setDeckSeed(deckSeed);
        // Use the seed to generate the deck and table
        const { newDeck, newTable, sets } = methods.newGame(deckSeed);
        // Update the last set found time to the start of the game
        setLastSetFoundTime(Date.now());
        // Update the game state
        setCurrentDeck(newDeck);
        setCardsOnTable(newTable);
        setSetsOnTable(sets);
        setGameStarted(true);
        setActivePlayer(null);
        return {};
      });
    },
    updateActivePlayer: (user: string | null) => {
      set(({ setters }) => {
        const { setActivePlayer } = setters;
        setActivePlayer(user);
        return {};
      });
    },
    updateUser: (user: User) => {
      set(({ setters }) => {
        const { setUser } = setters;
        setUser(user);
        return {};
      });
    },
    displayModal(type: 'join' | 'rules' | false) {
      set(({ setters }) => {
        const { setModal } = setters;
        setModal(type);
        return {};
      });
    },
    callSet: (remoteUser: string = '') => {
      set(({ setters, actions, user }) => {
        const { setActivePlayer } = setters;
        const { expireSetCall } = actions;

        setActivePlayer(remoteUser || user.name);
        expireSetCall(CALL_SET_DURATION);
        return {};
      });
    },
    updateConnectionStatus: (status: ConnectionStatus) => {
      set(({ setters }) => {
        const { setConnectionStatus } = setters;
        setConnectionStatus(status);
        return {};
      });
    },
    selectCard: (position: number) => {
      set(({ setters, selected, setsOnTable, actions, activePlayer }) => {
        const { setSelected } = setters;
        const { collectSet } = actions;

        if (selected[position]) {
          selected.remove(position);
        } else {
          selected.add(position);
        }

        if (selected.getLength() === 3) {
          const guess = selected.getSelections();

          if (!checkGuess(guess, setsOnTable)) {
            selected.setShake();
          } else {
            selected.setFound();
            setTimeout(() => {
              collectSet(guess, activePlayer);
              setSelected(new SelectedClass() as Selected);
            }, 2300);
            return {};
          }
        }

        setSelected(selected);
        return {};
      });
    },
    collectSet: (cardPositions: Array<number>, activePlayer: ActivePlayer) => {
      set(({ setters, actions, cardsOnTable, lastSetFoundTime, user }) => {
        const { setActivePlayer, setScoreBoard } = setters;
        const { updateTable } = actions;

        const foundSet = cardPositions.map(
          (position) => cardsOnTable[position - 1]
        );
        const entry = {
          timeToFind: Date.now() - lastSetFoundTime,
          cards: foundSet,
        };
        if (activePlayer) {
          setTimeout(() => {
            const foundUser = activePlayer === true ? user.name : activePlayer;
            setScoreBoard(foundUser, entry);
            if (activePlayer !== true) setActivePlayer(null);
          }, 1000);
        }
        if (user.auth) {
          fetch('https://www.thesetiverse.com/api/found', {
            method: 'POST',
            body: JSON.stringify(entry),
          });
        }
        updateTable(Actions.SET, cardPositions);
        return {};
      });
    },
    updateTable(action: Actions, cards?: Array<number>) {
      set(({ setters, cardsOnTable, currentDeck }) => {
        const { setCardsOnTable, setCurrentDeck, setSetsOnTable } = setters;
        const { newTable, newDeck } = methods.deal(
          [...currentDeck],
          cardsOnTable,
          action,
          cards
        );

        const sets = methods.determineSets(newTable);
        setCardsOnTable(newTable);
        setCurrentDeck(newDeck);
        setSetsOnTable(sets);
        return {};
      });
    },
    requestNewRow: (username: string | null = null) => {
      set(({ actions, setters, user }) => {
        const { sendSocket } = actions;
        const { setRowRequests } = setters;
        if (!username) sendSocket(Event.NEW_ROW, user.name);
        setRowRequests(username || user.name);
        return {};
      });
    },
    clearRowRequests: () => {
      set(({ setters, socket }) => {
        const { setRowRequests, setActivePlayer } = setters;
        if (socket) setActivePlayer(null);
        setRowRequests(null);
        return {};
      });
    },
    expireSetCall: (timeToExpire) => {
      set(({ setters }) => {
        const { setActivePlayer, setSelected } = setters;
        setTimeout(() => {
          setSelected(new SelectedClass() as Selected);
          setActivePlayer(null);
        }, timeToExpire);
        return {};
      });
    },
    sendSocket: (event: Event, data: Data) => {
      set(({ socket }) => {
        if (socket) {
          socket.send(JSON.stringify({ event, data }));
        }
        return {};
      });
    },
    addNewRow: () => {
      set(({ actions }) => {
        const { updateTable, clearRowRequests } = actions;
        updateTable(Actions.ROW);
        clearRowRequests();
        return {};
      });
    },
    resetScoreBoard: () => {
      set(({ setters }) => {
        const { setScoreBoard } = setters;
        setScoreBoard(null, null);
        return {};
      });
    },
    clearScoreBoard: () => {
      set(({ setters }) => {
        const { setScoreBoard } = setters;
        setScoreBoard(null, null, true);
        return {};
      });
    },

    leaveGame: () => {
      set(({ setters }) => {
        const { setSocket } = setters;
        setSocket(null);
        return {};
      });
    },
    addPlayer: (user) => {
      set(({ setters }) => {
        const { setScoreBoard } = setters;
        if (!user) return {};
        setScoreBoard(user, null);
        return {};
      });
    },
    removePlayer: (user) => {
      set(({ setters }) => {
        const { setScoreBoard } = setters;
        setScoreBoard(user, null);
        return {};
      });
    },
    joinGame: (emojiId: EmojiId) => {
      set(({ setters, actions }) => {
        const {
          setSocket,
          setEmojiId,
          setGameId,
          setServer,
          setDeckSeed,
          setGameStarted,
          setConnectionStatus,
        } = setters;
        const { addPlayer, resetScoreBoard } = actions;

        const roomString = arrayToBase64(emojiId);
        setGameStarted(false);
        // Clear the current deck seed
        resetScoreBoard();
        async function fetchData() {
          const params = new URLSearchParams();
          params.append('room', roomString);
          const url = new URL(
            'https://api.thesetiverse.com/assign-web-socket-server'
          );
          url.search = params.toString();
          const response = await fetch(url.toString());
          const data: {
            gameId: string;
            server: Server;
            players: Array<string>;
            seed: number;
          } = await response.json();

          if (!data) {
            toast.error('Issue joining room');
            setConnectionStatus('error');
            return;
          }
          const { gameId, players, seed, server } = data;
          if (!gameId || !server) {
            toast.error('Issue joining room');
            setConnectionStatus('error');
            return;
          }
          const socketConnection = new WebSocket(
            `wss://socket.thesetiverse.com/${server}/game/${gameId}`
          );
          // If we got a seed back from the server, set it
          players.forEach((player) => addPlayer(player));
          setSocket(socketConnection);
          setEmojiId(emojiId);
          setGameId(gameId);
          setServer(server);
          if (seed) {
            setDeckSeed(seed);
          } else {
            setDeckSeed(null);
          }
        }

        fetchData();

        return {};
      });
    },
    markPlayerReady: (user: string) => {
      set(({ setters }) => {
        const { setPlayerReady } = setters;
        setPlayerReady(user);
        return {};
      });
    },
    createServerRoom: () => {
      set(({ setters, actions, emojiId, server, user, gameId }) => {
        const { updateConnectionStatus } = actions;
        const { setDeckSeed } = setters;
        if (!emojiId || !gameId) return {};
        const room = arrayToBase64(emojiId);
        if (!gameId) return {};
        async function fetchData() {
          if (!gameId) return;

          const body = JSON.stringify({
            room,
            server,
            user: user.name,
            gameId,
          });

          const url = new URL(
            'https://api.thesetiverse.com/assign-web-socket-server'
          );
          const response = await fetch(url.toString(), {
            method: 'POST',
            body,
          });
          if (!response.ok) {
            toast.error('Unable to create room');
            updateConnectionStatus('error');
            return;
          }
          const data = await response.json();
          const { seed } = data;
          setDeckSeed(seed);
        }
        fetchData();
        return {};
      });
    },
  },
  setters: {
    setUser: (user: User) =>
      set(
        produce((state) => {
          state.user = user;
        })
      ),
    setLastSetFoundTime: (time: number) => {
      set(
        produce((state) => {
          state.lastSetFoundTime = time;
        })
      );
    },
    setSelected: (selections) => {
      set(
        produce((state) => {
          state.selected = selections;
        })
      );
    },
    setServer: (server: Server) =>
      set(
        produce((state) => {
          state.server = server;
        })
      ),
    setModal: (type: 'join' | 'rules' | false) => {
      set(
        produce((state) => {
          state.modalVisible = type;
        })
      );
    },
    setTable: (newTable) =>
      set(
        produce(({ cardsOnTable }) => {
          cardsOnTable = newTable;
        })
      ),
    setConnectionStatus: (status: ConnectionStatus) =>
      set(
        produce((state) => {
          state.connectionStatus = status;
        })
      ),
    setDeck: (newDeck: Card[]) =>
      set(
        produce((state) => {
          state.currentDeck = newDeck;
        })
      ),
    setGameStarted: (started: boolean) =>
      set(
        produce((state) => {
          state.gameStarted = started;
        })
      ),
    setGameId: (id: string) =>
      set(
        produce((state) => {
          state.gameId = id;
        })
      ),
    setScoreBoard: (
      user: string | null,
      foundSet: FoundSet | null,
      clear = false
    ) =>
      set(
        produce((state) => {
          if (clear) {
            state.scoreBoard = {};
            return;
          }
          if (!user) {
            for (const key of Object.keys(state.scoreBoard)) {
              state.scoreBoard[key] = { ready: false, found: [] };
            }
            return;
          }
          if (!foundSet) {
            state.scoreBoard[user] = { ready: false, found: [] };
          } else {
            state.scoreBoard[user].found.push(foundSet);
          }
        })
      ),
    setSetsOnTable: (sets: Set<string>) =>
      set(
        produce((state) => {
          state.setsOnTable = sets;
        })
      ),
    setCardsOnTable: (cards: Card[]) =>
      set(
        produce((state) => {
          state.cardsOnTable = cards;
        })
      ),
    setRowRequests: (user: string | null) =>
      set(
        produce((state) => {
          if (!user) {
            state.rowRequests = new Set();
          } else {
            state.rowRequests.add(user);
          }
        })
      ),
    setActivePlayer: (user: string | null | true) =>
      set(
        produce((state) => {
          state.activePlayer = user;
        })
      ),
    setPlayerReady: (user: string) =>
      set(
        produce((state) => {
          state.scoreBoard[user].ready = true;
        })
      ),
    setSocket: (socket) =>
      set(
        produce((state) => {
          state.socket = socket;
        })
      ),
    setEmojiId: (array) =>
      set(
        produce((state) => {
          state.emojiId = array;
        })
      ),
    setDeckSeed: (seed: number | null) =>
      set(
        produce((state) => {
          state.deckSeed = seed;
        })
      ),
    setCurrentDeck: (deck: Deck) =>
      set(
        produce((state) => {
          state.currentDeck = deck;
        })
      ),
    setWaitingForPlayers: (waiting: boolean) =>
      set(
        produce((state) => {
          state.waitingForPlayers = waiting;
        })
      ),
  },
}));

export default useGameStore;

export const useGameActions = () => useGameStore((state) => state.actions);

export const useEmojiId = () => useGameStore((state) => state.emojiId);

export const useSelected = (position: number) =>
  useGameStore((state) => state.selected[position]);

export const useActivePlayer = () =>
  useGameStore((state) => state.activePlayer);

export const useSocket = () => useGameStore((state) => state.socket);

export const useUsername = () => useGameStore((state) => state.user);

export const useConnectionStatus = () =>
  useGameStore((state) => state.connectionStatus);

export const useWaitingForPlayers = () =>
  useGameStore((state) => state.waitingForPlayers);

export const useRowRequests = () => useGameStore((state) => state.rowRequests);
export const useScoreBoard = () => useGameStore((state) => state.scoreBoard);
export const useOnTable = () => useGameStore((state) => state.cardsOnTable);
export const useTableSets = () => useGameStore((state) => state.setsOnTable);
export const useCurrentDeck = () => useGameStore((state) => state.currentDeck);
export const useLastSetFoundTime = () =>
  useGameStore((state) => state.lastSetFoundTime);
export const useModalVisible = () =>
  useGameStore((state) => state.modalVisible);

export const useGameStarted = () => useGameStore((state) => state.gameStarted);
export const useDeckSeed = () => useGameStore((state) => state.deckSeed);
