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

  # GET /api/v1/users/me/games
  def games
    render json: {
      games: current_user.games.map {|game|
        game.as_json.merge({
          annotations: game.annotations
        })
      }
    }
  end

  # GET /api/v1/users/me/annotations
  def annotations
    annotations = current_user.annotations.order('id DESC').limit(10)
    render json: {
      annotations: annotations
    }
  end

  # GET /api/v1/users/:username
  def profile
    user = User.find_by(username: params[:username])
    render json: {
      user: {
        username: user.username,
        games: user.games.map {|game|
          game.as_json.merge({
            annotations: game.annotations
          })
        },
        annotations: user.annotations
      }
    }
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

end
