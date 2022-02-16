const sequelize = require("../database");

const { DataTypes } = require("sequelize");

const StudentToCourse = sequelize.define("studentToCourse", {
  fee: {
    type: DataTypes.INTEGER,
  },
  studentId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Student",
      key: "id",
    },
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Course",
      key: "id",
    },
  },
});
// StudentToCourse.sync().then();
module.exports = StudentToCourse;
