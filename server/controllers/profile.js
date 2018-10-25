var mongoose = require('mongoose');
var User = require('../models/users');

module.exports.profileRead = function(req, res){
    if(!req.payload._id){
        res.status(404).json({
            "message": "Unauthorized Access"
        });
    }
    else{
        User.findById(req.payload._id).exec(function(err, user){
            res.status(200).json(user);
        })
    }
};