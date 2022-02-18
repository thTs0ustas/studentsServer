const Students = require('../models/student.model');
const Course = require('../models/courses.model');
const StudentToCourse = require('../models/studentsToCourse.model');

var express = require('express');
var router = express.Router();

router.get('/', async function (req, res) {
	const students = await Students.sync({ alter: false }).then(() =>
		Students.findAll({ include: [Course] })
	);

	res.json(...students);
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
	await Students.sync({ alter: true }).then(() => {
		return Students.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			date_of_birth: req.body.date_of_birth,
		});
	});

	res.redirect('/');
});

router.post('/add/:id', async (req, res) => {
	const student = await Students.sync().then(() =>
		Students.findByPk(req.params.id)
	);
	const course = await Course.sync().then(() => Course.findByPk(req.params.id));
	console.log('Student', student);
	// await student.addCourse(course);

	res.send('Course added to student');
});

router.get('/edit/:id', async function (req, res) {
	const student = await Students.sync({ alter: false })
		.then(() => Students.findByPk(req.params.id))
		.then(({ dataValues }) => {
			dataValues.date_of_birth = dataValues.date_of_birth
				.toISOString()
				.split('T')[0];
			return dataValues;
		})
		.catch(console.log);

	res.render('students/update', {
		title: 'Express 002 - Customers edit page',
		message: `Edit student ${student.first_name} ${student.last_name}`,
		student,
	});
});

router.post('/update', async function (req, res) {
	await Students.sync({ alter: true })
		.then(() => {
			return Students.findByPk(req.body.students_id);
		})
		.then((data) => {
			if (data.students_id == req.body.students_id) {
				data.first_name = req.body.first_name;
				data.last_name = req.body.last_name;
				data.date_of_birth = new Date(req.body.date_of_birth);

				data.save();
			}
		})
		.catch(console.log);
	res.redirect('/');
});

module.exports = router;
