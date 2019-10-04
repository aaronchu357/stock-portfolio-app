class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :email, :password_digest
  has_many :transactions
end
