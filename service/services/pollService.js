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

    
    

    createGroup(_email, _groupname,_category,_discription,_usersArr){
        console.log(`${_email}`);
        console.log(`${_groupname}`);
        console.log(`${_category}`);
        console.log(`${_discription}`);
        console.log(`${_usersArr}`);
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
    

      

    deleteGroup(id){
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


    deleteUser(_email,_groupid){
      return new Promise((resolve, reject) => {  
            _users.findOne({'email': _email},(err,rec) =>{
                if(err){
                    reject(err);
                }
                else{
                    _groups.update({'_id': _groupid}, {$pull: {'users': rec._id}},
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

    getOptionsByGroup(_groupid){
        return new Promise((resolve , reject)=>{
            _groups.find({'id':_groupid} , (err , rec)=>{
                if(err){
                    reject(`error : ${err}`);
                }else{
             for(let i in rec.options)
                _options.find({},(err,data) =>{
                    if(err){
                        reject(`error : ${err}`);
                    }else{
                        resolve(data);
                        }
                    }); 
                }
            });
        });
    }


/************************* users *****************************/
    
    createUser(_email, _name){
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
    
    getAllUsers(){
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
    
    createOption(_email,_description,_groupname){
        var id;
        return new Promise((resolve, reject) => {
            if(_description == "" ||  _email == "")
                resolve("invalid input");
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
                            _groups.findOne({'name': _groupname},(err,data)=>{
                            _options.findOne({'description': _description,'email': _email,},(err,data2)=>{
                            id = data2._id;
                            console.log(`iiiiiiddddddddd: ${id}`);
                            });
                                if(err){
                                    reject(err);
                                    }
                                else{
                                    console.log(`${id}`)
                                    _groups.update({'name': _groupname}, {$push: {'options': id}},
                                        (err) => {
                                            if(err)
                                                reject(`err:${err}`);
                                            else{
                                                resolve(true);
                                            }
                                        });
                                    }    
                                });
                            }
                        });
                });
            } 
    
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

