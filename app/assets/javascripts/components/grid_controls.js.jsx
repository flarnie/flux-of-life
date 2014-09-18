/** @jsx React.DOM */
var PlayPauseButton = require('./play_pause_button'),
    React = require('react');

var pt = React.PropType;
/**
 * Uses callbacks passed in to trigger a number of changes to the grid.
 */
var GridControls = React.createClass({
  propTypes: {
    onPlay: pt.func.isRequired,
    onPause: pt.func.isRequired,
    onClear: pt.func.isRequired,
    onSave: pt.func.isRequired,
    playMode: pt.bool.isRequired
  },

  render: function() {
    var playOrPauseCallback = !this.props.playMode ?
      this.props.onPlay :
      this.props.onPause;
    return (
      <div className="ecosystem-grid__controls">
        <PlayPauseButton
          onClick={playOrPauseCallback}
          triggersPlay={!this.props.playMode}
        />
        <button
          disabled={this.props.playMode}
          onClick={this.props.onClear}>
          Clear
        </button>
        <button
          disabled={this.props.playMode}
          onClick={this.props.onSave}>
          Save
        </button>
      </div>
    );
  }
});

module.exports = GridControls;
