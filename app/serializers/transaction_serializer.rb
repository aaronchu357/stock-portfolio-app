class TransactionSerializer
  include FastJsonapi::ObjectSerializer
  belongs_to :user, :stock
end
