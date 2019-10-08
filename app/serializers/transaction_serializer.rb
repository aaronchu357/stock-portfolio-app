class TransactionSerializer
  include FastJsonapi::ObjectSerializer
  belongs_to :user
  attributes :stock, :quantity
end
