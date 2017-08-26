class API::V1::BaseController < ActionController::Base

  PAGE_SIZE = 10    # number of items to return with paginated requests

  def current_user
    User.find(doorkeeper_token.resource_owner_id)
  end

  private

  def offset
    ((params[:page] || 1).to_i - 1) * PAGE_SIZE
  end

  def render_json(data, options = { status: 200 })
    render json: data.to_json, status: options[:status]
  end
end
