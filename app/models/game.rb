class Game < ApplicationRecord
  before_validation :calculate_moves_and_positions
  before_validation :classify_opening

  validates_presence_of :pgn
  validates_presence_of :pgn_headers
  validates_presence_of :moves
  validates_presence_of :positions
  validates_length_of :name, in: (1..64), allow_nil: true

  belongs_to :user
  has_many :annotations

  def calculate_moves_and_positions
    return if pgn_headers.present? && moves.present? && positions.present?
    self.pgn_headers = pgn_loader.pgn_headers
    self.moves = pgn_loader.moves
    self.positions = pgn_loader.positions
  end

  def calculate_game_data!
    self.analysis = GameAnalyzer.new(self.positions).analyze!
    self.best_moves = self.analysis.map {|position| position["bestmove"]["san"] }
    self.graph_points = GraphPointsCalculator.new(self.analysis).calculate!.values[0].values
    self.save!
  end

  def classify_opening
    return if self.pgn_headers["ECO"] || self.pgn_headers["Opening"]
    opening = $opening_tree.get_opening_from_pgn_movetext pgn_movetext
    self.pgn_headers["ECO"] = opening.base_eco
    self.pgn_headers["Opening"] = opening.name
  end

  def async_calculate_game_data
    GameDataCalculator.perform_later self
  end

  def position_index_from_move_string(move_string)
    move_string[/^\d+/, 0].to_i * 2 - (move_string.include?('...') ? 0 : 1)
  end

  def pgn_movetext
    pgn.gsub(/.*\]/, '').strip
  end

  def as_json(options = {})
    super(options).merge({
      metadata: {
        submitter: user.username,
      }
    })
  end

  private

  def pgn_loader
    @pgn_loader ||= PgnLoader.new(pgn)
  end
end
