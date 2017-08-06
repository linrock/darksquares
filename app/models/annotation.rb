class Annotation < ApplicationRecord
  validates_presence_of :text

  belongs_to :game
  belongs_to :user

  def as_json(options = {})
    super(options).merge(username: user.username)
  end

end
