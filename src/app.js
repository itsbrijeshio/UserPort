const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes");
const { createRateLimiter } = require("./middlewares");

const app = express();

// Rate Limiter
const strictRateLimit = createRateLimiter();

// Global Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(strictRateLimit);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to UserPort APIs!");
});

app.use("/", routes);

module.exports = app;
