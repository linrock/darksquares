class API::V1::UsersController < API::V1::BaseController

  # POST /api/v1/users
  def create
    user = User.create(user_params)
    if user.errors.present?
      render_json({ error: user.error_message_upon_creation }, status: 400)
    else
      render_json({
        access_token: user.create_access_token!.token,
        token_type: "bearer",
      })
    end
  end

  # GET /api/v1/users/me
  def me
    render_json({
      username: current_user.username,
      email: current_user.email
    })
  end

  # GET /api/v1/users/me/games
  def my_games
    games = current_user.games.order('id DESC').offset(offset).limit(PAGE_SIZE)
    render_json({
      games: games.map {|game|
        game.as_json.merge({
          annotations: game.annotations,
          score: game.votes.sum('value')
        })
      },
      more_results: games.length == PAGE_SIZE
    })
  end

  # GET /api/v1/users/me/annotations
  def annotations
    annotations = current_user.annotations.order('id DESC').offset(offset).limit(PAGE_SIZE)
    render_json({
      annotations: annotations,
      more_results: annotations.length == PAGE_SIZE
    })
  end

  # GET /api/v1/users/:username
  def profile
    user = User.find_by(username: params[:username])
    games = user.games.includes(:annotations).order('id DESC')
    annotations = user.annotations.includes(:game).order('id DESC')
    if !user
      render_json({}, status: 404)
    else
      render_json({
        user: {
          username: user.username,
          games: games.limit(PAGE_SIZE).map {|game|
            game.as_json.merge({
              annotations: game.annotations,
              score: game.votes.sum('value')
            })
          },
          games_count: games.count,
          annotations: annotations.limit(PAGE_SIZE).map {|annotation|
            # TODO deal with deleted games later
            pgn_headers = annotation.game&.pgn_headers || { "Deleted" => "Game" }
            annotation.as_json.merge({
              game: {
                pgn_headers: pgn_headers
              }
            })
          },
          annotations_count: annotations.count,
          created_at: user.created_at
        }
      })
    end
  end

  # GET /api/v1/users/:username/games
  def games
    user = User.find_by(username: params[:username])
    games = user.games.includes(:annotations).order('id DESC').offset(offset).limit(PAGE_SIZE)
    if !user
      render_json({}, status: 404)
    else
      render_json({
        games: games.map {|game|
          game.as_json.merge({
            annotations: game.annotations,
            score: game.votes.sum('value')
          })
        }
      })
    end
  end

  # GET /api/v1/users/:username/annotations
  def annotations
    user = User.find_by(username: params[:username])
    annotations = user.annotations.includes(:game).order('id DESC').offset(offset).limit(PAGE_SIZE)
    render_json({
      annotations: annotations.map {|annotation|
        # TODO deal with deleted games later
        pgn_headers = annotation.game&.pgn_headers || { "Deleted" => "Game" }
        annotation.as_json.merge({
          game: {
            pgn_headers: pgn_headers
          }
        })
      },
    })
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

end
