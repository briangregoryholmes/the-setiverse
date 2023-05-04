import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/server/db';
import { Stats } from '@/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/server/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Stats>
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({
      totalSetsFound: 0,
      averageTimeToFind: 0,
      gamesPlayed: 0,
      mostCommonCard: JSON.stringify({
        color: 'primary',
        number: '1',
        fill: 'solid',
        shape: 'pill',
        id: 1,
      }),
      fastestTime: 0,
    });
    return;
  }
  const userId = session.user.id;

  const totalSetsFound = await prisma.foundSet.count({
    where: {
      userId,
    },
  });

  // const gamesPlayed = await prisma.game.count({
  //   where: {
  //     players: {
  //       some: {
  //         userId,
  //       },
  //     },
  //   },
  // });

  // Return all the cards found by the user
  const allCards = await prisma.foundSet.findMany({
    where: {
      userId,
    },
    select: {
      cards: true,
    },
  });

  // Count the number of times each card appears
  const cardCount = allCards.reduce((acc, curr) => {
    curr.cards.forEach((card) => {
      if (acc[JSON.stringify(card)]) {
        acc[JSON.stringify(card)] += 1;
      } else {
        acc[JSON.stringify(card)] = 1;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  // Find the most common card
  const mostCommonCard = Object.keys(cardCount).reduce((a, b) =>
    cardCount[a] > cardCount[b] ? a : b
  );

  // Fastest time to find a set
  const fastestSet = await prisma.foundSet.aggregate({
    where: {
      userId,
    },
    _min: {
      timeToFind: true,
    },
  });
  let fastestTime = 0;

  if (fastestSet._min.timeToFind) {
    fastestTime = fastestSet._min.timeToFind / 1000;
  }

  const aggregate = await prisma.foundSet.aggregate({
    where: {
      userId,
    },
    _avg: {
      timeToFind: true,
    },
  });

  let averageTimeToFind = 0;

  if (aggregate._avg.timeToFind) {
    averageTimeToFind = aggregate._avg.timeToFind / 1000;
  }

  res.status(200).json({
    totalSetsFound,
    averageTimeToFind,
    gamesPlayed: 0,
    fastestTime,
    mostCommonCard,
  });
}
