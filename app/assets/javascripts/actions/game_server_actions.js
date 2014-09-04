var Dispatcher = require('flux').Dispatcher,
    GameConstants = require('../constants/game_constants');

var GameServerActions = {
  /**
   * Handles loading of games data from server
   * @param {object} allGameAttributes
   */
  receiveAllGames: function(allGameAttributes) {
    // TODO: implement handleServerAction on an AppDispatcher that extends
    // Dispatcher
    Dispatcher.handleServerAction({
      actionType: GameConstants.RECEIVE,
      attributes: allGameAttributes
    });
  }
};

module.exports = GameServerActions;
