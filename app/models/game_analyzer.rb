# Given a list of positions (list of FEN strings), run stockfish analysis on them all
#
class GameAnalyzer

  DEPTH = 20

  def initialize(positions)
    @positions = positions
  end

  def analyze!
    game_analysis = []
    @positions.each do |fen|
      position_analysis = {
        fen: fen,
        analysis: [],
        bestmove: {}
      }
      analysis = AnalysisParser.new(get_analysis_output(fen, DEPTH)).to_h
      analysis[:variations].each do |variation|
        best_move_uci = variation[:sequence][0]
        position_analysis[:analysis] << {
          depth: variation[:depth],
          bestmove: best_move_uci,
          score: variation[:score]
        }
      end
      # The best move from the highest-depth variation
      best_move_uci = analysis[:variations][0][:sequence][0]
      position_analysis[:bestmove] = BestMoveConverter.new(fen).get_move(best_move_uci)
      game_analysis << position_analysis
    end
    game_analysis
  end

  def get_analysis_output(fen, depth)
    analysis = PositionAnalysis.find_by(fen: fen, depth: depth)
    if analysis.nil?
      logger.info "Analyzing - depth #{depth} - #{fen}"
      analysis = PositionAnalysis.create!(
        fen: fen,
        depth: depth,
        analysis_output: get_analysis_output!(fen, depth)
      )
    end
    analysis.analysis_output
  end

  def get_analysis_output!(fen, depth)
    StockfishAnalysis.new(fen, { depth: depth }).analyze!
  end

  private

  def logger
    @logger ||=
      begin
        logger = Logger.new STDOUT
        logger.formatter = Logger::Formatter.new
        logger
      end
  end

end
