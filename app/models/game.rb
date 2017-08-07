class Game < ApplicationRecord
  validates_presence_of :pgn

  belongs_to :user
  has_many :annotations

  def calculate_game_data!
    self.pgn_headers = pgn_loader.pgn_headers
    self.moves = pgn_loader.moves
    self.positions = pgn_loader.positions
    self.save!
    self.analysis = GameAnalyzer.new(self.positions).analyze!
    self.best_moves = self.analysis.map {|position| position["bestmove"]["san"] }
    self.graph_points = GraphPointsCalculator.new(self.analysis).calculate!.values[0].values
    self.save!
  end

  def async_calculate_game_data
    GameDataCalculator.perform_later self
  end

  def as_json(options = {})
    super(options).merge(annotations: annotations)
  end

  private

  def pgn_loader
    @pgn_loader ||= PgnLoader.new(pgn)
  end
end
