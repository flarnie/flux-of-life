var $ = require('jquery'),
    GameServerActions = require('../actions/game_server_actions'),
    Routes = require('routes');

var GameWebAPIUtils = {
  getAllGames: function() {
    $.ajax({
      url: Routes.api_games_path()
    }).success(function(data, textStatus) {
      GameServerActions.receiveAllGames(data);
    }).fail(function(data, textStatus) {
      debugger;
    });
  }
};

module.exports = GameWebAPIUtils;
