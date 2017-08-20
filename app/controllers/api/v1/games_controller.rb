class API::V1::GamesController < API::V1::BaseController
  before_action :doorkeeper_authorize!, only: [:create, :update, :destroy]

  # GET /api/v1/games
  def index
    games = Game.order('id DESC').limit(10)
    render json: {
      games: games.includes(:user, :annotations).map {|game|
        game.as_json.merge({
          annotations: game.annotations.includes(:user)
        })
      }
    }
  end

  # GET /api/v1/games/:id
  def show
    game = Game.find(params[:id])
    render json: {
      game: game.as_json.merge({
        annotations: game.annotations.includes(:user)
      })
    }
  end

  # POST /api/v1/games
  def create
    game = Game.create!(game_params.merge(user_id: current_user.id))
    GameDataCalculatorJob.perform_later game
    render json: {
      game: game.as_json
    }
  end

  # PATCH /api/v1/games/:id
  def update
  end

  # DELETE /api/v1/games/:id
  def destroy
    current_user.games.find(params[:id]).destroy!
    render json: {}
  end

  private

  def game_params
    params.require(:game).permit(:pgn)
  end

end
