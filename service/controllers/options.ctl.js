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
    createOption,
    getAllOptions,
    checkUserInGroup,
    addVote,
    optionById

}
function checkUserInGroup(_email,_groupname){
         return new Promise((resolve, reject) => {
            _groups.findOne({'name': _groupname}, (err, rec) => { 
                 
                if(err){
                    console.log(`error : ${err}`)
                }
                else{
                    console.log(`${rec.usersEmail}`)
                    for(let i in rec.usersEmail){
                        if(rec.usersEmail[i]==null)
                            break;
                        if (rec.usersEmail[i]==_email)
                            resolve(true);  
                        } 
                    resolve(false);
                    }
                });
            });
        }

function createOption(_email,_description,_groupname){
        return new Promise((resolve, reject) => {
            console.log(`${_email}`);
            console.log(`${_description}`);
            if(_description == null ||  _email == null)
                resolve("invalid input");
           /*if(!checkUserInGroup(_email,_groupname))
                resolve("user not member of the group");*/
                var newoption = new _options ({
                email: _email,
                description: _description,    
                votes_number: 0,   
                });
                newoption.save(
                    (err) =>{
                        if(err)
                            console.log(`err: ${err}`);
                        else{
                            _groups.findOne({'name': _groupname},
                                (err,data)=>{
                                    if(err)
                                        reject(`err:${err}`);
                                    else if(data==null)
                                        resolve("group not exsit");
                                    _options.findOne({'description': _description,'email': _email,},(err,data2)=>{
                                    _groups.update({'name': _groupname}, {$push: {'options': data2._id}},
                                        (err) => {
                                            if(err)
                                                reject(`err:${err}`);
                                            else{
                                                resolve("option add to the group");
                                            }
                                        });
                                    });
                               
                                });
                            }
                        });
                });
            } 

 function getAllOptions(){
        return new Promise((resolve , reject)=>{
            _options.find({} , (err , data)=>{
                if(err){
                    reject(`error : ${err}`);
                }else{
                    console.log('getAllOptions:\n' + data); 
                    resolve(data);
                }
            });
        });

    }  

 function optionById(id){
        return new Promise((resolve , reject)=>{
            _options.find({'_id':id} , (err , data)=>{
                if(err){
                    reject(`error : ${err}`);
                }else{
                    console.log('optionById:\n' + data); 
                    resolve(data);
                }
            });
        });

    }

   function addVote(_email,_description,_groupname){
       return new Promise((resolve , reject)=>{
            _options.findOne({'description': _description,'email': _email,}, 
                (err , data)=>{
                    if(err){
                        reject(`error : ${err}`);
                    }else{
                        /*if(!checkUserInGroup(_email,_groupname))
                            resolve("user not member of the group");*/
                        if(data==null)
                            resolve('option not found');
                        _options.update({'description': _description,'email': _email},{$inc: {'votes_number': 1 }},
                        (err) => {
                            if(err)
                                reject(`err:${err}`);
                            else{
                                resolve('the number of vote incremented');
                            }
                        });
                    }
                });
            }); 
        }
    