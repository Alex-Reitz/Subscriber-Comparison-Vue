const express = require("express");
const cors = require("cors");
const axios = require("axios");
const http = require("http");
const SocketIo = require("socket.io");
require("dotenv").config();

const app = express();

const BASE_URL =
  "https://www.googleapis.com/youtube/v3/channels?part=statistics";

const PEWDIEPIE_ID = "UC-lHJZR3Gqxm24_Vd_AJ5Yw";
const TSERIES_ID = "UCq-Fj5jknLsUf-MWSy4_brA";

const PEWDIEPIE_ENDPOINT = `${BASE_URL}&id=${PEWDIEPIE_ID}&key=${
  process.env.YOUTUBE_API_KEY
}`;
const TSERIES_ENDPOINT = `${BASE_URL}&id=${TSERIES_ID}&key=${
  process.env.YOUTUBE_API_KEY
}`;

const server = http.Server(app);
const io = SocketIo(server);

app.use(cors({ origin: 8080 }));

let stats;
const getStats = async () => {
  const [{ data: pewdiepie }, { data: tseries }] = await Promise.all([
    axios(PEWDIEPIE_ENDPOINT),
    axios(TSERIES_ENDPOINT)
  ]);
  stats = {
    pewdiepieStats: pewdiepie.items[0].statistics,
    tseriesStats: tseries.items[0].statistics
  };
  console.log({ stats });
  io.emit("stats", stats);
  setTimeout(() => getStats(), 2500);
};
getStats();

/* app.get("/", (req, res) => {
  res.json({ message: "It works!" });
}); */

app.get("/stats", (req, res) => {
  res.json(stats);
});

const PORT = 4444;
server.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
