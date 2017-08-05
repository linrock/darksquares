class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def index
    @games = Game.order('id DESC').limit(10)
  end

  def game_importer
  end

  def games
  end

  def annotations
  end
end
