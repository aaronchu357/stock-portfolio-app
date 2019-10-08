class TransactionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    transaction = Transaction.create(transaction_params)
    render json: TransactionSerializer.new(transaction)
  end

  def index
    transactions = Transaction.all
    render json: TransactionSerializer.new(transactions)
  end

  private
  def transaction_params
    params.permit(:user_id, :stock_id, :quantity)
  end
end
