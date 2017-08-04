# Given a position and a UCI move, find the SAN representation as well
#
class BestMoveConverter

  attr_accessor :fen

  def initialize(fen)
    @fen = fen
    @chess = ChessJS.new
  end

  def get_move(uci_move)
    @chess.exec "
      var uciMove = '#{uci_move}';
      var cjs = new Chess;
      cjs.load('#{fen}');
      var move = { from: uciMove.slice(0,2), to: uciMove.slice(2,4) };
      if (uciMove.length === 5) {
        move.promotion = uciMove[4];
      }
      return cjs.move(move);
    "
  end
end
