class List < ApplicationRecord
  has_many :list_recipes
  has_many :recipes, through: :list_recipes
  belongs_to :user
end
