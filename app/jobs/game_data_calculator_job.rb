class GameDataCalculatorJob < ApplicationJob

  def perform(game)
    game.calculate_game_data!
    game.save!
  end

end
