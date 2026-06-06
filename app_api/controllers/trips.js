const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

//GET: /trips - lists all the trips
//Response must include html status code
// and JSON message to the requesting client
const tripsList = async (req, res) => {
    const q = await Model.find({}).exec();


    //show query results on console
    console.log(q);

    if(!q)
    { //Database returned no data
        return res.status(404).json(err);
    } else {
        return res.status(200).json(q);
    }
};

//GET: /trips/:tripCode - lists single trip
//Response must include html status code
// and JSON message to the requesting client
const tripsFindByCode = async (req, res) => {
    const q = await Model.find({'code': req.params.tripCode}).exec();


    //show query results on console
    console.log(q);

    if(!q)
    { //Database returned no data
        return res.status(404).json(err);
    } else {
        return res.status(200).json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};