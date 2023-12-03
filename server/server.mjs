import express from "express";
import cors from "cors";
import axios from "axios";
import "./loadEnvironment.mjs";
import path from 'path';
import { fileURLToPath } from 'url';
import db from "./db/conn.mjs";
import { ObjectId } from "mongodb";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// get the path to the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewsPath = __dirname + '/views/';
app.use(express.static(viewsPath));

const router = express.Router();

// retrieve questions
router.get('/questions', async (req, res) => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=20&encode=url3986');
    res.json(response.data);
  } catch (error) {
    console.error('Error calling trivia API:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// get scoreboard entries
router.get("/getScoreboard", async (req, res) => {
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// post a new scoreboard entry with the current date
router.post("/postScore", async (req, res) => {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  let dateString = month + "/" + day + "/" + year;

  let newDocument = {
    username: req.body.username,
    score: req.body.score,
    date: dateString,
  };
  let collection = await db.collection("records");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

app.use("/api", router);


// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});