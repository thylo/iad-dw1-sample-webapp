require('dotenv').config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const nunjucks = require("nunjucks");

const indexRouter = require("./routes/index");
const parlementRouter = require("./routes/parlement");
const gameRouter = require("./routes/game");

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});
app.set('view engine', 'njk');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/parlement", parlementRouter);
app.use("/the-great-iad-game", gameRouter);

const listener = app.listen(process.env.PORT, function() {
  console.log("Listening on port " + listener.address().port);
});
