class User < ApplicationRecord
  has_many :transactions
  has_many :stocks, through: :transactions

  has_secure_password
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create
end
