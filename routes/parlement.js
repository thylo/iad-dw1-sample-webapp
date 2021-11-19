const express = require('express');
const router = express.Router();
const {deputes} = require('../data/deputes.json');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("parlement/index", {
    deputes
  });
});

module.exports = router;
