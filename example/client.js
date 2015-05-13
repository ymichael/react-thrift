var Client = require('../client');
var async = require('async');


var client = new Client();


async.map([
  // Rendering success.
  ['Component1', "{}"],
  ['Component2', JSON.stringify({message: "hello."})],
  // Rendering Error
  ['Non-existent-Component', "{}"],
  ['BuggyComponent', "{}"],
  ['Component1', "Invalid JSON."],
], function(elem, callback) {
  client.renderComponentToString(elem[0], elem[1], function(err, html) {
    callback(null, [elem, err, html]);
  });
}, function(err, data) {
  data.forEach(function(elem) {
    console.log("Elem: ", elem[0]);
    console.log("Exception: ", elem[1]);
    console.log("Html: ", elem[2]);
    console.log("--");
  });
  client .end();
});