/** @jsx React.DOM */
var GameStores = require('../stores/game_stores'),
    GridTile = require('./grid_tile'),
    React = require('react');

/**
 * Expects state params of game - a JSON representation of a Game model with
 * nested life models.
 */
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

  getDefaultProps: function() {
    return {
      size: 40
    };
  },

  _renderRow: function(y) {
    var tiles = [];
    for (var x = 0, innerLen = this.props.size; x < innerLen; x ++) {
      var coords = [x, y].join(',');
      var tileKey = String(x) +  '-' + String(y);
      tiles.push((
        <GridTile
          size="tiny"
          alive={this.state.livesRecord[coords]}
          inPlay={this.state.livesRecord[coords] && this.state.playMode}
          key={tileKey}
        />
      ));
    }

    return (
      <div
        key={['row-', y].join('')}
        className="grid-preview__row clearfix">
        {tiles}
      </div>
    );
  },

  _renderTiles: function() {
    var rows = [];
    for (var y = 0, len = this.props.size; y < len; y ++) {
      rows.push(this._renderRow(y));
    }

    return rows;
  },

  render: function() {
    return (
      <div className="grid-preview">
        {this._renderTiles()}
      </div>
    );
  }
});

module.exports = GridPreview;
