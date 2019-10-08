class StocksController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    stocks = Stock.all
    render json: StockSerializer.new(stocks)
  end

  def create
    stock = Stock.find_or_create_by(stock_params)
    render json: StockSerializer.new(stock)
  end

  def show
    stock = Stock.find(params[:id])
    render json: StockSerializer.new(stock)
  end

  private
  def stock_params
    params.permit(:ticker, :price)
  end
end
