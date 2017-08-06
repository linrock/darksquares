class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def home
    @games = Game.order('id DESC').limit(10)
  end

  def index
  end
end
