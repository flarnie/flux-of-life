var LifeApp = require('./components/life_app.js.jsx');

document.addEventListener("DOMContentLoaded", function() {

  // TODO: bootstrap all the games (later just games owned by current user)
  // TODO: grab chosen game by id
  // TODO: make ajax request for all games if no bootstrapped data is present

  // Get bootstrapped Game info if it's there.
  var bootstrappedGameJson = document.getElementById('bootstrapped-game-json');
  React.renderComponent(LifeApp({ gameId: 1 }),
    document.getElementById('react-component--life-app')
  );
});
