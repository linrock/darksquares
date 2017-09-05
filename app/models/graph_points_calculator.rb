# Given completed analysis for all positions, calculate the points to graph
#
class GraphPointsCalculator

  # DEPTHS = [12, 15, 18, 21, 24, 27, 30]
  # DEPTHS = [6, 8, 10, 12, 14, 16, 18, 20]
  # DEPTHS = [5, 7, 9, 10, 12, 14, 16, 18, 20]
  # DEPTHS = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  # DEPTHS = (20..30)
  # DEPTHS = (24..30)
  # DEPTHS = (2..10)
  # DEPTHS = [6] + (8..12).to_a + [16,20,25,30]
  # DEPTHS = [1, 6, 8, 10, 12, 16, 20, 25, 30]
  DEPTHS = [6, 8, 10, 12, 16, 18, 20]

  def initialize(game_analysis)
    @game_analysis = game_analysis
  end

  def calculate!
    points = {
      depths: DEPTHS.map { |depth| [depth, scores_at_depth(depth)] }.to_h
    }
    points[:depths].each do |depth, scores|
      polarity = -1
      points[:depths][depth] = scores.map do |score|
        polarity *= -1
        if score =~ /mate (-?\d+)/
          sc = score[/mate (-?\d+)/, 1].to_i > 0 ? 10 : -10
          sc * polarity
        else
          score * polarity
        end
      end
    end
    points
  end

  # A list of scores at a given search depth - [ 1.21, 1.52, 1.74, ... ]
  #
  def scores_at_depth(depth)
    @game_analysis.map {|position_analysis|
      analysis = position_analysis['analysis'].find {|v| v['depth'] == depth }
      (analysis || position_analysis['analysis'][-1])['score']
    }
  end

  def to_csv
    points = calculate!
    rows = ""
    rows += points[:depths].keys.map {|d| "depth #{d}" }.join ","
    rows += "\n"
    (0 .. (points[:depths].values[0].length-1)).each do |i|
      rows += points[:depths].values.map {|scores| scores[i] }.join(",")
      rows += "\n"
    end
    rows
  end

end
