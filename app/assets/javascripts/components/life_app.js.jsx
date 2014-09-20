/** @jsx React.DOM */
var _ = require('lodash'),
    EcosystemGrid = require('./ecosystem_grid'),
    GamesIndex = require('./games_index'),
    GamesIndexLoadingScreen = require('./games_index_loading_screen'),
    GameStores = require('../stores/game_stores'),
    GameWebAPIUtils = require('../utils/game_web_api_utils'),
    GridLoadingScreen = require('./grid_loading_screen'),
    GridPreview = require('./grid_preview'),
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
  _renderGame: function() {
    var currentGame = GameStores.getCurrentGame();
    if (currentGame) {
      return (<EcosystemGrid />);
    } else {
      return (<GridLoadingScreen />);
    }
  },

  /**
   * @return {?object}
   */
  _renderGamePreview: function() {
    var currentGame = GameStores.getCurrentGame();
    if (currentGame) {
      return (<GridPreview />);
    }
  },

  /**
   * @return {object}
   */
  _renderGamesIndex: function() {
    if (!_.isEmpty(GameStores.getAll())) {
      return (<GamesIndex />);
    } else {
      return (<GamesIndexLoadingScreen />);
    }
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="life-app clearfix">
        <main className="life-app--primary">
          {this._renderGamePreview()}
          {this._renderGame()}
        </main>
        <div className="life-app--secondary">
          {this._renderGamesIndex()}
        </div>
      </div>
    );
  }
});

module.exports = LifeApp;
