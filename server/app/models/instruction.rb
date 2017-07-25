class Instruction < ApplicationRecord
  belongs_to :recipe, :dependent => :destroy
end
