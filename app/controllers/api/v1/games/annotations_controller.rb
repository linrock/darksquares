class API::V1::Games::AnnotationsController < API::V1::BaseController

  # POST /api/v1/games/:game_id/annotations
  def create
    game.annotations.create(annotation_params)
    render json: {}
  end

  # PATCH /api/v1/games/:game_id/annotations
  def update
  end

  # DELETE /api/v1/games/:game_id/annotations/:id
  def destroy
  end

  private

  def game
    Game.find(params[:game_id])
  end

  def annotation_params
    params.require(:annotation).permit(:text)
  end
end
