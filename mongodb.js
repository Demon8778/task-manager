const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

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
    db.collection('users').insertMany([
        {
            name: 'Kalpesh',
            age: 27
        },
        {
            name: 'Kalpesh',
            age: 27
        }
    ], (error, result) => {
        if (error) 
            return console.log('Unable to insert documents!');
            
        console.log(result.ops);
    })
});
