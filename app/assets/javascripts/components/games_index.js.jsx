/** @jsx React.DOM */
var _ = require('lodash'),
    GameIndexActionCreators = require('../actions/game_index_action_creators'),
    GameStores = require('../stores/game_stores'),
    React = require('react');

var GamesIndex = React.createClass({
  /**
  * @return {object}
  */
  getInitialState: function() {
    return {
      games: GameStores.getAll(),
      scrolledPastTop: false,
      scrolledAboveBottom: true,
    };
  },

  componentDidMount: function() {
    GameStores.addChangeListener(this._onChange);
    // No need to fetch the games - the parent component does that.
  },

  componentWillUnmount: function() {
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
      'games-index__game': true,
      'games-index__game--current': (GameStores.getCurrentGameId() === game.id)
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

  _handleStartNewGame: function() {
    var gamesCount = Object.keys(GameStores.getAll()).length;
    var gameName = `New Game #${gamesCount}`;
    GameIndexActionCreators.startNewGame({ game: { name: gameName } });
  },

  _handleScroll: function() {
    var scrolledPastTop = (this.getDOMNode().scrollTop > 0);

    var scrolledAboveBottom = (
      (this.getDOMNode().scrollTop + this.getDOMNode().offsetHeight) <
        this.refs.gamesIndexContent.getDOMNode().offsetHeight
    );

    this.setState({
      scrolledPastTop: scrolledPastTop,
      scrolledAboveBottom: scrolledAboveBottom
    });
  },

  /**
   * @return {object}
   */
  render: function() {
    var classNames = {
      'games-index': true,
      'games-index--scrolled-past-top': this.state.scrolledPastTop,
      'games-index--scrolled-above-bottom': this.state.scrolledAboveBottom,
      'games-index--scrolled-to-middle': this.state.scrolledAboveBottom && this.state.scrolledPastTop
    };

    var allGames = this.state.games,
        gameLinks = [];
    for (let gameId in allGames) {
      if (allGames.hasOwnProperty(gameId)) {
        var gameLink = this._renderGame(allGames[gameId]);
        gameLinks.push(gameLink);
      }
    }

    return (
      <div
        onScroll={_.throttle(this._handleScroll, 100)}
        className={React.addons.classSet(classNames)}>
        <ul ref="gamesIndexContent">
          {gameLinks}
          <li key="new">
            <a href="#" onClick={this._handleStartNewGame}>
              New
            </a>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = GamesIndex;
