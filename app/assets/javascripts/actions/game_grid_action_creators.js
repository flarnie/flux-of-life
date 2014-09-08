var AppDispatcher = require('../dispatcher/app_dispatcher'),
    GameConstants = require('../constants/game_constants'),
    GameWebAPIUtils = require('../utils/game_web_api_utils');

/**
 * These are a bit more complex than the GameServerActionCreators.
 * They first optimistically update the GameStores by sending the action to the
 * dispatcher, and then make the appropriate ajax request using the
 * GameWebAPIUtils
 */
var GameGridActionCreators = {
  /**
   * @param {object} gameAttributes
   */
  updateGame: function(gameAttributes) {
    // Optimistically send the action to the dispatcher
    AppDispatcher.handleViewAction({
      actionType: GameConstants.UPDATE,
      attributes: gameAttributes
    });
    // Send update to the server
    GameWebAPIUtils.updateGame(gameAttributes);
  }
};

module.exports = GameGridActionCreators;
