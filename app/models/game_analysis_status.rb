require 'sidekiq/api'

class GameAnalysisStatus

  ANALYSIS_STATUS = {
    pending:     'pending',
    in_progress: 'in_progress',
    complete:    'complete'
  }

  def initialize(game)
    @game = game
  end

  def n_workers
    Sidekiq::Workers.new.size
  end

  def status
    if percent_analyzed == 100
      return ANALYSIS_STATUS[:complete] if @game.graph_points.present?
      return ANALYSIS_STATUS[:in_progress]
    end
    return ANALYSIS_STATUS[:pending] if n_workers == 0 || percent_analyzed == 0
    ANALYSIS_STATUS[:in_progress]
  end

  def percent_analyzed
    @percent_analyzed ||=
      begin
        positions = @game.positions
        fraction = PositionAnalysis.where(fen: positions).count.to_f / positions.count
        (100 * fraction).floor
      end
  end
end
