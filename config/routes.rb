Rails.application.routes.draw do
  resources :transactions
  resources :stocks
  resources :users

  resources :users do
    resources :transactions
  end
  
  post "/login", to: "auth#login"
  post "/signup", to: "users#create"
  get "/profile", to: "users#profile"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
