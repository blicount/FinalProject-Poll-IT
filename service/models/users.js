var mongoose    = require('mongoose');

user = new mongoose.Schema({


    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
    },{collection : 'users'})



/*export scema*/
var User = mongoose.model('User' , user);
//module.exports = User;
module.exports = User;