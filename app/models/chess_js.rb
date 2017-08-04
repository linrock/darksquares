# Wrapper for chess.js
#
class ChessJS

  attr_accessor :chess

  def initialize
    @chess = ExecJS.compile open(Rails.root.join("node_modules/chess.js/chess.js")).read
    @chess.exec "c = new Chess"
  end

  def exec(expression)
    @chess.exec expression
  end

  def load_fen(fen)
    @chess.exec "return c.load('#{fen}')"
  end

  def validate_fen(fen)
    @chess.exec "return c.validate_fen('#{fen}')"
  end

  # XXX Hack to just get the moves portion of the pgn
  def load_pgn(pgn)
    # pgn.gsub!(/\n/,' ')
    # pgn.gsub!(/\s+/,' ')
    pgn = pgn[/1\.\s*\w{1,2}\d\s*.*/]
    @chess.exec "return c.load_pgn('#{pgn}')"
  end

  # Handles moves in different formats - uci, san
  def move(opts)
    if opts.is_a? Hash
      @chess.exec "return c.move(#{opts.to_json})"
    elsif opts[/([a-h]\d)([a-h]\d)(\w)?/]
      @chess.exec %[return c.move({ from: "#{$1}", to: "#{$2}", promotion: "#{$3}" })]
    else
      @chess.exec "return c.move('#{opts}')"
    end
  end

  %w(
    fen
    turn
    reset
    history
    game_over
    in_draw
    in_checkmate
    in_stalemate
    in_threefold_repetition
    insufficient_material
  ).each do |method|
    eval %( def #{method}; @chess.exec "return c.#{method}()"; end )
  end

end
