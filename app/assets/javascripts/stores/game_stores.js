var _ = require('lodash'),
    AppDispatcher = require('../dispatcher/app_dispatcher'),
    EventEmitter = require('events').EventEmitter,
    GameConstants = require('../constants/game_constants');

var _games = {};
var _currentGame = 1 // Defaults to first game, which is seeded in db.

/**
 * Processing the games array returned by the server
 * @param {array} games
 * @return {object} games mapped into object with id as key
 */
var processGames = function(games) {
  var gamesObj = {};
  games.forEach((game) => {
    gamesObj[game.id] = game;
  });

  return gamesObj;
};

/**
 * For when we get fresh game collection data from server
 * @param {object|array} games
 */
var receiveGames = function(games) {
  // Games will be returned as an array from the server
  if (Array.isArray(games)) {
    games = processGames(games);
  }
  _games = games;
};

/**
 * updates the game with the matching id
 * or saves the game under that id
 * @param {object} attributes
 */
var updateGame = function(attributes) {
  // We can't just merge because we want to overwrite the 'lives' attribute
  // completely
  _games[attributes.id] = attributes;
};

/**
 * updates the currentGame, switching to a different one
 * @param {number} currentGameId id of the new currentGame
 */
var updateCurrentGame = function(currentGameId) {
  _currentGame = currentGameId;
};

var GameStores = _.merge(EventEmitter.prototype, {
  /**
   * @return {object}
   */
  getAll: function() {
    return _games;
  },

  /**
   * @param {number} id key for that game
   * @return {object} game attributes as JSON object
   */
  find: function(id) {
    return _games[id];
  },

  emitChange: function() {
    this.emit(GameConstants.CHANGE_EVENT);
  },

  /**
   * Add a callback to the CHANGE event
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(GameConstants.CHANGE_EVENT, callback);
  },


  /**
   * Add a callback to the CHANGE event
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.off(GameConstants.CHANGE_EVENT, callback);
  }
});

/**
 * Register callback that handles each type of update
 */
AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case GameConstants.UPDATE:
      updateGame(action.attributes);
    break;
    case GameConstants.RECEIVE:
      receiveGames(action.attributes);
    break;
    case GameConstants.CURRENT_GAME.UPDATE:
      updateCurrentGame(action.attributes);
      break;
    default:
      return true;
  }

  // If a data change was triggered, we emit a change event to the view.
  GameStores.emitChange();

  return true; // No errors; needed for Promise in AppDispatcher.
});

module.exports = GameStores;
