class API::V1::GamesController < API::V1::BaseController
  before_action :doorkeeper_authorize!, only: [:create, :update, :destroy]

  # GET /api/v1/games
  def index
    games = Game.order('id DESC').offset(offset).limit(10)
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

  # POST /api/v1/games/:id/votes
  def vote
    game = Game.find(params[:id])
    if game.user_id == current_user.id
      render status: 400, json: {}
    else
      vote = game.votes.find_by(user_id: current_user.id)
      if vote
        vote.value = vote_game_params[:value]
      else
        vote = game.votes.new(user_id: current_user.id, value: vote_game_params[:value])
      end
      vote.save!
      render json: {
        vote: vote
      }
    end
  end

  # PATCH /api/v1/games/:id
  def update
    game = current_user.games.find(params[:id])
    if params[:submit]
      if game.submitted_at.present?
        render status: 400, json: {}
        return
      else
        game.update_attributes!(patch_game_params.merge({
          submitted_at: Time.now
        }))
      end
    else
      game.update_attributes!(patch_game_params)
    end
    render json: {
      game: game.as_json.merge({
        annotations: game.annotations.includes(:user)
      })
    }
  end

  # DELETE /api/v1/games/:id
  def destroy
    game = current_user.games.find(params[:id])
    game.destroy!
    render json: {}
  end

  private

  def create_game_params
    params.require(:game).permit(:pgn)
  end

  def patch_game_params
    params.require(:game).permit(:name)
  end

  def vote_game_params
    params.require(:vote).permit(:value)
  end

end
