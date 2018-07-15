var mongoose    = require('mongoose'),
    _massage    = require('./massage'),


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
    description:{
        type:String
    },
    options: [String],
    usersEmail:[String],
    massages: [
        {type:String}
         ],
    pic:{
        type:String
    }
    },{collection : 'groups'})



/*export scema*/
var Group = mongoose.model('Group' , group);
module.exports = Group;