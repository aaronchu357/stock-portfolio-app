class UsersController < ApplicationController
  def create
    user = User.create(user_params)
    if user.valid?
      if params[:transaction_attributes]
        params[:transaction_attributes].each do |transaction_param|
          user.transactions << Transaction.find(transaction_param[:id])
        end
      end
      render json: { token: encode_token(user_payload(user)) }, status: :created
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
    params.require(:user).permit(:email, :password, :balance)
  end
end
