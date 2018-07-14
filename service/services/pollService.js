var _catagories = require('../schemes/catagories'),
    _place = require('../schemes/place'),
    _groups = require('../schemes/groups'),
    _users = require('../schemes/user'),
    _options = require('../schemes/options'),
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




module.exports = class catagories{

    /*************************catagorys function****************************/
    /*Return all data of twitter news from (mlab)db*/
    getAllCatagories(){
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

    getAllCatagoryPlaces(catagory_name){
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

    createCatagory(id,name){
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



    /*************************group function****************************/
    getAllGroups(){
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

    
    

    createGroup(_name, _manger){
        return new Promise((resolve, reject) => {
        if(_name == "" ||  _manger == "")
            resolve("invalid input");

        _groups.findOne({'name': _name},(err,data)=>{
          if(err){
            console.log(`error:${err}`);
          }
          else if(data == null){
            var newgroup = new _groups ({
                  name: _name,
                  creation_date: new Date(),
                  manger: _manger,
                  winner: null, 
                  location : null,
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
    
    
    getOptionsByGroup(Groupid){
    _groups.findOne({ "_id": Groupid }, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).send({ "Message": "Owner ID was not found in the system" });
    }
    console.log(docs);
    res.status(200).json(docs);
  })
        
    }
      

    deleteGroup(id){
      return new Promise((resolve, reject) => {
          _groups.remove({"Id": id}, (err) => {
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


    deleteMember(_id,_email){
      return new Promise((resolve, reject) => {
             console.log(`${_id}`);  
                        console.log(`${_email}`);
            _groups.find({"Id": _id},
                    (err,data) =>{
                        if(err){
                        console.log(`her errror2`);  
                        console.log(`err: ${err}`);
                        //_user:{$in:_userEmail:`${_email}`
                    }
                    else{ 
                        console.log('deleteMember:\n' + data);   
                        _groups.remove({_userEmail:`${_email}`},
                            (err) =>{
                                if(err){
                              console.log(`err: ${err}`);
                             }
                          });
                    }

                    });
                   resolve(true);
                  
                });
              }


        updateGroup(id,name, manger){
          return new Promise((resolve, reject) =>{
                _groups.update({"Id":id},{'Name': name},{multi:true}, 
                    (err) => {
                        if(err)
                         console.log(`err: ${err}`);
                        });
                resolve(true);
                });

              

        }
    
    addUser(_email,_groupid){
        console.log("got here");
         return new Promise((resolve, reject) => {
             console.log("got here 2");
              console.log(`${_email}`);
              console.log(`${_groupid}`);
             _users.findOne({'email': _email}, (err, rec) => { 
            console.log("got here 3");
              if(err){
                    reject(err);
              }
              else{
                  console.log("got here 4");
                _groups.update({'_id': _groupid}, {$push: {'users': rec._id}},
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

/*************************Event function**********************/

    getEvent(_email,_gropId){
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

/*************************** Votes ************************/
    
     getAllOptions(){
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





}


