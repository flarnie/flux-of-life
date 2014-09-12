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
  },

  /**
   * Since we are only changing the visible tab in our local view of the
   * application, we only need to dispatch an action, not send any update to the
   * server.
   * @param {string|number} gameId
   */
  updateCurrentGame: function(gameId) {
    AppDispatcher.handleServerAction({
      actionType: GameConstants.CURRENT_GAME.UPDATE,
      attributes: gameId
    });
  }
};

module.exports = GameServerActionCreators;
