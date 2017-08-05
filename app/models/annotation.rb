class Annotation < ApplicationRecord
  validates_presence_of :text

  belongs_to :game
end
