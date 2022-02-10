const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const StudentsToCourse = sequelize.define(
	'students_courses_connections',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		fee: {
			type: DataTypes.INTEGER,
		},
		course_id: {
			type: DataTypes.INTEGER,
		},
		student_id: {
			type: DataTypes.INTEGER,
		},
	},

	{ timestamps: false }
);

module.exports = StudentsToCourse;
