<script type="application/json" id="bootstrapped-game-json">
  <%= raw render :partial => 'api/games/index.json.jbuilder', :locals => {games: @games} %>
</script>
<p id="notice"><%= notice %></p>

<div id="react-component--life-app"></div>
