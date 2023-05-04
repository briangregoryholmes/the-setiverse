import {
  FastestTimeVisualizer,
  SetsFoundVisualizer,
  MostCommonCardVisualizer,
  TotalGamesVisualizer,
  TimeToFindVisualizer,
} from '@/components';
import styles from './stats.module.css';
import { authOptions } from '@/server/auth';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { Stats as StatsType, Card as CardType } from '@/types';
import { prisma } from '@/server/db';
import Head from 'next/head';

const DOMAIN = process.env.COPILOT_ENVIRONMENT_NAME
  ? 'https://www.thesetiverse.com'
  : 'http://localhost:3000';

export const getServerSideProps: GetServerSideProps<{
  data: StatsType | null;
}> = async (context) => {
  // console.log(context.req, context.res);
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session)
    return {
      props: {
        data: null,
      },
    };

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

  return {
    props: {
      data: {
        totalSetsFound,
        averageTimeToFind,
        gamesPlayed: 0,
        fastestTime,
        mostCommonCard,
      },
    },
  };
};

export default function Stats({ data }: { data: StatsType | null }) {
  return (
    <>
      <h1>Stats</h1>
      {data ? (
        <div className={styles.wrapper}>
          <SetsFoundVisualizer count={data.totalSetsFound} />
          <TimeToFindVisualizer
            time={Number(data.averageTimeToFind).toFixed(2)}
          />
          {/* <TotalGamesVisualizer count={Number(data.gamesPlayed)} /> */}
          <FastestTimeVisualizer time={Number(data.fastestTime).toFixed(2)} />
          <MostCommonCardVisualizer
            card={JSON.parse(data.mostCommonCard) as CardType}
          />
        </div>
      ) : (
        <div>You are not signed in!</div>
      )}
    </>
  );
}
