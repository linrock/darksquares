class StockfishAnalysis

  def initialize(fen, options = {})
    @options = options || {}
    @fen = fen
    @output = nil
  end

  def n_threads
    (ENV["STOCKFISH_THREADS"] || 2).to_i
  end

  def hash_table_size
    (ENV["STOCKFISH_HASH_SIZE"] || 4096).to_i
  end

  def analyze!
    engine = Stockfish::Engine.new
    multipv = @options[:multipv].to_i
    engine.multipv(multipv) if multipv > 0
    engine.execute "setoption name Threads value #{n_threads}"
    engine.execute "setoption name Hash value #{hash_table_size}"
    @output = engine.analyze @fen, { :depth => @options[:depth] || 10 }
    engine.execute "quit"
    @output
  end

  def to_h
    analyze! if @output.nil?
    AnalysisParser.new(@output).parse
  end

end
