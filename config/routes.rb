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
      get "/users/me"             => "users#me"
      get "/users/me/games"       => "users#my_games"
      get "/users/me/annotations" => "users#annotations"

      get "/users/:username"             => "users#profile"
      get "/users/:username/games"       => "users#games"
      get "/users/:username/annotations" => "users#annotations"

      resources :users, only: [:create]

      resources :games, only: [:index, :show, :create, :destroy, :update] do
        member do
          get "/status" => "games#status"
        end
        resources :annotations, only: [:create, :destroy, :update]
      end
    end
  end
end
