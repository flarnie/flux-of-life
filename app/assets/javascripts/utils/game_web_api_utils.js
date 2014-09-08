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
      throw `Failed to fetch games from server: ${data}`;
    });
  },

  updateGame: function(attributes) {
    // Server won't expect the 'id' attribute
    var id = attributes.id;
    delete attributes['id'];
    $.ajax({
      type: 'PUT',
      data: { game: attributes },
      url: Routes.api_game_path(id)
    }).success(function(data, textStatus) {
      GameServerActions.updateGame(data);
    }).fail(function(data, textStatus) {
      throw `Failed to update game: ${data}`;
    });
  }
};

module.exports = GameWebAPIUtils;
