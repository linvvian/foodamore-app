class UserRecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :ingredients, :instructions, :note, :image, :video
end
