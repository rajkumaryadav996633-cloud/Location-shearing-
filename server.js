const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let latest = null;

app.post("/api/location", (req, res) => {
  const { latitude, longitude, accuracy, timestamp } = req.body || {};
  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return res.status(400).json({error:"Invalid location"});
  }
  latest = { latitude, longitude, accuracy, timestamp };
  res.json({ok:true});
});

app.get("/api/location", (req, res) => {
  res.json(latest || {message:"अभी कोई location नहीं मिली"});
});

app.get("/view", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "view.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Location sharing server running on ${port}`));
