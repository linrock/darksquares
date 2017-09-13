class API::V1::GamesController < API::V1::BaseController
  before_action :doorkeeper_authorize!, only: [:create, :update, :destroy]

  # GET /api/v1/games
  def index
    games = Game.includes(:user, annotations: :user).order('id DESC').offset(page_offset).limit(PAGE_SIZE)
    results = {
      games: games.includes(:annotations).map {|game|
        game.as_json.merge({
          annotations: game.annotations.includes(:user).order('id DESC'),
          score: game.votes.sum('value')
        })
      },
      more_results: games.length == PAGE_SIZE && (PAGE_SIZE * page_num != Game.count)
    }
    if current_user
      game_votes = current_user.game_votes.includes(:user).where(game_id: games.map(&:id))
      results[:game_votes] = game_votes.map {|vote|
        {
          game_id: vote.game.id,
          value: vote.value
        }
      }
    end
    render_json(results)
  end

  # GET /api/v1/games/:id
  def show
    game = Game.unscoped.find_by(id: params[:id])
    if game.nil?
      render_json({ error: "Game not found" }, status: 404)
    elsif game.deleted_at
      render_json({ error: "This game has been deleted" }, status: 404)
    else
      render_json({
        game: game.as_json.merge({
          annotations: game.annotations.includes(:user),
          score: game.votes.sum('value')
        })
      })
    end
  end

  # GET /api/v1/games/:id/status
  def status
    game = Game.find(params[:id])
    render_json({
      game: {
        id: game.id,
        status: game.status,
        percent: game.percent_analyzed
      }
    })
  end

  # POST /api/v1/games
  def create
    game = Game.create!(create_game_params.merge(user_id: current_user.id))
    GameDataCalculatorJob.perform_later game.id
    render_json({
      game: game.as_json
    })
  end

  # POST /api/v1/games/:id/votes
  def vote
    game = Game.find(params[:id])
    if game.user_id == current_user.id
      render_json({}, status: 400)
    else
      vote = game.votes.find_by(user_id: current_user.id)
      if vote
        vote.value = vote_game_params[:value]
      else
        vote = game.votes.new(user_id: current_user.id, value: vote_game_params[:value])
      end
      vote.save!
      render_json({
        vote: vote
      })
    end
  end

  # PATCH /api/v1/games/:id
  def update
    game = current_user.games.find(params[:id])
    if params[:submit]
      if game.submitted_at.present?
        render_json({}, status: 400)
        return
      elsif patch_game_params[:name].present?
        game.update_attributes!(patch_game_params.merge({
          submitted_at: Time.now
        }))
      else
        game.update_attributes!(submitted_at: Time.now)
      end
    else
      game.update_attributes!(patch_game_params)
    end
    render_json({
      game: game.as_json.merge({
        annotations: game.annotations.includes(:user)
      })
    })
  end

  # DELETE /api/v1/games/:id
  def destroy
    game = current_user.games.find(params[:id])
    game.destroy!
    render_json({})
  end

  private

  def create_game_params
    params.require(:game).permit(:pgn)
  end

  def patch_game_params
    all_pgn_headers = params.require(:game).fetch(:pgn_headers, nil).try(:permit!)
    params.require(:game).permit(:name).merge(pgn_headers: all_pgn_headers)
  end

  def vote_game_params
    params.require(:vote).permit(:value)
  end

end
