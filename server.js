var express = require('express');

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
    res.json(storage.items);
});

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item);
});

app.delete('/items/:id', jsonParser, function(req, res){
    var id = req.params.items.id;    

    // var itemToDelete = storage.items.filter(function(obj){
    //     return obj.id == req.body.params.items.id
    // })
    // console.log(itemToDelete);
    // app.get('/items', function(req, res) {
    //     res.json(itemToDelete)
// });
    
});

app.listen(process.env.PORT || 8080);

// exports.app = app;
// exports.storage = storage;