class API::V1::AnnotationsController < API::V1::BaseController
  before_action :doorkeeper_authorize!

  # POST /api/v1/games/:game_id/annotations
  def create
    annotation = game.annotations.create!(annotation_params.merge(user_id: current_user.id))
    render json: {
      annotation: annotation
    }
  end

  # PATCH /api/v1/games/:game_id/annotations
  def update
  end

  # DELETE /api/v1/games/:game_id/annotations/:id
  def destroy
    current_user.annotations.find(params[:id]).destroy!
    render json: {}
  end

  private

  def game
    Game.find(params[:game_id])
  end

  def annotation_params
    params.require(:annotation).permit(:text, :move_string)
  end
end
