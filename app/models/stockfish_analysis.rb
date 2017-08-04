class StockfishAnalysis

  def initialize(fen, options = {})
    @options = options || {}
    @fen = fen
    @output = nil
  end

  def analyze!
    engine = Stockfish::Engine.new
    multipv = @options[:multipv].to_i
    engine.multipv(multipv) if multipv > 0
    engine.execute "setoption name Threads value 2"
    engine.execute "setoption name Hash value 4096"
    @output = engine.analyze @fen, { :depth => @options[:depth] || 10 }
    engine.execute "quit"
    @output
  end

  def to_h
    analyze! if @output.nil?
    AnalysisParser.new(@output).parse
  end

end
