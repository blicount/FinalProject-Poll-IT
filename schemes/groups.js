var mongoose    = require('mongoose'),
    _place      = require('./place'),
    _massage    = require('./massage'),
    _user    = require('./user');



group = new mongoose.Schema({

    Id:{
        type:Number,
        index:1,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    creation_date:{
        type:Date,
        required:true
    },
    manger:{
        type:String,
        required:true
    },
    winner:{
        type:String
    },
    _place: mongoose.Schema.ObjectId,
    _user:[_user],
    _massage: [mongoose.Schema.ObjectId]

    },{collection : 'groups'})



/*export scema*/
var Group = mongoose.model('Group' , group);
module.exports = Group;