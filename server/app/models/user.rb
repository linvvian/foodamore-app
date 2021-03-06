class User < ApplicationRecord
  has_secure_password
  has_many :lists
  has_many :recipe_user
  has_many :recipes, through: :recipe_user
  validates :name, :email, presence: true
  validates :email, uniqueness: true
end
