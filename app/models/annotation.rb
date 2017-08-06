class Annotation < ApplicationRecord
  validates_presence_of :text

  belongs_to :game

  def as_json(options = {})
    super(options).merge(username: 'flamehead')
  end

end
