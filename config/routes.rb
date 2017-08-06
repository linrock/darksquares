Rails.application.routes.draw do
  # devise_for :users

  use_doorkeeper do
    skip_controllers :applications, :authorized_applications, :authorizations
  end

  root to: "application#index"

  get "/importer"    => "application#game_importer"
  get "/games"       => "application#games"
  get "/annotations" => "application#annotations"
  get "/login"       => "application#login"
  get "/sign_up"     => "application#sign_up"

  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      get "/users/me" => "users#me"
      resources :games, only: [:index, :show, :create, :destroy, :update] do
        resources :annotations, only: [:create, :destroy, :update]
      end
    end
  end
end
