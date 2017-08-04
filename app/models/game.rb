class Game < ApplicationRecord
  validates_presence_of :pgn

  def calculate_game_data!
    self.pgn_headers = pgn_loader.pgn_headers
    self.moves = pgn_loader.moves
    self.positions = pgn_loader.positions
    self.analysis = GameAnalyzer.new(self.positions).analyze!
  end

  private

  def pgn_loader
    @pgn_loader ||= PgnLoader.new(pgn)
  end
end
