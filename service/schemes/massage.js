var mongoose    = require('mongoose');

massage = new mongoose.Schema({

    _userName:{
        type:String,
        index:1,
        required:true
    },
    _userMassage:{
        type:String,
        required:true
    }
    },{collection : 'massage'})



/*export scema*/
var Massage = mongoose.model('Massage' , massage);
module.exports = Massage;