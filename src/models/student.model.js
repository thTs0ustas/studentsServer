const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Students = sequelize.define(
	'students',
	{
		students_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
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
	},
	{ timestamps: false }
);

module.exports = Students;
