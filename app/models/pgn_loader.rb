# Given a PGN, convert it to an array of positions (FEN strings)
#
class PgnLoader

  attr_accessor :pgn

  def initialize(pgn)
    @pgn = pgn
    @chess = ChessJS.new
  end

  def pgn_escaped
    URI.escape @pgn
  end

  def pgn_headers
    @chess.exec %(
      const cjs = new Chess;
      cjs.load_pgn(unescape("#{pgn_escaped}"));
      return cjs.header();
    )
  end

  def moves
    @chess.exec %(
      const cjs = new Chess;
      cjs.load_pgn(unescape("#{pgn_escaped}"));
      const movesSan = cjs.history();
      cjs.reset();
      var moves = [];
      for (let i = 0, len = movesSan.length; i < len; i++) {
        moves.push(cjs.move(movesSan[i]));
      }
      return moves;
    )
  end

  def positions
    @chess.exec %(
      const cjs = new Chess;
      cjs.load_pgn(unescape("#{pgn_escaped}"));
      const movesSan = cjs.history();
      cjs.reset();
      let positions = [];
      for (let i = 0, len = movesSan.length; i < len; i++) {
        positions.push(cjs.fen());
        cjs.move(movesSan[i]);
      }
      return positions;
    )
  end

end
