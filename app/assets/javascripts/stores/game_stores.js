var AppDispatcher = require('../dispatcher/app_dispatcher'),
    EventEmitter = require('events').EventEmitter,
    GameConstants = require('../constants/game_constants'),
    merge = require('react/lib/merge');

var _games = {};

/**
 * For when we get fresh game collection data from server
 * @param {object} games
 */
var receiveGames = function(games) {
  _games = games;
};

/**
 * updates the game with the matching id
 * or saves the game under that id
 * @param {object} attributes
 */
var updateGame = function(attributes) {
  var prevAttrs = _games[attributes.id];
  if (prevAttrs) {
    attributes = merge(prevAttrs, attributes);
  }
  _games[attributes.id] = attributes;
};

var GamesStore = merge(EventEmitter.prototype, {
  getAll: function() {
    return _games;
  }

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

    break;
    case GameConstants.RECEIVE:
      debugger;
    // what do we pass to receiveGames?
    // action.attributes?
    // receiveGames(...);
    break;
    default:
      return true;
  }

  // If a data change was triggered, we emit a change event to the view.
  GameStore.emitChange();

  return true; // No errors; needed for Promise in AppDispatcher.
});

module.exports = GamesStore;
