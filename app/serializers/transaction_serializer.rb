class TransactionSerializer
  include FastJsonapi::ObjectSerializer
  attributes :stock, :quantity, :price, :method
end
