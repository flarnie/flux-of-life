var Dispatcher = require('flux').Dispatcher,
    EventEmitter = require('events').EventEmitter,
    GameConstants = require('../constants/game_constants'),
    merge = require('react/lib/merge');

var _games = {};

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

  /**
   * Add a callback to the CHANGE event
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },


  /**
   * Add a callback to the CHANGE event
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.off(Constants.CHANGE_EVENT, callback);
  }
});

module.exports = GamesStore;
