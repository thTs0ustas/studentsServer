const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Course = sequelize.define('course', {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	stream: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	type: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	start_date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	end_date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
});
Course.sync().then();
module.exports = Course;
