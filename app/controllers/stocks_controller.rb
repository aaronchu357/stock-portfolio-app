class StocksController < ApplicationController
  def index
    stocks = Stock.all
    render json: StockSerializer.new(stocks)
  end

  def create
    stock = Stock.create(stock_params)
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
