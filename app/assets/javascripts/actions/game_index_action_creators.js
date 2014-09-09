var AppDispatcher = require('../dispatcher/app_dispatcher'),
    GameConstants = require('../constants/game_constants'),
    GameWebAPIUtils = require('../utils/game_web_api_utils');

/**
 * Since we are only changing the visible tab in our local view of the
 * application, we only need to dispatch an action, not send any update to the
 * server.
 */
var GameIndexActionCreators = {
  /**
   * @param {object} gameAttributes
   */
  updateCurrentGame: function(gameId) {
    // Optimistically send the action to the dispatcher
    AppDispatcher.handleViewAction({
      actionType: GameConstants.CURRENT_GAME.UPDATE,
      attributes: gameId
    });
  }
};

module.exports = GameIndexActionCreators;
