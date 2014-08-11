var EcosystemGrid = require('./components/ecosystem_grid.jsx');

document.addEventListener("DOMContentLoaded", function() {
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
