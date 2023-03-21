const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const app = express();
const PORT = 5000;

// Models
const User = require('./model/user');

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
    let response;

    if ( text === '') 
    {
        console.log('1');
        response = `CON Enter your full name`;
    }
    if ( text !== '' )
    {
        let array = text.split('*');
        console.log(array);
        response = `CON Enter your ID number`
    }
    else if ( array.length === 2 )

    {
        // ID NUMBER
        if (parseInt(array[1]) > 0 )
        {
            response = `CON please confirm if you want to save your data\n1. Yes\n2. Cancel`
        }

        else 
        {
            response = 'END network error'
        }
    }
    else if ( array.length === 3 )
    {
        if (parseInt(array[2]) === 1 )
        {
            let data = new User();
            data.fullName = array[0];
            data.id_number = array[1];
            data.save(() => {
                response = `END Thank you for registering`;
            })
        }
        else if (parseInt(array[2]) === 2 )
        {
            response = `END Sorry, you have cancelled the registration.`
        }
        else 
        {
            response = `END Invalid input`
        }
    }
    else 
    {
        response = `END Thank you for registering`;
    }


    setTimeout(() => {
        console.log(text);
        res.send(response);
        res.end();
    }, 2000);
});


app.listen(PORT, () => {
    console.log(`Listening on port` + PORT )
});