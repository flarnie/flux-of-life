var AppDispatcher = require('../dispatcher/app_dispatcher'),
    GameConstants = require('../constants/game_constants'),
    GameWebAPIUtils = require('../utils/game_web_api_utils');

var GameIndexActionCreators = {
  /**
   * We need to first save the new game to the server, which will then set it to
   * the current game.
   * @param {object} gameAttrs
   */
  startNewGame: function(gameAttrs) {
    GameWebAPIUtils.newGame(gameAttrs);
  },

  /**
   * Since we are only changing the visible tab in our local view of the
   * application, we only need to dispatch an action, not send any update to the
   * server.
   * @param {string|number} gameId
   */
  updateCurrentGame: function(gameId) {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.CURRENT_GAME.UPDATE,
      attributes: gameId
    });
  }
};

module.exports = GameIndexActionCreators;
