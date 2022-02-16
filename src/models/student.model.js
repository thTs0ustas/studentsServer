const sequelize = require("../database");
const { DataTypes } = require("sequelize");
const Course = require("./courses.model");
const StudentToCourse = require("./studentsToCourse.model");

const Student = sequelize.define("student", {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Student.belongsToMany(Course, {
  through: StudentToCourse,
});
Course.belongsToMany(Student, {
  through: StudentToCourse,
});
// Student.sync().then();
module.exports = Student;
