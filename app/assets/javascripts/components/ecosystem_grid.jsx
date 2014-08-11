/** @jsx React.DOM */
var React = require('react');

/**
 * Expects state params of
 * game - a JSON representation of a Game model with nested life models.
 */
var EcosystemGrid = React.createClass({
  getDefaultProps: function() {
    return {
      size: 40 // 40x40
    };
  },

  _isAlive: function(x, y) {
    // TODO: grab this data from the object in state
    if (x === 1 && y === 3) {
      return true;
    }
    return false;
  },

  _renderRow: function(y) {
    var tiles = [];
    for (var x = 0, innerLen = this.props.size; x < innerLen; x ++) {
      var tileClasses = ['ecosystem__grid__tile'];
      if (this._isAlive(x, y)) {
        tileClasses.push('ecosystem__grid__tile--alive');
      }
      // TODO: why won't jsHint stop flagging ES6 string templates as wrong?
      var tileKey = String(x) +  '-' + String(y);
      // TODO: get jsxhint running so jshints tops complaining
      tiles.push((<div className={tileClasses.join(' ')} key={tileKey} />));
    }

    return (
      <div className="ecosystem__grid__row clearfix">
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
      <div className="ecosystem__grid">
        {this._renderTiles()}
      </div>
    );
  }
});

module.exports = EcosystemGrid;
