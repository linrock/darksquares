class Annotation < ApplicationRecord
  acts_as_paranoid

  before_validation :trim_annotation_text

  validates_presence_of :game
  validates_presence_of :user

  validates_presence_of :fen
  validates_presence_of :move
  validates_presence_of :move_string
  validates_presence_of :text

  belongs_to :game
  belongs_to :user

  before_validation :calculate_move_and_position

  def calculate_move_and_position
    return if fen && move
    i = game.position_index_from_move_string(move_string)
    self.fen = game.positions[i]
    cjs = ChessJS.new
    cjs.load_fen game.positions[i - 1]
    self.move = cjs.move(move_string.split(' ')[1])
  end

  def as_json(options = {})
    super(options).merge({
      username: user.username,
    })
  end

  def destroy_by_user!(user)
    Annotation.transaction do
      self.update_attributes!({ deleted_by_user_id: user.id })
      self.destroy!
    end
  end

  private

  def trim_annotation_text
    self.text = self.text.strip
  end
end
