class StockSerializer
  include FastJsonapi::ObjectSerializer
  attributes :ticker
end
