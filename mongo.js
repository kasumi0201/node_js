var MongoClient = require('mongodb').MongoClient,
settings = require('./settings');
MongoClient.connect("mongodb://localhost/"+settings.db, function(err,db){
  if(err) { return console.dir(err); }
  console.log("connected to db");
  db.collection("users", function(err, collection){
    var docs = [
      {name: "kasumi", score: 40},
      {name: "yui", score: 30},
      {name: "jun", score: 70},
    ];
    collection.insert(docs, function(err, result){
      console.dir(result);

    });
  });
});
