# Raw analysis output text for a chess position (FEN format)
#
class PositionAnalysis < ApplicationRecord
  validates_presence_of :fen
  validates_presence_of :depth
  validates_presence_of :analysis_output

  def parsed_analysis
    AnalysisParser.new(analysis_output).to_h
  end
end
