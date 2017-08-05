class API::V1::GamesController < API::V1::BaseController

  # GET /api/v1/games
  def index
    games = Game.all
    render json: games, serializer: GameSerializer
  end

  # GET /api/v1/games/:id
  def show
  end

  # POST /api/v1/games
  def create
  end

  # PATCH /api/v1/games/:id
  def update
  end

  # DELETE /api/v1/games/:id
  def destroy
  end
end
