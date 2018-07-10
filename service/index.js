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
  pollItService.createGroup(req.body.id, req.body.name, req.body.manger)
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

/*delete Member Groups*/

app.post('/deleteMember', (req, res) => {

  pollItService.deleteMember(req.body.id,req.body.email).then((result, error) => {
    if(result)
      res.status(200).json({"message": "member deleted"});
  });
});

/*update  Groups*/



app.post('/updateGroup', (req, res) => {
  pollItService.updateGroup(req.body.email,req.body.name).then((result, error) => {
    if(result)
      res.status(200).json({"message": "Group updated"});
  });
});




/**************************event******************************/

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


