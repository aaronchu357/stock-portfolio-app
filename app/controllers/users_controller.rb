class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    user = User.new
  end

  def create
    user = User.new(user_params)
    user.email.downcase!
    if user.save
      if params[:transaction_attributes]
        params[:transaction_attributes].each do |transaction_param|
          user.transactions << Transaction.find(transaction_param[:id])
        end
      end
      render json: { token: encode_token(user_payload(user)), user: user  }, status: :created
    else
      render json: { error: 'failed to create user' }, status: :not_acceptable
    end
  end

  def index
    users = User.all
    render json: UserSerializer.new(users)
  end

  def profile
    render json: UserSerializer.new(current_user)
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :balance)
  end
end
