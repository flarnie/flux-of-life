class GamesController < ApplicationController
  # GET /games/
  def index
    @games = Game.all
  end
end
