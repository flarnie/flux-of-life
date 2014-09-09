# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ActiveRecord::Base.transaction do
  # create 5 test games
  5.times do |i|
    g = Game.create!(name: "TestGame #{i}")
    # create a blinker
    3.times do |x|
      Life.create!(game_id: g.id, x_coord: (x + i), y_coord: 5)
    end
  end
end
