class Recipe < ApplicationRecord
  has_many :recipe_user
  has_many :users, through: :recipe_user
  has_many :list_recipes
  has_many :lists, through: :list_recipes
  has_many :recipe_tags
  has_many :tags, through: :recipe_tags
  has_many :instructions
  has_many :ingredients
end
