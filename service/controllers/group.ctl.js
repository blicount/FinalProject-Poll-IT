var _catagories = require('../models/catagories'),
    _groups = require('../models/groups'),
    _options = require('../models/options'),
    _place = require('../models/place'),
    _users = require('../models/users'),
    options = require('./options.ctl'),
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
    getAllGroups,
    createGroup,
    deleteGroup,
    deleteUser,
    updateGroup,
    addUser,
    getOptionsByGroupId,
    finishGroup,
    groupById
    
}

 function getAllGroups(){
        return new Promise((resolve , reject)=>{
            _groups.find({} , (err , data)=>{
                if(err){
                    reject(`error : ${err}`);
                }else{
                    console.log('getAllGroups:\n' + data); 
                    resolve(data);
                }
            });
        });

    }

 function groupById(id){
        return new Promise((resolve , reject)=>{
            _groups.find({'_id':id} , (err , data)=>{
                if(err){
                    reject(`error : ${err}`);
                }else{
                    console.log('groupById:\n' + data); 
                    resolve(data);
                }
            });
        });

    }

    function getOptionsByGroupId(groupid){
        var array;
        return new Promise((resolve , reject)=>{
            _groups.findOne({'_id':groupid}, (err , rec)=>{
                console.log(rec.options);
                
              /*rec.options.forEach(value,key) =>{
                    array.push(options.optionById(value));
                    if(err){
                    reject(`error : ${err}`);
                    }else{
                   resolve(array);
                    }
                }*/
            });
        });
    }
/*rec.options.forEach(value,key) =>{
array.push(options.optionById(value)); }*/

 function createGroup(_email, _groupname,_category,_discription,_usersArr){
        return new Promise((resolve, reject) => {
        if(_groupname == "" ||  _email == "")
            resolve("invalid input");

        _groups.findOne({'name': _groupname},(err,data)=>{
          if(err){
            console.log(`error:${err}`);
          }
          else if(data == null){
            var newgroup = new _groups ({
                  name: _groupname,
                  creation_date: new Date(),
                  manger: _email,
                  winner: null, 
                  location : _category,
                  descreption : _discription,
                  usersEmail:_usersArr,
            });
            newgroup.save(
              (err) =>
              {
                if(err)
                console.log(`err: ${err}`);
                else{
                  resolve(`group ${newgroup.name} created`);
                }
              });
            }
            else {
              resolve("user exists");
            }
          });
        });
    }
    

   function deleteGroup(id){
      return new Promise((resolve, reject) => {
          _groups.remove({'_id': id}, (err) => {
              if(err){
                console.log(`err: ${err}`);
                resolve(false);
                }
              else{
                console.log(`remove: ${id}`);
                resolve(true);
                }
              });
          });
    }


    function deleteUser(_email,_groupid){
      return new Promise((resolve, reject) => {  
            _users.findOne({'usersEmail': _email},(err,rec) =>{
                if(err){
                    reject(err);
                }
                else{
                    _groups.update({'_id': _groupid}, {$pull: {'usersEmail': rec.email}},
                    (err) => {
                        if(err)
                            reject(`err:${err}`);
                        else{
                            resolve(true);
                            }
                        }
                    );
                }   
            }); 
        });
    }

      function updateGroup(id,name, manger){
          return new Promise((resolve, reject) =>{
                _groups.update({'_id':id},{'name': name},{multi:true}, 
                    (err) => {
                        if(err)
                         console.log(`err: ${err}`);
                        });
                resolve(true);
                });    

        }

    function addUser(_email,_groupid){
         return new Promise((resolve, reject) => {
             _users.findOne({'email': _email}, (err, rec) => { 
              if(err){
                    reject(err);
              }
              else if(rec == null) {
                  resolve("email not exists");
              }
                    else{
                    _groups.update({'_id': _groupid}, {$push: {'usersEmail': rec.email}},
                    (err) => {
                        if(err)
                            reject(`err:${err}`);
                        else{
                            resolve("user add to group");
                        }
                    });
                }       
             }); 
        });
    }


    function finishGroup(_groupname){
    
}
