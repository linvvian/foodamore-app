class User < ApplicationRecord
  has_secure_password
  has_many :lists
  has_many :list_recipe
  has_many :recipes, through: :list_recipe
end
