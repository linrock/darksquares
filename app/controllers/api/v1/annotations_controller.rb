class API::V1::AnnotationsController < API::V1::BaseController

  # POST /api/v1/games/:game_id/annotations
  def create
    game.annotations.create(annotation_params.merge(user_id: 1))
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
    params.require(:annotation).permit(:text, :move_string)
  end
end
