Rails.application.routes.draw do
  resources :games, only: :index

  namespace :api do
    resources :games, only: [:create, :show, :index, :update]
  end

  root 'games#index'
end
