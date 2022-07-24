const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seed() {
  const email = "test@camifa.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("test@888", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const account = await prisma.account.create({
    data: {
      currencyCode: "BRL",
      name: "Test Account",
      userId: user.id,
    },
  });

  await prisma.account.create({
    data: {
      currencyCode: "USD",
      isActive: false,
      name: "Inactive Account",
      userId: user.id,
    },
  });

  await prisma.bankAccount.create({
    data: {
      accountId: account.id,
      bankName: "C6 Bank",
      color: "#000",
      description: "Lorem ipsum dolor",
      initialBalance: 105000,
      name: "Test Bank Account",
    },
  });

  await prisma.bankAccount.create({
    data: {
      accountId: account.id,
      initialBalance: 0,
      isActive: false,
      name: "Inactive Bank Account",
      type: "savings",
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
