const Students = require('../models/student.model');
const Courses = require('../models/courses.model');
const StudentsToCourse = require('../models/studentsToCourse.model');
// const sequelize = require('../database/database');

Students.belongsToMany(Courses, { through: StudentsToCourse });
Courses.belongsToMany(Students, { through: StudentsToCourse });

// sequelize
// 	.sync({ alter: false })
// 	.then()
// 	.catch((err) => {
// 		console.log(err);
// 	});
