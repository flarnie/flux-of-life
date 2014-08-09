class Game < ActiveRecord::Base
  validates :name, uniqueness: true, presence: true, length: { minimum: 3, maximum: 81 }
  has_many :lives
end
