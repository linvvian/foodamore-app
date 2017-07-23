class RecipeUser < ApplicationRecord
  belongs_to :recipe
  belongs_to :user, optional: :true
end
