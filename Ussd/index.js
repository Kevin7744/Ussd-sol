const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const PORT = 8000;

// mongoose connection

const database_url = 'mongodb://localhost:27017/Ussd';
mongoose.connect(database_url);
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to database');
});


// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 app.get('/', (req, res) => {
    res.send('Success message!');
});





app.post('/', (req, res) => {
    const { phoneNumber, text , sessionId } = req.body;
    let response = '';

    if (text === '') {
        response = `Enter your name`;
    }



    setTimeout(() => {
        res.send(response);
        res.end();
    }, 2000);
});


app.listen(PORT, () => {
    console.log(`Listening on port` + PORT )
});