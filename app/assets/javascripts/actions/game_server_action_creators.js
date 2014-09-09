var AppDispatcher = require('../dispatcher/app_dispatcher'),
    GameConstants = require('../constants/game_constants');

/**
 * These are generally used as ajax callbacks, and wrap the sending of actions
 * to the dispatcher.
 */
var GameServerActionCreators = {
  /**
   * Handles loading of games data from server
   * @param {object} allGameAttributes
   */
  receiveAllGames: function(allGameAttributes) {
    AppDispatcher.handleServerAction({
      actionType: GameConstants.RECEIVE,
      attributes: allGameAttributes
    });
  },
  /**
   * Handles loading of games data from server
   * @param {object} gameAttributes
   */
  updateGame: function(gameAttributes) {
    AppDispatcher.handleServerAction({
      actionType: GameConstants.UPDATE,
      attributes: gameAttributes
    });
  }
};

module.exports = GameServerActionCreators;
