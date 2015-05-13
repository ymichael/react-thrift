var thrift = require('thrift');
var React = require('react');
var ReactThrift = require('./gen-nodejs/ReactThrift');
var ttypes = require('./gen-nodejs/react_types');


var Server = function(thriftServerOptions) {
  this._nameToComponents = {};
  this._thriftServer = thrift.createServer(
    ReactThrift,
    {renderComponentToString: this._renderComponentToString.bind(this)},
    thriftServerOptions || {});
};


Server.prototype.registerComponent = function(name, reactClass) {
  this._nameToComponents[name] = React.createFactory(reactClass);
  return this;
};


Server.prototype._renderComponentToString = function(name, props, result) {
  var isRegistered = name in this._nameToComponents;
  if (!isRegistered) {
    var e = "Component Not Found: " + name;
    console.log(e);
    result(new ttypes.ServerException({error: e}));
    return
  }
  var componentFactory = this._nameToComponents[name];
  try {
    var props = JSON.parse(props);
  } catch (e) {
    var e = "Invalid JSON: " + props;
    console.log(e);
    result(new ttypes.ServerException({error: e}));
    return
  }
  try {
    var html = React.renderToString(componentFactory(props));
    result(null, html);
  } catch (e) {
    var e = "React Error: " + e.toString()
    console.log(e);
    result(new ttypes.ServerException({error: e}));
    return
  }
};


Server.prototype.listen = function(port) {
  this._thriftServer.listen(port || 9090);
};


module.exports = Server