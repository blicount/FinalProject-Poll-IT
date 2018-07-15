var _catagories = require('../models/catagories'),
    _groups = require('../models/groups'),
    _options = require('../models/options'),
    _place = require('../models/place'),
    _users = require('../models/users'),
    Promise = require('promise'),
     consts  = require('../consts'),
    Promise = require('promise'),
    mongoose = require('mongoose'), //Import the mongoose module
    mongoDB = consts.MLAB_KEY;//Set up default mongoose connection


console.log('connect to db');
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

/*Get connection*/
var db = mongoose.connection;

/*Bind connection with error event*/
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = {
    getAllCatagories,
    getAllCatagoryPlaces,
    createCatagory
}

 function getAllCatagories(){
        return new Promise((resolve , reject)=>{
            _catagories.find({} , (err , data)=>{
                if(err){
                    reject(`error : ${err}`);
                }else{
                    console.log('getAllCatagories:\n' + data);
                    resolve(data);
                }
            });
        });

    }

 function getAllCatagoryPlaces(catagory_name){
        return new Promise((resolve , reject)=>{
            _place.find({catagory:`${catagory_name}`} , (err , data)=>{
                if(err){
                    reject(`error : ${err}`);
                }else{
                    console.log('getAllCatagoryPlaces:\n' + data);
                    resolve(data);
                }
            });
        });

    }

function createCatagory(id,name){
        return new Promise((resolve,reject)=>{
            var catagory = new _catagories({
                _catagoryId:`${id}`,
                _catagoryName:`${name}`
            });

            catagory.save(
                (err)=>{
                    if(err)
                        console.log(`err: ${err}`)
                    else{
                        console.log(`save catagory:${catagory}`);
                    }
                });
        });
    }