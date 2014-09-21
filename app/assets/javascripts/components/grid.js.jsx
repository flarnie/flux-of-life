/** @jsx React.DOM */
var GridTile = require('./grid_tile'),
    React = require('react');

var Grid = React.createClass({
  propTypes: {
    livesRecord: React.PropTypes.object,
    playMode: React.PropTypes.bool,
    size: React.PropTypes.number,
    tileSize: React.PropTypes.string,
    onActiveTileClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      size: 40,
      tileSize: 'medium',
      livesRecord: {}
    };
  },

  _handleActiveTileClick: function(coords) {
    this.props.onActiveTileClick(coords);
  },

  _renderRow: function(y) {
    var tiles = [];
    for (var x = 0, innerLen = this.props.size; x < innerLen; x ++) {
      var coords = [x, y].join(',');
      var tileKey = String(x) +  '-' + String(y);
      var theTileClick = (this.props.playMode) ?
        $.nooop : this._handleActiveTileClick.bind(this, coords);
      tiles.push((
        <GridTile
          size={this.props.tileSize}
          alive={this.props.livesRecord[coords]}
          inPlay={this.props.livesRecord[coords] && this.props.playMode}
          onClick={theTileClick}
          key={tileKey}
        />
      ));
    }

    return (
      <div
        key={['row-', y].join('')}
        className="grid__row clearfix">
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
