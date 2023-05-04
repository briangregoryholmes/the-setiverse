import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
  PutItemCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import crypto from 'crypto';

const REGION = 'us-east-1';
const ROOMS_TABLE = 'SETIVERSE_ROOMS';
const SERVERS_TABLE = 'SETIVERSE_SERVERS';

const dynamoDbClient = new DynamoDBClient({ region: REGION });

export const handler = async (event) => {
  const body = JSON.parse(event.body);

  // Destructure method
  const { httpMethod } = event;

  switch (httpMethod) {
    case 'GET':
      const { room } = event.queryStringParameters;
      return await handleGET(room);
    case 'POST':
      return await handlePOST(body);
    case 'PUT':
      return await handlePUT(room);
    case 'DELETE':
      return await handleDELETE(room);
    default:
      return handleInvalidMethod();
  }
};

async function handleGET(room) {
  const getItemCommand = new GetItemCommand({
    TableName: ROOMS_TABLE,
    Key: {
      room: { S: room },
    },
  });
  try {
    const data = await dynamoDbClient.send(getItemCommand);
    const { Item: game } = data;
    if (!game) {
      const scanCommand = new ScanCommand({
        TableName: SERVERS_TABLE,
      });
      const data = await dynamoDbClient.send(scanCommand);
      const { Items: servers } = data;

      const leastConnected = servers.reduce((min, server) => {
        if (server.CONNECTIONS < min.CONNECTIONS) {
          return server;
        } else {
          return min;
        }
      });
      const gameId = crypto.randomBytes(3).toString('hex');

      const serverData = {
        gameId: gameId,
        server: leastConnected.SERVER_KEY.S,
        players: [],
      };

      const response = {
        statusCode: 200,
        body: JSON.stringify(serverData),
      };
      return response;
    } else {
      if (game.gameStarted.BOOL) {
        return {
          statusCode: 409,
          body: JSON.stringify({
            message: 'Game already started',
          }),
        };
      } else if (game.players.N >= 6) {
        return {
          statusCode: 409,
          body: JSON.stringify({
            message: 'Game is full',
          }),
        };
      }
      const gameData = {
        room: room,
        server: game.server.S,
        players: game.players,
        gameStarted: game.gameStarted.BOOL,
        seed: game.seed,
      };

      const response = {
        statusCode: 200,
        body: JSON.stringify(gameData),
      };

      return response;
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err,
      }),
    };
  }
}

async function handlePOST(body) {
  // Handle first player joining game
  const { room, server, user } = body;

  if (!room || !server || !user) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Missing gameId or server',
      }),
    };
  }
  const SEED = Math.random();
  // Put command for GAMES_TABLE
  const putNewGameCommand = new PutItemCommand({
    TableName: ROOMS_TABLE,
    Item: {
      room: { S: room },
      players: { L: [{ S: user }] },
      server: { S: server },
      gameStarted: { BOOL: false },
      seed: { N: SEED.toString() },
    },
  });
  // Put command for SERVERS_TABLE
  const updateServerCommand = new UpdateItemCommand({
    TableName: SERVERS_TABLE,
    Key: {
      SERVER_KEY: { S: server },
    },
    UpdateExpression: 'SET CONNECTIONS = CONNECTIONS + :val',
    ExpressionAttributeValues: {
      ':val': { N: 1 },
    },
  });

  try {
    // Send both commands simultaneously
    // const [gameData, serverData] = await Promise.all([
    //   dynamoDbClient.send(putNewGameCommand),
    //   dynamoDbClient.send(updateServerCommand),
    // ]);
    const yeah = await dynamoDbClient.send(putNewGameCommand);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        seed: SEED,
      }),
    };
    return response;
  } catch (err) {
    return {
      statusCode: 502,
      body: JSON.stringify({
        message: err,
      }),
    };
  }
}

async function handlePUT(gameId) {}

async function handleDELETE(gameId) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'DELETE',
    }),
  };
}

function handleInvalidMethod() {
  return {
    statusCode: 405,
    body: JSON.stringify({
      message: 'Method not allowed',
    }),
  };
}
