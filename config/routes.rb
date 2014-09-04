Rails.application.routes.draw do
  resources :games, only: [:show, :index, :create, :edit, :update, :delete]

  namespace :api do
    resources :games, only: [:show, :index]
  end

  root 'games#new'
end
