class Recipe < ApplicationRecord
  has_many :list_recipes
  has_many :lists, through: :list_recipes
end
