/** @jsx React.DOM */
var GameIndexActionCreators = require('../actions/game_index_action_creators'),
    GameStores = require('../stores/game_stores'),
    GameWebAPIUtils = require('../utils/game_web_api_utils'),
    React = require('react');

var GamesIndex = React.createClass({
  /**
  * @return {object}
  */
  getInitialState: function() {
    return { games: GameStores.getAll() };
  },

  componentDidMount: function() {
    GameStores.addChangeListener(this._onChange);
    // No need to fetch the games - the parent component does that.
  },

  compomentWillUnmount: function() {
    GameStores.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ games: GameStores.getAll() });
  },

  /**
   * @param {number} id
   */
  _updateCurrentGame: function(id) {
    GameIndexActionCreators.updateCurrentGame(id);
  },

  /**
   * @return {object}
   */
  _renderGame: function(game) {
    var classes = {
      'game-index__game': true,
      'game-index__game--current': (GameStores.getCurrentGameId() === game.id)
    };
    return (
      <li key={game.id}>
        <a
          className={React.addons.classSet(classes)}
          onClick={this._updateCurrentGame.bind(this, game.id)}
          href={`#${game.id}`}>
          {game.name} ({game.lives.length} cells)
        </a>
      </li>
    );
  },

  /**
   * @return {object}
   */
  render: function() {
    var allGames = this.state.games,
        gameLinks = [];
    for (let gameId in allGames) {
      if (allGames.hasOwnProperty(gameId)) {
        var gameLink = this._renderGame(allGames[gameId]);
        gameLinks.push(gameLink);
      }
    }

    return (
      <div className="games-index">
        <ul>
          {gameLinks}
        </ul>
      </div>
    );
  }
});

module.exports = GamesIndex;
