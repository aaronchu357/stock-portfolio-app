class StockSerializer
  include FastJsonapi::ObjectSerializer
  attributes :ticker, :price
end
