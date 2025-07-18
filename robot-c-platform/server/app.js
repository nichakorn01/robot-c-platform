const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/score', (req, res) => {
  const { name, score } = req.body;
  const data = JSON.parse(fs.readFileSync('database.json'));
  data.push({ name, score });
  fs.writeFileSync('database.json', JSON.stringify(data));
  res.sendStatus(200);
});

app.get('/leaderboard', (req, res) => {
  const data = JSON.parse(fs.readFileSync('database.json'));
  const top = data.sort((a, b) => b.score - a.score).slice(0, 10);
  res.json(top);
});

app.listen(3000, () => console.log("🚀 Server on http://localhost:3000"));