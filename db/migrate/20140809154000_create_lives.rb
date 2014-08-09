class CreateLives < ActiveRecord::Migration
  def change
    create_table :lives do |t|
      t.integer :x_coord
      t.integer :y_coord
      t.integer :game_id

      t.timestamps
    end
  end
end
