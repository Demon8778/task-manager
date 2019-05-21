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
	const { body } = await request(app)
		.post('/users')
		.send({
			name: 'Kirankumar Ahir',
			email: 'kiran8778@gmail.com',
			password: '777@777!'
		})
		.expect(201);

	//Assert that database was changed correctly
	const user = await User.findById(body.user._id);
	expect(user).not.toBeNull();

	//Assertions about the response
	expect(body).toMatchObject({
		user: {
			name: 'Kirankumar Ahir',
			email: 'kiran8778@gmail.com'
		},
		token: user.tokens[0].token
	});

	expect(user.password).not.toBe('777@777!');
});

test('Should login existing user', async () => {
	const { body } = await request(app)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: userOne.password
		})
		.expect(200);

	const user = await User.findById(userOneId);

	expect(body.token).toBe(user.tokens[1].token);
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

	const user = await User.findById(userOneId);
	expect(user).toBeNull();
});

test('Should not delete account for unauthenticated user', async () => {
	await request(app)
		.delete('/users/me')
		.send()
		.expect(401);
});

test('should upload avatar image', async () => {
	await request(app)
		.post('/users/me/avatar')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.attach('avatar', 'tests/fixtures/profile-pic.jpg')
		.expect(200);

	const user = await User.findById(userOneId);
	expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			name: 'Kiran Ahir'
		})
		.expect(200);

	const user = await User.findById(userOneId);
	expect(user.name).toBe('Kiran Ahir');
});

test('Should not update invalid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			location: 'India'
		})
		.expect(400);
});
