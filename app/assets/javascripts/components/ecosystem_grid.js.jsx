/** @jsx React.DOM */
var GameStores = require('../stores/game_stores'),
    React = require('react');

/**
 * Expects state params of
 * game - a JSON representation of a Game model with nested life models.
 */
var EcosystemGrid = React.createClass({
  getDefaultProps: function() {
    return {
      size: 40
    };
  },

  getInitialState: function() {
    return { livesRecord: this._setLives() };
  },

  _setLives: function() {
    var livesRecord = {};
    this.props.game.lives.forEach(function (lifeCoords) {
      var x = lifeCoords.x_coord,
          y = lifeCoords.y_coord,
          coords = `${x},${y}`;

      livesRecord[coords] = true;
    });
    return livesRecord;
  },

  _renderRow: function(y) {
    var tiles = [];
    for (var x = 0, innerLen = this.props.size; x < innerLen; x ++) {
      var tileClasses = ['ecosystem__grid__tile'];
      var coords = [x, y].join(',');
      if (this.state.livesRecord[coords]) {
        tileClasses.push('ecosystem__grid__tile--alive');
      }
      var tileKey = String(x) +  '-' + String(y);
      tiles.push((<div className={tileClasses.join(' ')} key={tileKey} />));
    }

    return (
      <div
        key={`row-${y}`}
        className="ecosystem__grid__row clearfix">
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
    this._setLives();
    return (
      <div className="ecosystem__grid">
        {this._renderTiles()}
      </div>
    );
  }
});

module.exports = EcosystemGrid;
