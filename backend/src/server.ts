import express from "express";
import path from "path";

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/xxx", (req, res) => {
  res.json({ message: "Hello!" });
});

// app.get("*", (req, res) => {
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
