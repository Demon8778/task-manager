const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = require('../src/app');
const User = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
	_id: userOneId,
	name: 'Mike',
	email: 'mike@example.com',
	password: '56What!!',
	tokens: [
		{
			token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
		}
	]
};

beforeEach(async () => {
	await User.deleteMany();
	await new User(userOne).save();
});

// afterEach(() => {
// 	console.log('AfterEach');
// });

test('Should sign up a new user', async () => {
	await request(app)
		.post('/users')
		.send({
			name: 'Kirankumar Ahir',
			email: 'kiran8778@gmail.com',
			password: '777@777!'
		})
		.expect(201);
});

test('Should login existing user', async () => {
	await request(app)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: userOne.password
		})
		.expect(200);
});

test('Should not login nonexisting user', async () => {
	await request(app)
		.post('/users/login')
		.send({
			email: 'anything@gmail.com',
			password: 'hello'
		})
		.expect(400);
});

test('Should get profile for a user', async () => {
	await request(app)
		.get('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
	await request(app)
		.get('/users/me')
		.send()
		.expect(401);
});

test('Should delete account for user', async () => {
	await request(app)
		.delete('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);
});

test('Should not delete account for unauthenticated user', async () => {
	await request(app)
		.delete('/users/me')
		.send()
		.expect(401);
});
