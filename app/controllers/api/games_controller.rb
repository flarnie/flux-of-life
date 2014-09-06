class Api::GamesController < ApplicationController
  before_action :set_game, only: [:show]

  def index
    @games = Game.all
  end
end
