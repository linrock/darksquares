class API::V1::UsersController < API::V1::BaseController

  # POST /api/v1/users
  def create
    user = User.create!(user_params)
    access_token = Doorkeeper::AccessToken.create!(
      application_id: nil,
      resource_owner_id: user.id,
      scopes: 'public'
    )
    render json: {
      access_token: access_token.token,
      token_type: "bearer",
    }
  end

  # GET /api/v1/users/me
  def me
    render json: {
      username: current_user.username,
      email: current_user.email
    }
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

end
