import express from "express";
import axios from "axios";
import { google } from "googleapis";


const app = express();
const port = 3000;
const apiKey = "AIzaSyAZaQ5nO1xPJi4sFbDrnBAwez57WvNUvYo";
const apiUrl = "https://www.googleapis.com/youtube/v3";
const youtube = google.youtube({
  version: "v3",
  auth: apiKey,
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/search", async (req, res, next) => {
  try {
    const searchQuery = req.query.search_query;
    const url = `${apiUrl}/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}`;

    const response = await axios.get(url);
    const titles = response.data.items.map((item) => item.snippet.title);

    res.send(titles);
  } catch (err) {
    next(err);
  }
});
 
app.get("/search-with-googleapis", async (req, res, next) => {
  try {
    const searchQuery = req.query.search_query;
    const response = await youtube.search.list({
      part: "snippet",
      q: searchQuery,
    });

    const titles = response.data.items.map((item) => item.snippet.title);
    res.send(titles);
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});