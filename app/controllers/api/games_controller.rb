class Api::GamesController < ApplicationController
  before_action :set_game, only: [:show, :update]

  def index
    @games = Game.all
  end

  def update
    ActiveRecord::Base.transaction do
      # Delete the previous life tiles
      @game.lives.each do |life|
        life.destroy!
      end
      @game.reload
      # Create the new life tiles
      game_params[:lives].each do |index, life_params|
        @game.lives.build(life_params)
      end
      @game.save!
      render :jbuilder, template: 'api/games/show'
    end
  end
end
