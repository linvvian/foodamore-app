class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :note, :image, :video, :tags
  has_many :instructions, serializer: InstructionRecipeSerializer
  has_many :ingredients, serializer: IngredientRecipeSerializer
end
