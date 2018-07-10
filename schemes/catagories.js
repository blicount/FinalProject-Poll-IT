var mongoose    = require('mongoose');

catagories = new mongoose.Schema({

    _catagoryId:{
        type:Number,
        index:1,
        required:true
    },
    _catagoryName:{
        type:String,
        required:true
    },
    },{collection : 'catagories'})



/*export scema*/
var Catagories = mongoose.model('Catagories' , catagories);
module.exports = Catagories;