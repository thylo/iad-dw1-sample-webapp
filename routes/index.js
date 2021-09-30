const express = require("express");
const fetchRandomJoke = require("../helpers/joke");
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

const insertNote = (content) => {
  const createdNote = { content, created_at: Date.now() };
  data.push(createdNote);
  return createdNote;
};

const getFrontPageHtml = (noteCount) => {
  return(`
    <!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        <div class='container'>
          <h1>Full stack example app</h1>
          <p>number of notes created ${noteCount}</p>
          <a href='/notes'>notes</a>
          <img src='022.jpg' width='200' />
        </div>
      </body>
    </html>
`)
}

app.get('/basic', (req, res) => {
  const page = getFrontPageHtml(data.length)
  res.send(page)
})

router.get("/notes", async function (req, res, next) {
  const joke = await fetchRandomJoke();
  const notes = req.query.term
    ? data.filter((note) => note.content.includes(req.query.term))
    : data;
  res.render("notes", {
    notes,
    joke,
    title: 'Application web "traditionelle"',
    term: req.query.term,
  });
});

router.post("/notes", function (req, res, next) {
  insertNote(req.body.content);
  res.redirect("/notes");
});

router.get("/spa", function (req, res, next) {
  return res.render("spa", {
    title: "Single page application",
  });
});

router.get("/api/notes", function (req, res, next) {
  return res.json(data);
});

router.post("/api/notes", function (req, res, next) {
  const content = req.body.content;
  if (!content) {
    res.status(401);
    return res.json({ message: 'Le champ "content" est obligatoire' });
  }
  return res.json(insertNote(content));
});

module.exports = router;
