import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.bid.deleteMany({});
  await prisma.auction.deleteMany({});

  for (let i = 10; i >= 1; i--) {
    // await prisma.donation.create({
    //   data: {
    //     count: i,
    //     email: `${i}@email.com`,
    //     displayName: `User ${i}`,
    //     team: `team-${i}`,
    //     message:
    //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    //   },
    // });
    const today = new Date();
    await prisma.auction.create({
      data: {
        name: `Item ${i}`,
        price: Math.floor(Math.random() * 10) + 0,
        priceBIN: Math.floor(Math.random() * 200) + 50,
        auctionStart: today,
        auctionEnd: new Date(
          today.setMinutes(
            today.getMinutes() + Math.floor(Math.random() * 59) + 30,
          ),
        ),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
