class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :email, :password_digest, :name, :balance, :transactions
end
