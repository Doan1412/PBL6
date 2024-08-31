Rails.application.routes.draw do
  post "auth/login", to: "authentication#login"
  post "auth/google_oauth2", to: "authentication#login_oauth_google"
  get "up" => "rails/health#show", as: :rails_health_check
end
