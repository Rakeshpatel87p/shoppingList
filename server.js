var express = require('express');

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = { name: name, id: this.id };
    this.items.push(item);
    this.id += 1;
    return item;
};

Storage.prototype.delete = function(positionOfObject) {
    this.items.splice(positionOfObject, 1);
    for(i = 0; i < storage.items.length; i++){
        this.items[i].id = i;
    }; 
}

Storage.prototype.edit = function(positionOfObject, editedName){
    this.items[positionOfObject].name = editedName;
}

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

// When to use jsonParser? Necessary here? For put?
app.delete('/items/:id', jsonParser, function(req, res) {
    var id = req.params.id;
    var positionOfObject = findObject(id);
    storage.delete(positionOfObject);
    // What does this .json do?
    res.status(200).json({});

});

app.put('items/:id', jsonParser, function(req, res){
    var id = req.params.id;
    var positionOfObject = findObject(id);
    storage.edit(positionOfObject, req.body.name);
    res.json({});

});

var findObject = function(id) {
    for (var i = 0; i < storage.items.length; i++) {
        if (storage.items[i].id == id) {
            return i
        }
    }
    return -1

}

app.listen(process.env.PORT || 8080);

// exports.app = app;
// exports.storage = storage;
