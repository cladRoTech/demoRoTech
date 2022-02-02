// contactModel.js
const req = require('express/lib/request');
const { body, validationResult } = require('express-validator');
var mongoose = require('mongoose');

// Setup schema
var parkSchema = mongoose.Schema({

    parkedDate : {type: Date},
    carId : {type: Number , required: [true, "carId cannot be null, check request body again."]},
    section: {type: String, required: [true, "section parking cannot be null"]}

}, {versionKey : false});

// Export Contact model
var Park = module.exports = mongoose.model('Park' , parkSchema , 'parkingLot');
module.exports.get = function (callback, limit) {
    Park.find(callback).limit(limit);
}

module.exports.post = function (callback, limit) {
    Park.findOneAndUpdate(callback)
    Park.create(callback)
}

