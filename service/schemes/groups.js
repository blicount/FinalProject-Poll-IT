var mongoose    = require('mongoose'),
    _massage    = require('./massage'),
    _user    = require('./user'),
    _opsions = require('./options');



group = new mongoose.Schema({

    name:{
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
    location:{
        type:String
    },
    options: [
        {type: mongoose.Schema.Types.ObjectId, ref: "options"}
    ],
    users:[
        {type: mongoose.Schema.Types.ObjectId, ref: "users"}
    ],
    massages: [
        {type: mongoose.Schema.Types.ObjectId, ref: "massage"}
         ],
    pic:{
        type:String
    }
    },{collection : 'groups'})



/*export scema*/
var Group = mongoose.model('Group' , group);
module.exports = Group;