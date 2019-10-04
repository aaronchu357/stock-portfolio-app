class UsersController < ApplicationController
  def create
    @user = User.create(user_params)
    if @user.valid?
      if params[:stock_attributes]
        params[:stock_attributes].each do |stock_param|
          @user.stocks << Stock.find(stock_param[:id])
        end
      end
      render json: { token: encode_token(user_payload(@user)) }, status: :created
    else
      render json: { error: 'failed to create user' }, status: :not_acceptable
    end
  end

  def index
    @users = User.all
    render json: UserSerializer.new(@users)
  end

  def profile
    render json: UserSerializer.new(current_user)
  end

  private
  def user_params
    params.permit(:email, :password)
  end
end
