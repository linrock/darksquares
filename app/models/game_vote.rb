class GameVote < ApplicationRecord
  belongs_to :game
  belongs_to :user

  validates_presence_of :user
  validates_presence_of :game

  validates_inclusion_of :value, in: (-1..1)
end
