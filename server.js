require("dotenv").config();
const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const pathMatch = require("path-match");
const logger = require("./middleware/logger");
const mongoose = require("mongoose");
const schemas = require("./models/user");
const mongoDB = process.env.MONGODB_URL;
console.log(mongoDB);
const nextApp = next({ dev: process.env.NODE_ENV !== "production" });
const handler = nextApp.getRequestHandler();

// preparing a next.js app to handle requests
// via express.js
nextApp.prepare().then(async () => {
  const server = express();

  // logs ip adress of user
  // just in case there are potential security issues
  server.set("trust proxy", true);
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(logger);
  server.use(async (req, res, next) => {
    req.context = {
      schemas,
    };
    next();
  });

  // handles requests to /api/
  server.use("/api", require("./api"));

  // const match = pathMatch();

  server.get("/", (req, res) => {
    return nextApp.render(req, res, "/", {});
  });

  server.get("*", (req, res) => {
    return handler(req, res);
  });

  await mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const d = new schemas.User({
    username: "tesaa1111111111111111111at24522",
    address: "tesaa1111111a1111111111t24522",
    links: [
      {
        title: "twitter",
        url: "https://twitter.com/Bobby3105",
      },
      {
        title: "reddit",
        url: "https://reddit.com/u/Bobby3105",
      },
      {
        title: "twitch",
        url: "https://twitch.com/akshith3105",
      },
      {
        title: "instagram",
        url: "https://instagram.com/akshith3105",
      },
      {
        title: "github",
        url: "https://github.com/Bobby3105",
      },
    ],
  });

  await d.save();

  server.listen(3000, () => {
    console.log("[LOG]", "connected to port 3000");
  });
});
