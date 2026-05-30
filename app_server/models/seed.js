//Bring in DB connection plus Trip schema
const mongoose = require('./db');
const Trip = require('./travlr');

//Read seed data from json
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('data/trips.json', 'utf8'));

//delete existing records and insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
}

//Close mongoDB connection and exit
seedDB().then(async () => {
    await mongoose.connection.close();
    process.exit(0);
});