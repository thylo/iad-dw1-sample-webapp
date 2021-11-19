const express = require("express");
const router = express.Router();
const students = require("../data/students.json");
const shuffle = require("lodash/shuffle");

router.get("/", function (req, res, next) {
  res.render("game/index", {
    students,
  });
});

router.get("/game", function (req, res, next) {
  const optionsSet = new Set(students.map((student) => student.class));
  const options = Array.from(optionsSet);
  const student = shuffle(students).pop();

  res.render("game/game", {
    student,
    options,
  });
});
router.post("/game", function (req, res, next) {
  const formValues = req.body;
  if (!formValues.class || !formValues.student_id) {
    return res.redirect("/the-great-iad-game/game");
  }
  const student = students.find(
    (student) => student.id === formValues.student_id
  );
  if (!student) {
    return res.redirect("/the-great-iad-game/game");
  }
  console.log(student.class, formValues.class);
  const result = student.class === formValues.class ? "success" : "failure";
  res.render(`game/${result}`, {
    student,
    result,
  });
});

module.exports = router;
