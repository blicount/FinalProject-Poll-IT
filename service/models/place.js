var mongoose    = require('mongoose');

place = new mongoose.Schema({

    _placeId:{
        type:Number,
        index:1,
        required:true
    },
    _placeName:{
        type:String,
        required:true
    },
     _placeImg:{
        type:String,
        required:true
    },
    _placeStars:{
        type:Number,
        index:1,
        required:true
    },
    _placeCatagory:{
        type:String,
        required:true
    },
    _placeAddreas:{
        type:String,
        required:true
    }
    },{collection : 'place'})



/*export scema*/
var Place = mongoose.model('Place' , place);
module.exports = Place;