var express         = require('express'),
    events          = require('events'),
    url             = require('url'),
    bodyParser      = require('body-parser'),
    categories = require('./controllers/categories.ctl'),
    group = require('./controllers/group.ctl'),
    options = require('./controllers/options.ctl'), 
    users = require('./controllers/users.ctl'),   
    app             = express(),
    port            = process.env.PORT || 3000;

/* bodyParser for json encode*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/assets', express.static(`${__dirname}/public`));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

/****************************************************************/
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/ui/index.html`);
});
/****************************************************************/
app.get('/catagories',(req,res) =>{
    console.log('GET - /catagories');

    categories.getAllCatagories()
        .then(
            (data) => {
                if (!data.length) {
                    console.log('no data return');
                    res.status(404).json('no db is abvileble');

                } else {
                    res.set('Content-Type', 'application/json');
                    res.set('header-One' , 'getAllCatagories');
                    res.status(200).json(data);
                }
            }, (error) => {
                console.log(error);
            });
});

/****************************************************************/
app.get('/catagory/:name',(req,res) =>{
    console.log('GET - /catagory/:name');
    var _catagoryName = req.params.name;
    console.log(_catagoryName);

    categories.getAllCatagoryPlaces(_catagoryName)
        .then(
            (data) => {
                if (!data.length) {
                    console.log('no data return');
                    res.status(404).json('no db is abvileble');

                } else {
                    res.set('Content-Type', 'application/json');
                    res.set('header-One' , 'getAllCatagories');
                    res.status(200).json(data);
                }
            }, (error) => {
                console.log(error);
            });
});
/***************************functionalty for staff******************************/
app.post('/createCatagory',(req,res) =>{
    console.log('GET - /createCatagory');
    var _catagoryName = req.body.name;
    var _catagoryId = req.body.id;

    console.log(_catagoryName);

    categories.createCatagory(_catagoryId,_catagoryName)
        .then(
            (data) => {
                if (!data.length) {
                    console.log('no data return');
                    res.status(404).json('no db is abvileble');

                } else {
                    res.set('Content-Type', 'application/json');
                    res.set('header-One' , 'createCatagory');
                    res.status(200).json(data);
                }
            }, (error) => {
                console.log(error);
            });
});


/*get all Groups*/
/****************************************************************/
app.get('/groups',(req,res) =>{
    console.log('GET - /groups');

    group.getAllGroups()
        .then(
            (data) => {
                if (!data.length) {
                    console.log('no data return');
                    res.status(404).json('no db is abvileble');

                } else {
                    res.set('Content-Type', 'application/json');
                    res.set('header-One' , 'getAllGroups');
                    res.status(200).json(data);
                }
            }, (error) => {
                console.log(error);
            });
});

/*create Groups*/


app.post('/createGroup', (req, res) => {
  group.createGroup(req.body.email, req.body.groupname,req.body.catagory, req.body.discription,req.body.user)
      .then(
            (result, error) => {
                if(result == "invalid input")
                    res.status(200).json({"error" :"invalid input"});
                else
                    res.status(200).json({"message" : result});
                });
});

app.get('/groupById/:id', (req, res) => {
  group.groupById(req.params.id)
      .then(
            (result, error) => {
                if(result == "invalid input")
                    res.status(200).json({"error" :"invalid input"});
                else
                res.status(200).json(result);

                });
});



/*delete Groups*/

app.post('/deleteGroup', (req, res) => {
  group.deleteGroup(req.body.id).then((result, error) => {
    if(result)
      res.status(200).json({"message": "Group deleted"});
  });
});

/*get all options for a group*/

app.get('/getOptionsByGroupId/:groupid', (req, res) => {
  group.getOptionsByGroupId(req.params.groupid)
      .then(
            (data) => {
                if (!data.length) {
                    console.log('no data return');
                    res.status(404).json('no data returnd');

                } else {
                    res.set('Content-Type', 'application/json');
                    res.set('header-One' , 'createCatagory');
                    res.status(200).json(data);
                }
            }, (error) => {
                console.log(error);
            });
});


/*update  Groups*/

app.post('/createOption', (req, res) => {
  options.createOption(req.body.email,req.body.description,req.body.groupname).then(
            (result, error) => {
                if(result == "invalid input")
                    res.status(200).json({"error" :"invalid input"});
                else
                    res.status(200).json({"message" : result});
                });
});

app.post('/updateGroup', (req, res) => {
  group.updateGroup(req.body.email,req.body.name).then((result, error) => {
    if(result)
      res.status(200).json({"message": "Group updated"});
  });
});

app.post('/checkUserInGroup', (req, res) => {
  options.checkUserInGroup(req.body.email,req.body.groupname).then(
            (result, error) => {
                if(result == "invalid input")
                    res.status(200).json({"error" :"invalid input"});
                else
                    res.status(200).json({"message" : result});
                });
});



/*add uder to Group*/

app.post('/addUser', (req, res) => {
  group.addUser(req.body._email,req.body._groupid)
    .then(
            (result, error) => {
                if(result == "invalid input")
                    res.status(200).json({"error" :"invalid input"});
                else
                    res.status(200).json({"message" : result});
                });
});
/*delete user Groups*/

app.put('/deleteUser', (req, res) => {

  group.deleteUser(req.body._email,req.body._groupid).then((result, error) => {
    if(result)
      res.status(200).json({"message": "user deleted member "});
  });
});

/************************* users *****************************/


app.post('/createUser', (req, res) => {
  users.createUser(req.body._email, req.body._name)
      .then(
            (result, error) => {
                if(result == "invalid input")
                    res.status(200).json({"error" :"invalid input"});
                else
                    res.status(200).json({"message" : result});
                });
});

/*get all users*/

app.get('/getAllUsers',(req,res) =>{
    console.log('GET - /get AllUsers');

    users.getAllUsers()
        .then(
            (data) => {
                if (!data.length) {
                    console.log('no data return');
                    res.status(404).json('no db is abvileble');

                } else {
                    res.set('Content-Type', 'application/json');
                    res.set('header-One' , 'getAllGroups');
                    res.status(200).json(data);
                }
            }, (error) => {
                console.log(error);
            });
});


/************************** event ******************************/

app.post('/getEvent',(req,res) =>{
    console.log('post - /getEvent');
    var _email = req.body.email;
    var _gropId= req.body.grop;

    console.log(_email);
    console.log(_gropId);

    users.getEvent(_email,_gropId)
        .then(
            (data) => {
                if (!data.length) {
                    console.log('no data return');
                    res.status(404).json('no db is abvileble');

                } else {
                    res.set('Content-Type', 'application/json');
                    res.set('header-One' , 'getEvent');
                    res.status(200).json(data);
                }
            }, (error) => {
                console.log(error);
            });
});



/*************************vote******************************/

app.get('/getAllOptions',(req,res) =>{
    console.log('GET - /options');

    options.getAllOptions()
        .then(
            (data) => {
                if (!data.length) {
                    console.log('no data return');
                    res.status(404).json('no db is abvileble');

                } else {
                    res.set('Content-Type', 'application/json');
                    res.set('header-One' , 'getAllCatagories');
                    res.status(200).json(data);
                }
            }, (error) => {
                console.log(error);
            });
});


app.get('/optionById/:id', (req, res) => {
  options.optionById(req.params.id)
      .then(
            (result, error) => {
                if(result == "invalid input")
                    res.status(200).json({"error" :"invalid input"});
                else
                    res.status(200).json({"message" : result});
                });
});

app.get('/getAllOptionsByGroup/',(req,res) =>{
    console.log('GET - /options');

    group.getAllOptionsByGroup(_groupid)
        .then(
            (data) => {
                if (!data.length) {
                    console.log('no data return');
                    res.status(404).json('no db is abvileble');

                } else {
                    res.set('Content-Type', 'application/json');
                    res.set('header-One' , 'getAllCatagories');
                    res.status(200).json(data);
                }
            }, (error) => {
                console.log(error);
            });
});

app.post('/addVote', (req, res) => {
  options.addVote(req.body.email,req.body.description,req.body.groupname)
      .then(
            (result, error) => {
                if(result == "invalid input")
                    res.status(200).json({"error" :"invalid input"});
                else
                    res.status(200).json({"message" : result});
                });
});

/*************************end******************************/
//app.all('*', (req, res, next) => {
//    console.log(`get.all * middleware + ${req.path}`);
//    next();
//})

app.get('/includes/css/myStyle.css', (req, res) => {
    res.sendFile(`${__dirname}/includes/css/myStyle.css`);
});

app.get('/public/:image', (req, res) => {
    var img = req.params.image;
    res.sendFile(`${__dirname}/public/${img}`);
});

app.all('*',(req,res) =>{
    res.send('Got lost? This is a friendly 404 page :) :)');
});


app.listen(port,()=>{console.log(`listen on port ${port}`);});


