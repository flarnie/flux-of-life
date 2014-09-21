/** @jsx React.DOM */
var $ = require('jquery'),
    GameGridActionCreators = require('../actions/game_grid_action_creators'),
    GameStores = require('../stores/game_stores'),
    Grid = require('./grid'),
    GridControls = require('./grid_controls'),
    React = require('react');

/**
 * constant {array} deltas
 */
const DELTAS = [[-1, 1],  [0, 1],  [1, 1],
                [-1, 0],           [1, 0],
                [-1, -1], [0, -1], [1, -1]];

/**
 * constant {number} life_step_length the time between steps in the Game of Life
 */
const LIFE_STEP_LENGTH = 2000; // 2 seconds
var EcosystemGrid = React.createClass({
  getDefaultProps: function() {
    return {
      size: 40,
      lifeStepLength: LIFE_STEP_LENGTH
    };
  },

  _fetchCurrentGameState: function() {
    var currentGame = GameStores.getCurrentGame();
    return {
      game: currentGame,
      livesRecord: this._setLives(currentGame.lives),
      playMode: false
    };
  },

  getInitialState: function() {
    return this._fetchCurrentGameState();
  },

  _findNeighborLifeCount: function(x, y) {
    var nCount = 0;
    var neighbors = DELTAS.map((deltaCoords) => {
        var newX = x + deltaCoords[0],
            newY = y + deltaCoords[1];
        return `${newX},${newY}`;
      });
    neighbors.forEach((neighborCoords) => {
      if (this.state.livesRecord[neighborCoords]) {
        nCount++;
      }
    });
    return nCount;
  },

  componentDidMount: function() {
    GameStores.addChangeListener(this._onChange);
    // No need to fetch the games - the parent component does that.
  },

  componentWillUnmount: function() {
    this._stopPlayMode();
    GameStores.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(this._fetchCurrentGameState());
  },

  /**
   * Determines whether a cell lives to the next step or not.
   * 1) Any live cell with fewer than two live neighbours dies, as if caused by under-population.
   * 2) Any live cell with two or three live neighbours lives on to the next generation.
   * 3) Any live cell with more than three live neighbours dies, as if by overcrowding.
   * 4) Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
   * @param {object} options
   * @return {boolean} whether it lives to the next step
   */
  _keepAlive: function(options) {
    return (options.lifeCount === 3) || ((options.lifeCount === 2) && options.currentlyAlive);
  },

  _takeStep: function() {
    var nextLifeCoords = [];
    // for each of the coords in the grid
    for (var y = 0; y < this.props.size; y++) {
      for (var x = 0; x < this.props.size; x ++) {
        // find it's neighbors
        // count currently alive neighbors
        var neighborLifeCount = this._findNeighborLifeCount(x, y);
          // update this coord in the next life coords
        var aliveAgain = this._keepAlive({
          lifeCount: neighborLifeCount,
          currentlyAlive: this.state.livesRecord[[x, y].join(',')]
        });
        if (aliveAgain) {
          nextLifeCoords.push({ x_coord: x, y_coord: y });
        }
      }
    }
    // finally - set this.state.livesRecord to the next life coords
    this.setState({ livesRecord: this._setLives(nextLifeCoords) });
    // trigger the next step after a delay
    if (this.state.playMode) {
      this._setNextStep();
    }
  },

  _setNextStep: function() {
    var timeoutId = window.setTimeout(this._takeStep, this.props.lifeStepLength);
    this.props.timeoutId = timeoutId;
    this.forceUpdate();
  },

  _stopPlayMode: function() {
    if (this.props.timeoutId) {
      window.clearTimeout(this.props.timeoutId);
    }
    this.setState({ playMode: false });
  },

  _startPlayMode: function() {
    this.setState({ playMode: true });
    this._setNextStep();
  },

  _setLives: function(nextLifeCoords) {
    var livesRecord = {};
    nextLifeCoords.forEach(function (lifeCoords) {
      var x = lifeCoords.x_coord,
          y = lifeCoords.y_coord,
          coords = `${x},${y}`;

      livesRecord[coords] = true;
    });
    return livesRecord;
  },

  _toggleLifeTile: function(coords) {
    var updatedLivesRecord = this.state.livesRecord;
    updatedLivesRecord[coords] = !updatedLivesRecord[coords];
    this.setState({ livesRecord: updatedLivesRecord });
  },

  _formatLivesRecord: function() {
    var livesRecord = this.state.livesRecord,
        lives = [];
    for (var coords in livesRecord) {
      if (livesRecord.hasOwnProperty(coords) && livesRecord[coords]) {
        var [x, y] = coords.split(',');
        lives.push({
          x_coord: parseInt(x, 10),
          y_coord: parseInt(y, 10)
        });
      }
    }
    return lives;
  },

  _saveGame: function() {
    var gameLives = this._formatLivesRecord(),
        gameAttributes = {
          id: this.state.game.id,
          name: this.state.game.name,
          lives: gameLives
        };
    GameGridActionCreators.updateGame(gameAttributes);
  },

  _clearLife: function() {
    this.setState({ livesRecord: {} });
  },

  _handleReset: function() {
    this.setState(this._fetchCurrentGameState());
  },

  render: function() {
    return (
      <div className="ecosystem-grid">
        <div className="ecosystem-grid__title">
          <h2>{this.state.game.name}</h2>
        </div>
        <GridControls
          onPlay={this._startPlayMode}
          onPause={this._stopPlayMode}
          onSave={this._saveGame}
          onClear={this._clearLife}
          onReset={this._handleReset}
          playMode={this.state.playMode}
        />
        <div className="ecosystem-grid__grid clearfix">
          <Grid
            playMode={this.state.playMode}
            livesRecord={this.state.livesRecord}
            onActiveTileClick={this._toggleLifeTile}
          />
        </div>
      </div>
    );
  }
});

module.exports = EcosystemGrid;
