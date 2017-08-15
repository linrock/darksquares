class Annotation < ApplicationRecord
  validates_presence_of :game
  validates_presence_of :user
  validates_presence_of :move_string
  validates_presence_of :text

  belongs_to :game
  belongs_to :user

  def as_json(options = {})
    super(options).merge({
      username: user.username,
    })
  end
end
