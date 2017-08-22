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

  # GET /api/v1/games/:id/status
  def status
    game = Game.find(params[:id])
    render json: {
      game: {
        id: game.id,
        status: game.analysis_status,
        percent: game.percent_analyzed
      }
    }
  end

  # POST /api/v1/games
  def create
    game = Game.create!(create_game_params.merge(user_id: current_user.id))
    GameDataCalculatorJob.perform_later game
    render json: {
      game: game.as_json
    }
  end

  # PATCH /api/v1/games/:id
  def update
    if game.submitted_at.present?
      render status: 400, json: {}
    elsif params[:submit]
      game.update_attributes!(patch_game_params.merge({
        submitted_at: Time.now
      }))
      render json: {
        game: game.as_json.merge({
          annotations: game.annotations.includes(:user)
        })
      }
    end
  end

  # DELETE /api/v1/games/:id
  def destroy
    game.destroy!
    render json: {}
  end

  private

  def game
    @game ||= current_user.games.find(params[:id])
  end

  def create_game_params
    params.require(:game).permit(:pgn)
  end

  def patch_game_params
    params.require(:game).permit(:name)
  end
end
