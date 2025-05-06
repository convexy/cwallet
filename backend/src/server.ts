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

app.get("/api/xxx", (req, res) => {
  res.json({ message: "Hello!" });
});

app.post("/api/user/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email, password }
    });
    res.json(user);
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
