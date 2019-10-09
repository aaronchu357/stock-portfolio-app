class TransactionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    transaction = Transaction.create(transaction_params)
    render json: TransactionSerializer.new(transaction)
  end

  def index
    if params[:user_id]
      transactions = User.find(params[:user_id]).transactions
    else
      transactions = Transaction.all
    end
    render json: TransactionSerializer.new(transactions)
  end

  private
  def transaction_params
    params.permit(:user_id, :stock_id, :quantity)
  end
end
