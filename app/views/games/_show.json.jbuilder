json.(game, :id, :name)

json.lives game.lives do |life|
  json.(life, :x_coord, :y_coord)
end
