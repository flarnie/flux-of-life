class Life < ActiveRecord::Base
  # Make sure that there is only one lifeform on each tile in the game
  validates :x_coord, uniqueness: { scope: [:y_coord, :game_id] }
  validates :x_coord, :y_coord, :game_id, presence: true
end
