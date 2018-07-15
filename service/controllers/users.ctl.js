var _catagories = require('../models/catagories'),
    _groups = require('../models/groups'),
    _options = require('../models/options'),
    _place = require('../models/place'),
    _users = require('../models/users'),
    Promise = require('promise'),
     consts   = require('../consts'),
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
    createUser,
    getAllUsers,
    getEvent
}

function createUser(_email, _name){
        return new Promise((resolve, reject) => {
        if(_name == "" ||  _email == "")
            resolve("invalid input");
        _users.findOne({'email': _email},(err,data)=>{
          if(err){
            console.log(`error:${err}`);
          }
          else if(data == null){
            var newuser = new _users ({
                  name: _name,
                  email: _email,
            });
            newuser.save(
              (err) =>{
                if(err)
                console.log(`err: ${err}`);
                else{
                  resolve(`user ${newuser.name} created`);
                }
              });
            }
            else {
              resolve("user exists");
            }
          });
        });
    }

function getAllUsers(){
        return new Promise((resolve , reject)=>{
            _users.find({} , (err , data)=>{
                if(err){
                    reject(`error : ${err}`);
                }else{
                    console.log('getAllUsers:\n' + data);
                    resolve(data);
                }
            });
        });

    }


 function getEvent(_email,_gropId){
        return new Promise((resolve , reject)=>{

            var selectedGroup = _groups.find({"Id": `${_gropId}`},
                 (err , data)=>{
                    if(err){
                        reject(`error : ${err}`);
                    }else{
                        console.log('group:' + data);
                        //resolve(data);
                          selectedGroup._user.find({_userEmail: `${_email}`} ,
                             (err , data)=>{
                                if(err){
                                    reject(`error : ${err}`);
                                }else{
                                    console.log('user email was found in group:\n' + data);
                                   resolve(data);
                                }
                            });
                    }
                });
        });
    }
