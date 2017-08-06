class API::V1::UsersController < ActionController::Base

  # POST /api/v1/users
  def create
    user = User.create!(user_params)
    access_token = Doorkeeper::AccessToken.create!(
      application_id: nil,
      resource_owner_id: user.id,
      scopes: 'public'
    )
    render json: {
      access_token: access_token.token
    }
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

end
