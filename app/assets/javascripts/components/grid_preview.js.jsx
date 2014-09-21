/** @jsx React.DOM */
var GameStores = require('../stores/game_stores'),
    Grid = require('./grid'),
    GridTile = require('./grid_tile'),
    React = require('react');

var GridPreview = React.createClass({
  componentDidMount: function() {
    GameStores.addChangeListener(this._onChange);
    // No need to fetch the games - the parent component does that.
  },

  _onChange: function() {
    this.setState(this._fetchCurrentGameState());
  },

  _fetchCurrentGameState: function() {
    var currentGame = GameStores.getCurrentGame();
    return {
      livesRecord: this._setLives(currentGame.lives)
    };
  },

  componentWillUnmount: function() {
    this._stopPlayMode();
    GameStores.removeChangeListener(this._onChange);
  },

  getInitialState: function() {
    return this._fetchCurrentGameState();
  },

  _setLives: function(nextLifeCoords) {
    var livesRecord = {};
    nextLifeCoords.forEach(function (lifeCoords) {
      var x = lifeCoords.x_coord,
          y = lifeCoords.y_coord,
          coords = [x, y].join(',');

      livesRecord[coords] = true;
    });
    return livesRecord;
  },

  render: function() {
    return (
      <div className="grid-preview">
        <Grid
          tileSize="tiny"
          playMode={this.state.playMode}
          livesRecord={this.state.livesRecord} />
      </div>
    );
  }
});

module.exports = GridPreview;
