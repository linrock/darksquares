class API::V1::UsersController < API::V1::BaseController

  # POST /api/v1/users
  def create
    user = User.create(user_params)
    if user.errors
      render json: { error: user.error_message_upon_creation }, status: 400
    else
      render json: {
        access_token: user.create_access_token!.token,
        token_type: "bearer",
      }
    end
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
    if !user
      render json: {}, status: 404
    else
      render json: {
        user: {
          username: user.username,
          games: user.games.order('id DESC').map {|game|
            game.as_json.merge({
              annotations: game.annotations
            })
          },
          annotations: user.annotations.order('id DESC').map {|annotation|
            # TODO deal with deleted games later
            pgn_headers = annotation.game && annotation.game.pgn_headers || { "Deleted" => "Game" }
            annotation.as_json.merge({
              game: {
                pgn_headers: pgn_headers
              }
            })
          },
          created_at: user.created_at
        }
      }
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

end
