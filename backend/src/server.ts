import express from "express";
import path from "path";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 8080;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/balance/get", async (req, res) => {
  try {
    let wallet = await prisma.wallet.findFirst({
      orderBy: {
        date: "desc",
      },
    });
    const today = new Date();
    today.setHours(0, 0, 0, 0)
    if (wallet != null) {
      const tr = await prisma.transactionRecord.findFirst({
        where: {
          reflected: {
            equals: false
          },
          date: {
            gt: wallet.date,
            lte: today,
          }
        },
        orderBy: {
          date: "asc",
        },
      });
      if (tr != null) {
        const trs = await prisma.transactionRecord.findMany({
          where: {
            date: {
              gt: wallet.date,
              lte: today,
            },
          },
        });
        trs.forEach(tr => wallet!.amount += tr.type === "income" ? tr.amount : -tr.amount);
        await prisma.transactionRecord.updateMany({
          where: {
            date: {
              gt: wallet.date,
              lte: today,
            },
          },
          data: {
            reflected: true,
          },
        });
      }
      wallet = await prisma.wallet.upsert({
        where: {
          date: today,
        },
        create: {
          date: today,
          amount: wallet.amount,
        },
        update: {
          amount: wallet.amount
        }
      });
    }
    else {
      wallet = await prisma.wallet.create({
        data: { date: today, amount: 0 },
      });
    }
    res.json(wallet);
  }
  catch (err) {
    console.error((err as Error).message);
    res.status(400).json({ error: "Getting balance faild.", details: (err as Error).message });
  }
});

app.post("/api/transaction/register", async (req, res) => {
  const { date, type, amount, note } = req.body;
  try {
    const validatedDate = new Date(date);
    const count = await prisma.wallet.count({
      where: {
        date: {
          lt: validatedDate
        },
      },
    });
    if (count > 0) {
      const transaction = await prisma.transactionRecord.create({
        data: { date: validatedDate, type, amount, note }
      });
      res.status(201).json(transaction);
    }
    else {
      res.status(400).json({ error: "Register faild.", detail: "Wallet doesn't exist before the date." });
    }
  }
  catch (err) {
    res.status(400).json({ error: "Register faild.", details: (err as Error).message });
  }
});

// app.get("*", (req, res) => {
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
