var couchbase = require('couchbase');
var myCluster = new couchbase.Cluster('couchbase://127.0.0.1:8091');
var myBucket = myCluster.openBucket('ultimate_software', '0okmnji9');

myBucket.on('error', function (err) {
    console.log('ERROR OPEN COUCHBASE myBucket: ', err);
});

var ViewQuery = couchbase.ViewQuery;
var N1qlQuery = couchbase.N1qlQuery;

var tokenLife = 4030;

//export all vars
module.exports.myBucket = myBucket;
module.exports.N1qlQuery = N1qlQuery;
module.exports.cbErrors = myCluster.errors;
module.exports.ViewQuery = ViewQuery;