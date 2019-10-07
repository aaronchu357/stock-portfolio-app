class TransactionsController < ApplicationController
  def create
    transaction = Transaction.create(user_id: current_user_id, stock_id: params[:id])
  end

  def index
    transactions = Transaction.all
    render json: TransactionSerializer.new(transactions)
  end
end
