/** @jsx React.DOM */
var EcosystemGrid = require('./ecosystem_grid.js.jsx'),
    GameStores = require('../stores/game_stores'),
    GameWebAPIUtils = require('../utils/game_web_api_utils'),
    GridLoadingScreen = require('./grid_loading_screen.js.jsx'),
    React = require('react');

/**
 * Because we are keeping records of all games in the stores, it will be
 * easier to have a parent component that watches the stores and passes the
 * right game to the ecosystemGrid.
 * The ecosystemGrid is written as a controller component.
 */
var LifeApp = React.createClass({
  /**
  * @return {object}
  */
  getInitialState: function() {
    return { games: GameStores.getAll() };
  },

  componentDidMount: function() {
    GameStores.addChangeListener(this._onChange);
    // Only now that we are listening for changes should we set off the call to
    // fetch the games from the server.
    GameWebAPIUtils.getAllGames();
  },

  compomentWillUnmount: function() {
    GameStores.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ games: GameStores.getAll() });
  },

  /**
   * @return {object}
   */
  render: function() {
    var currentGame = GameStores.find(this.props.gameId);
    if (currentGame) {
      return (<EcosystemGrid game={currentGame} />);
    } else {
      return (<GridLoadingScreen />);
    }
  }
});

module.exports = LifeApp;
