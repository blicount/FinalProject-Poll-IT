var express         = require('express'),
    events          = require('events'),
    url             = require('url'),
    bodyParser      = require('body-parser'),
    POLLIT          = require('./services/pollService'),
    app             = express(),
    port            = process.env.PORT || 3000;

/*TWS = Twitter Web Service*/
pollItService = new POLLIT();

//app.set('ManageNewsInTwitter');

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

    pollItService.getAllCatagories()
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

    pollItService.getAllCatagoryPlaces(_catagoryName)
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

    pollItService.createCatagory(_catagoryId,_catagoryName)
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

    pollItService.getAllGroups()
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
  pollItService.createGroup(req.body.email, req.body.groupname,req.body.catagory, req.body.discription,req.body.user)
      .then(
            (result, error) => {
                if(result == "invalid input")
                    res.status(200).json({"error" :"invalid input"});
                else
                    res.status(200).json({"message" : result});
                });
});



/*delete Groups*/

app.post('/deleteGroup', (req, res) => {
  pollItService.deleteGroup(req.body.id).then((result, error) => {
    if(result)
      res.status(200).json({"message": "Group deleted"});
  });
});

/*get all options for a group*/

app.get('/getOptionsByGroup/:groupid', (req, res) => {
  pollItService.getOptionsByGroup(req.params.groupid)
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


/*update  Groups*/

app.post('/createOption', (req, res) => {
  pollItService.createOption(req.body.email,req.body.description,req.body.groupname).then((result, error) => {
    if(result)
      res.status(200).json({"message": "option created"});
  });
});

app.post('/updateGroup', (req, res) => {
  pollItService.updateGroup(req.body.email,req.body.name).then((result, error) => {
    if(result)
      res.status(200).json({"message": "Group updated"});
  });
});

/*add uder to Group*/

app.post('/addUser', (req, res) => {
  pollItService.addUser(req.body._email,req.body._groupid)
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

  pollItService.deleteUser(req.body._email,req.body._groupid).then((result, error) => {
    if(result)
      res.status(200).json({"message": "user deleted member "});
  });
});

/************************* users *****************************/


app.post('/createUser', (req, res) => {
  pollItService.createUser(req.body._email, req.body._name)
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

    pollItService.getAllUsers()
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

    pollItService.getEvent(_email,_gropId)
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

app.get('/options',(req,res) =>{
    console.log('GET - /options');

    pollItService.getAllOptions()
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

app.get('/options/',(req,res) =>{
    console.log('GET - /options');

    pollItService.getAllOptionsForGroup(_groupid)
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
  pollItService.addVote(req.body.GroupID,req.body.VoteID)
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


