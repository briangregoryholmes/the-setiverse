import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/server/db';
import { FoundSet } from '@/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/server/auth';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({
      message: 'Unauthorized',
    });
    return;
  }
  // Get the found set from the request body
  const foundSet = JSON.parse(req.body) as FoundSet;

  // Get the user id from the session
  const userId = session.user.id;

  // Get the ids of the cards found
  const cardIds = foundSet.cards.map((card) => {
    return {
      id: card.id,
    };
  });

  // Create a new entry in the foundSet table
  const entry = await prisma.foundSet.create({
    data: {
      cards: {
        connect: cardIds,
      },
      gameId: 15,
      userId,
      timeToFind: foundSet.timeToFind,
    },
  });

  if (!entry) {
    res.status(500).json({
      message: 'Unable to create entry',
    });
    return;
  }

  // return status
  res.status(201);
  return;
}
