Rails.application.routes.draw do
  post '/sendsms', to: 'notifications#create'
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
