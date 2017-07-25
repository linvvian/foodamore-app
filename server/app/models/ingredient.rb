class Ingredient < ApplicationRecord
  belongs_to :recipe, :dependent => :destroy
end
