/** @jsx React.DOM */
var GridTile = require('./grid_tile'),
    React = require('react');

var Grid = React.createClass({
  propTypes: {
    livesRecord: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      size: 40,
      tileSize: 'medium',
      livesRecord: {}
    };
  },

  _renderRow: function(y) {
    var tiles = [];
    for (var x = 0, innerLen = this.props.size; x < innerLen; x ++) {
      var coords = [x, y].join(',');
      var tileKey = String(x) +  '-' + String(y);
      tiles.push((
        <GridTile
          size={this.props.tileSize}
          alive={this.props.livesRecord[coords]}
          inPlay={this.props.livesRecord[coords] && this.props.playMode}
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
      <div className={`grid grid--${this.props.tileSize}`}>
        {this._renderTiles()}
      </div>
    );
  }
});

module.exports = Grid;
