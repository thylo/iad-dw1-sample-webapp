const express = require("express");
const router = express.Router();

const data = [
  { content: "Plut le chien est beau", created_at: Date.now() },
  {
    content: "JMO is just great",
    created_at: Date.now(),
  },
  {
    content: "Le web c'est pas du stoemp",
    created_at: Date.now(),
  },
  {
    content: "Le web dynamique c'est chouette",
    created_at: Date.now(),
  },
];

router.get("/notes", function (req, res, next) {
  const notes = req.query.term
    ? data.filter((note) => note.content.includes(req.query.term))
    : data;
  res.render("notes", {
    notes,
    title: 'Application web "traditionelle"',
    term: req.query.term,
  });
});

router.post("/notes", function (req, res, next) {
  data.push({ content: req.body.content, created_at: Date.now() });
  res.redirect("/notes");
});

module.exports = router;
