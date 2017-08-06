class API::V1::BaseController < ActionController::Base

  def current_user
    User.find(doorkeeper_token.resource_owner_id)
  end

end
