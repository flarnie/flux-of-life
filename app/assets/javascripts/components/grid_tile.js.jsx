/** @jsx React.DOM */
var React = require('react');

var GridTile = React.createClass({
  getDefaultProps: function() {
    return {
      alive: false,
      inPlay: false
    };
  },

  render: function() {
    var classes = {
      'grid-tile': true,
      'grid-tile--alive': this.props.alive,
      'grid-tile--in-play': this.props.inPlay
    };

    return (
      <div
        className={React.addons.classSet(classes)}
        onClick={this.props.onClick}
        key={this.props.key}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = GridTile;
