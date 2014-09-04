var EcosystemGrid = require('./components/ecosystem_grid.jsx'),
    GameWebAPIUtils = require('./utils/game_web_api_utils');

document.addEventListener("DOMContentLoaded", function() {
  // Load all games into stores
  GameWebAPIUtils.getAllGames();

  // TODO: bootstrap all the games (later just games owned by current user)
  // TODO: grab chosen game by id
  // TODO: make ajax request for all games if no bootstrapped data is present

  // Get bootstrapped Game info if it's there.
  var bootstrappedGameJson = document.getElementById('bootstrapped-game-json');
  // If Game is found, render it as a grid.
  if (bootstrappedGameJson) {
    var gameJson = JSON.parse(bootstrappedGameJson.innerHTML);
    React.renderComponent(EcosystemGrid({
      game:  gameJson}), document.getElementById('react-component--ecosystem')
    );
  }
});
