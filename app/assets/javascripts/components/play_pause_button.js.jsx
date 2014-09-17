/** @jsx React.DOM */
var React = require('react');

var PlayPauseButton = React.createClass({
  render: function() {
    var playOrPause = this.props.triggersPlay ? '►' : '▐▐';
    return (
      <button
        disabled={this.props.disabled}
        onClick={this.props.onClick}
        className={this.props.className}>
        {playOrPause}
      </button>
    );
  }
});

module.exports = PlayPauseButton;
