class User < ApplicationRecord
  has_many :transactions
  has_many :stocks, through: :transactions

  has_secure_password
  validates_uniqueness_of :email
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create
  validates :password_digest, confirmation: true
  validates :password_digest_confirmation, presence: true
end
