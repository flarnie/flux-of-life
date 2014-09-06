/** @jsx React.DOM */
var React = require('react');

var GridLoadingScreen = React.createClass({
  render: function() {
    return (
      <div className="grid-loading-screen">
        <h2 className="grid-loading-screen__text">Loading...</h2>
      </div>
    );
  }
});

module.exports = GridLoadingScreen;
