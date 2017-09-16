class API::V1::AnnotationsController < API::V1::BaseController
  before_action :doorkeeper_authorize!

  # POST /api/v1/games/:game_id/annotations
  def create
    if create_annotation_params[:annotator].present? && current_user.id != game.user.id
      render_json({ error: "Unauthorized" }, status: 401)
      return
    end
    annotation_params = create_annotation_params.merge(user_id: current_user.id)
    annotation = game.annotations.create!(annotation_params)
    render_json({
      annotation: annotation
    })
  end

  # PATCH /api/v1/games/:game_id/annotations/:id
  def update
    annotation = game.annotations.find_by(id: params[:id])
    unless annotation
      render_json({ error: "Annotation not found" }, status: 404)
      return
    end
    if current_user.id != annotation.user_id
      render_json({ error: "Unauthorized" }, status: 401)
      return
    end
    if current_user.id != game.user.id
      annotation.update_attributes!({ text: patch_annotation_params[:text] })
    else
      annotation.update_attributes!(patch_annotation_params)
    end
    render_json({
      annotation: annotation
    })
  end

  # DELETE /api/v1/games/:game_id/annotations/:id
  def destroy
    current_user.annotations.find(params[:id]).destroy!
    render_json({})
  end

  private

  def game
    Game.find(params[:game_id])
  end

  def create_annotation_params
    params.require(:annotation).permit(:text, :move_string, :annotator)
  end

  def patch_annotation_params
    params.require(:annotation).permit(:text, :annotator)
  end
end
