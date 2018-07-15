var mongoose    = require('mongoose');

option = new mongoose.Schema({

    description:{
        type:String,
        required:true
    },
    email:{
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

 
    