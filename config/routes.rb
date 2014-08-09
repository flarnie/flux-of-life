Rails.application.routes.draw do
  resources :games, :only => [:show, :index, :create, :edit, :update, :delete]
end
