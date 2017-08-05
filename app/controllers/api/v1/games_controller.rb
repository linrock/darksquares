class API::V1::GamesController < API::V1::BaseController

  # GET /api/v1/games
  def index
    games = Game.order('id DESC').all
    render json: games
  end

  # GET /api/v1/games/:id
  def show
  end

  # POST /api/v1/games
  def create
    game = Game.create(game_params)
    GameDataCalculatorJob.perform_later game
    render json: {}
  end

  # PATCH /api/v1/games/:id
  def update
  end

  # DELETE /api/v1/games/:id
  def destroy
  end

  private

  def game_params
    params.require(:game).permit(:pgn)
  end

end
