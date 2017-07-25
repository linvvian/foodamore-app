class Recipe < ApplicationRecord
  has_many :recipe_user
  has_many :users, through: :recipe_user, :dependent => :destroy
  has_many :list_recipes
  has_many :lists, through: :list_recipes, :dependent => :destroy
  has_many :recipe_tags
  has_many :tags, through: :recipe_tags, :dependent => :destroy
  has_many :instructions, :dependent => :destroy
  has_many :ingredients, :dependent => :destroy
end
