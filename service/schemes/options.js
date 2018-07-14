var mongoose    = require('mongoose');

option = new mongoose.Schema({

    name:{
        type:String,
        index:1,
        required:true
    },
    owner:{
        type:String,
        required:true
    },
    votes_number:{
        type:Number,
        required:true
    }
    
    },{collection : 'options'})



/*export scema*/
var Option = mongoose.model('Option' , option);
module.exports = Option;