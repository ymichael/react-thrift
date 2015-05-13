var Server = require('../server');
var React = require('react');
var DOM = React.DOM;
var div = DOM.div;
var span = DOM.span;

/**
 * Dummy Components
 */
var Component1 = React.createClass({
  render: function() {
    return span(null, "Test");
  },
});

var Component2 = React.createClass({
  getDefaultProps: function() {
    return {message: "Yo"};
  },
  render: function() {
    return div(null, this.props.message);
  },
});

var BuggyComponent = React.createClass({
  render: function() {
    return span(null, ERROR);
  },
});

var s = new Server();
s.registerComponent("Component1", Component1);
s.registerComponent("Component2", Component2);
s.registerComponent("BuggyComponent", BuggyComponent);
s.listen();