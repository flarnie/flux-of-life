json.(game, :id, :name)

json.lives game.lives do |life|
  json.partial! life
end
