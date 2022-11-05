import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John",
      email: "john@example.com",
      avatarUrl: "http://github.com/LuisEduardo21.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Example Pool",
      code: "BOL123",
      ownerId: user.id,

      participant: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      data: "2022-11-04T13:00:00.649Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR",
    },
  });
  await prisma.game.create({
    data: {
      data: "2022-11-05T13:00:00.649Z",
      firstTeamCountryCode: "US",
      secondTeamCountryCode: "AR",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 3,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
