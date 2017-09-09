class API::V1::BaseController < ActionController::Base
  force_ssl if: :ssl_configured?

  PAGE_SIZE = 10    # number of items to return with paginated requests

  def current_user
    return unless doorkeeper_token
    User.find_by(id: doorkeeper_token.resource_owner_id)
  end

  private

  def offset
    ((params[:page] || 1).to_i - 1) * PAGE_SIZE
  end

  def render_json(data, options = { status: 200 })
    render json: data.to_json, status: options[:status]
  end

  def ssl_configured?
    Rails.env.production?
  end
end
