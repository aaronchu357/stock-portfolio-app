class AuthController < ApplicationController
  skip_before_action :verify_authenticity_token
  def login
    params[:email].downcase!
    user = User.find_by(email: params[:email])
    is_authenticated = user.authenticate(params[:password])

    if is_authenticated
      render json: { token: encode_token(user_payload(user)), user: { id: user.id, attributes: user } }
    else
      render json: { error: "Invalid. Please check that you have entered the correct email address and password." }
    end
 end
end