//============================================================
// Requiring express (Talks to DataBase)
//============================================================
var express = require('express');
var app = express();
//============================================================
// Requireing mongojs (DataBase)
//============================================================
var mongojs = require('mongojs');
//============================================================
// Requiring bodyParser (Parses Json data)
//============================================================
var bodyParser = require('body-parser');

var db = mongojs('localhost/test', ['userFormDB']);

//============================================================
// express section so the server can see the project
//============================================================
app.use(express.static(__dirname + "/public"));
//============================================================
// bodyParser used to parse the json file sent to the server
//====================================================yeah ========
app.use(bodyParser.json());

app.get('/contactList', function (req, res) {
    console.log("I received a GET request");

    db.userFormDB.find(function (err, docs) {
        console.log('docs');
        res.json(docs);
    });

});

app.post('/contactList', function (req, res) {
    console.log(req.body);
    db.userFormDB.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});

app.delete('/contactList/:id', function (req, res) {
    var id = req.params.id;
    db.userFormDB.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.get('/contactList/:id', function (req, res) {
    var id = req.params.id;
    db.userFormDB.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.put('/contactList/:id', function (req, res) {
    var id = req.params.id;
    db.userFormDB.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name, email: req.body.email}},
        new: true
    }, function (err, doc) {
        res.json(doc);
    });
});

app.listen(3000);
console.log("Sever running on port 3000");