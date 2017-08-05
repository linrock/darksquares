Rails.application.routes.draw do
  root to: "application#index"

  get "/importer"    => "application#game_importer"
  get "/games"       => "application#games"
  get "/annotations" => "application#annotations"

  namespace :api do
    namespace :v1 do
      resources :games, only: [:index, :show, :create, :destroy, :update] do
        resources :annotations, only: [:create, :destroy, :update]
      end
    end
  end
end
