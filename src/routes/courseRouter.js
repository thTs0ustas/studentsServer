const Course = require("../models/courses.model");
const Student = require("../models/student.model");
const StudentToCourse = require("../models/studentsToCourse.model");

var express = require("express");
var router = express.Router();

router.get("/", async function (req, res) {
  const courses = await Course.sync().then(() =>
    Course.findAll({ include: [Student] })
  );

  // res.send(courses);
  res.render("courses/courseList", {
    title: "Express 002 - courses page",

    list: courses,
  });
});

router.post("/create", async (req, res) => {
  const course = await Course.sync({ alter: true }).then(() => {
    return Course.create(
      {
        title: req.body.title,
        stream: req.body.stream,
        type: req.body.type,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
      },
      { through: { fee: 2500 } }
    );
  });
  res.redirect("/courses");
  // res.send(course);
});

module.exports = router;
