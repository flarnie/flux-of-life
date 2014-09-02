# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ActiveRecord::Base.transaction do
  g = Game.create!(name: 'TestGame')
  10.times do |x|
    Life.create!(game_id: g.id, x_coord: (x + 5), y_coord: 5)
  end
end
