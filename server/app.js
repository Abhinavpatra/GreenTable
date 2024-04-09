require('dotenv').config();

// Connecting to database
const mongoose = require("mongoose");
const dbUrl = process.env.MONGO_URL;

async function main(){
    await mongoose.connect(dbUrl);
}

main()
.then(() => {
    console.log("Connected to Server");
})
.catch((err) => {
    console.log(err);
})

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.listen(3000 , () => {
    console.log("Server is Listening");
})

app.get('/',(req,res) => {
    res.send('Hello')
})

const bcrypt = require('bcryptjs');

// sign up
const User = require('./modals/user')
app.post('/signup' , async (req,res) => {
    try {
        const { name, email, password, restaurantId } = req.body;
        if (!name || !email || !password || !restaurantId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password.trim(),salt);

        const newUser = new User({name,email,password : hashedPassword,restaurantId});

        // // Example: Save user data to a database
        // // Replace this with your actual implementation
        // saveUserData(name, email, password, restaurantId);
        const registeredUser =  await newUser.save();
        console.log(registeredUser);
        res.status(200).json({ message: 'Signup successful' });
    } catch (error) {
        // If there's an error, return an error response
        console.error('Error handling signup request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})