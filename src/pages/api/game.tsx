import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/server/db';
import { Card, FoundSet } from '@/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/server/auth';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const foundSets = req.body.foundSets as FoundSet[];
  const gamePlayers = req.body.players;
  // const gamePlayers = Object.keys(room.score);
  // const foundSets = store.foundSets as SetFound[];
  const session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(401).json({ name: 'Not authorized' });

  // console.log(foundSets);
  // const players = await prisma.user.findMany({
  //   where: {
  //     name: {
  //       in: gamePlayers,
  //     },
  //   },
  //   select: {
  //     id: true,
  //   },
  // });

  // const newGame = await prisma.game.create({
  //   data: {
  //     players: {
  //       connect: players,
  //     },
  //     end: new Date(),
  //   },
  // });

  // foundSets.forEach(async (set) => {
  //   await prisma.foundSet.create({
  //     data: {
  //       cards: {
  //         connect: set.cards.map((card) => ({
  //           id: card.id,
  //         })),
  //       },
  //       gameId: newGame.id,
  //       userId: session?.user.id,
  //       timeToFind: set.timeToFind,
  //     },
  //   });
  // });

  // return newGame;
}
