var AppDispatcher = require('../dispatcher/app_dispatcher'),
    GameConstants = require('../constants/game_constants');

var GameServerActions = {
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
   * @param {object} allGameAttributes
   */
  updateGame: function(gameAttributes) {
    AppDispatcher.handleServerAction({
      actionType: GameConstants.UPDATE,
      attributes: gameAttributes
    });
  }
};

module.exports = GameServerActions;
