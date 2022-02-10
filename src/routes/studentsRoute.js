const Students = require('../models/student.model');
var express = require('express');
var router = express.Router();

router.get('/', async function (req, res) {
	let students = await Students.sync({ alter: false })
		.then(() => Students.findAll())
		.then((data) => data.map(({ dataValues }) => dataValues));

	console.log(students);
	res.render('students/list', {
		title: 'Express 002 - students page',

		list: students,
	});
});

router.get('/delete', async function (req, res) {
	await Students.sync({ alter: true }).then(() =>
		Students.destroy({
			where: { students_id: req.query.id },
		})
	);

	res.render('students/deleted', {
		title: 'Express 002 - Customers delete page',
		// list: getCustomers()
		message: `You deleted customer with id: ${req.query.id}`,
	});
});

router.get('/create', async function (req, res) {
	res.render('students/form', {
		title: 'Express 002 - Customers creation page',
		// list: getCustomers()
		message: `Add new student`,
	});
});
router.post('/create', async (req, res) => {
	console.log(req.body);
	await Students.sync({ alter: true }).then(() => {
		return Students.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			date_of_birth: req.body.date_of_birth,
		});
	});

	res.redirect('/');
});

router.get('/update', async function (req, res) {
	res.render('students/update', {
		title: 'Express 002 - Customers update page',
		message: `Update student with id: ${req.query.id}`,
	});
});

router.post('/update', async (req, res) => {
	await Students.sync({ alter: true }).then(() => {
		return Students.update(
			{
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				date_of_birth: req.body.date_of_birth,
			},

			{
				where: {
					id: req.query.id,
				},
			}
		);
	});
	res.redirect('/');
});

module.exports = router;
