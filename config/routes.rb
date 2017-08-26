Rails.application.routes.draw do
  # devise_for :users

  use_doorkeeper do
    skip_controllers :applications, :authorized_applications, :authorizations
  end

  root to: "application#home"

  get "/import"       => "application#index"
  get "/submit"       => "application#index"
  get "/games/:id"    => "application#index"
  get "/annotations"  => "application#index"
  get "/login"        => "application#index"
  get "/sign_up"      => "application#index"
  get "/profile"      => "application#index"
  get "/about"        => "application#index"

  get "/u/:username"             => "application#index"
  get "/u/:username/games"       => "application#index"
  get "/u/:username/annotations" => "application#index"

  namespace :api do
    namespace :v1 do
      namespace :users do
        get "/me"                    => "users#me"
        get "/me/games"              => "users#my_games"
        get "/me/annotations"        => "users#annotations"

        get "/:username"             => "users#profile"
        get "/:username/games"       => "users#games"
        get "/:username/annotations" => "users#annotations"
      end

      resources :users, only: [:create]

      resources :games, only: [:index, :show, :create, :destroy, :update] do
        member do
          get "/status" => "games#status"
          post "/votes" => "games#vote"
        end
        resources :annotations, only: [:create, :destroy, :update]
      end
    end
  end
end
