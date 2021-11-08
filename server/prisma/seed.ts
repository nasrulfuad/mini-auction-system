import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.bid.deleteMany({});
  await prisma.auction.deleteMany({});

  for (let i = 10; i >= 1; i--) {
    const today = new Date();

    const auction = await prisma.auction.create({
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

    if (i === 10) {
      for (let j = 1; j <= 25; j++) {
        await prisma.bid.create({
          data: {
            auctionId: auction.id,
            name: `Bidder ${j}`,
            price: +auction.price + j,
          },
        });
      }
    }
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
