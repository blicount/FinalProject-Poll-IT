var mongoose    = require('mongoose');

user = new mongoose.Schema({

    _userName:{
        type:String,
        required:true
    },
    _userEmail:{
        type:String,
        required:true
    },
    },{collection : 'place'})



/*export scema*/
var User = mongoose.model('User' , user);
//module.exports = User;
module.exports = user;