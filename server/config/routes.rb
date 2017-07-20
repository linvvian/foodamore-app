Rails.application.routes.draw do
  resources :list_recipes
  namespace :api do
    namespace :v1 do
      post '/login', to: 'auth#create'
      get '/me', to: 'auth#show'
      resources :ingredients
      resources :tags
      resources :recipes
      resources :lists
      resources :users
    end
  end
end
