var $ = require('jquery'),
    GameServerActions = require('../actions/game_server_actions'),
    Routes = require('routes');

var GameWebAPIUtils = {
  getAllGames: function() {
    // TODO: replace .done with .success and .fail
    $.ajax({
      url: Routes.games_path()
    }).done(function(data, textStatus) {
      GameServerActions.receiveAllGames(data);
    });
  }
};

module.exports = GameWebAPIUtils;
