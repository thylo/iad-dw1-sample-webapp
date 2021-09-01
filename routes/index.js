const express = require("express");
const router = express.Router();
const nunjucks = require("nunjucks");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/notes", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
