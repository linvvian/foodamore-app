Rails.application.routes.draw do
  resources :recipe_users
  resources :instructions
  resources :list_recipes
  namespace :api do
    namespace :v1 do
      post '/login', to: 'auth#create'
      get '/me', to: 'auth#show'
      post '/signup', to: 'users#create'
      resources :ingredients
      resources :tags
      resources :recipes
      resources :lists
      resources :users, except: [:create]
    end
  end
end
