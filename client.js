var thrift = require('thrift');
var ReactThrift = require('./gen-nodejs/ReactThrift');


var Client = function(host, port) {
  this._host = host || 'localhost';
  this._port = port || 9090;
  this._connection = thrift.createConnection(this._host, this._port);
  this._connection.on('error', function(err) {
    console.log(err);
  });
  this._thriftClient = thrift.createClient(ReactThrift, this._connection);

  // Public methods.
  this.renderComponentToString = this._thriftClient.renderComponentToString.bind(this._thriftClient);
  this.close = this.end = this._connection.end.bind(this._connection);
};

module.exports = Client;
