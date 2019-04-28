// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) 
        return console.log('Unable to connect to databse!');

    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     name: 'Kiran',
    //     age: 22
    // }, (error, result) => {
    //     if (error) 
    //         return console.log('Unable to insert user!');
        
    //     console.log(result.ops);
    // });
    // db.collection('users').insertMany([
    //     {
    //         name: 'Kalpesh',
    //         age: 27
    //     },
    //     {
    //         name: 'Kalpesh',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error) 
    //         return console.log('Unable to insert documents!');

    //     console.log(result.ops);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Go for a walk!',
    //         completed: false
    //     }, {
    //         description: 'Do anything you want to do!',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) 
    //         return console.log('Unable to insert records!');
    //     console.log(result.ops)
    // });

    // db.collection('users').find({ age: 27 }).toArray((error, users) => {
    //     if (error) 
    //         return console.log('Unable to find users!');
    //     console.log(users);
    // });

    // db.collection('users').find({ age: 27 }).count((error, count) => {
    //     if (error)
    //         return console.log('Unable to find users!');
    //     console.log(count);
    // });

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     if (error)
    //         return console.log('Unable to find users!');
    //     console.log(tasks);
    // });

    // db.collection('users').findOne({ _id: new ObjectID('5cc55ce70a359631007c47d7') }, (error, user) => {
    //     console.log(user);
    // });

    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
});
