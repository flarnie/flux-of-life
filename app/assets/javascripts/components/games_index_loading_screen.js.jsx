/** @jsx React.DOM */
var React = require('react');

var GamesIndexLoadingScreen = React.createClass({
  render: function() {
    return (
      <div className="games-index-loading-screen">
        <h2 className="games-index-loading-screen__text">Loading...</h2>
      </div>
    );
  }
});

module.exports = GamesIndexLoadingScreen;
