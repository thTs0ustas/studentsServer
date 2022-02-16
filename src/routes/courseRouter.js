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

// router.post("/:id", async function (req, res) {
//   const course = await Course.create(req.body);
//   await course.addStudent(await Student.findByPk(8));
//   console.log(await course.getStudent());
//   res.send(await course.getStudent());
// });

//
// router.get("/delete", async function (req, res) {
//   await Student.sync().then(() =>
//     Student.destroy({
//       where: { students_id: req.query.id },
//     })
//   );
//
//   res.render("students/deleted", {
//     title: "Express 002 - Customers delete page",
//     // list: getCustomers()
//     message: `You deleted customer with id: ${req.query.id}`,
//   });
// });
//
// router.get("/create", async function (req, res) {
//   res.render("students/form", {
//     title: "Express 002 - Customers creation page",
//     // list: getCustomers()
//     message: `Add new student`,
//   });
// });
//
// router.get("/edit/:id", async function (req, res) {
//   const student = await Students.sync({ alter: false })
//     .then(() => Students.findByPk(req.params.id))
//     .then(({ dataValues }) => {
//       dataValues.date_of_birth = dataValues.date_of_birth
//         .toISOString()
//         .split("T")[0];
//       return dataValues;
//     })
//     .catch(console.log);
//
//   res.render("students/update", {
//     title: "Express 002 - Customers edit page",
//     message: `Edit student ${student.first_name} ${student.last_name}`,
//     student,
//   });
// });
//
// router.post("/update", async function (req, res) {
//   await Students.sync({ alter: true })
//     .then(() => {
//       return Students.findByPk(req.body.students_id);
//     })
//     .then((data) => {
//       // noinspection EqualityComparisonWithCoercionJS
//       if (data.students_id == req.body.students_id) {
//         data.first_name = req.body.first_name;
//         data.last_name = req.body.last_name;
//         data.date_of_birth = new Date(req.body.date_of_birth);
//
//         data.save();
//       }
//     })
//     .catch(console.log);
//   res.redirect("/");
// });

module.exports = router;
