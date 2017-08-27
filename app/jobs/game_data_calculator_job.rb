class GameDataCalculatorJob < ApplicationJob

  def perform(game_id)
    game = Game.find_by(id: game_id)
    return if game.nil?
    game.calculate_game_data!
    game.save!
  end

end
