class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :note, :image, :video
  has_many :instructions, serializer: InstructionRecipeSerializer
  has_many :ingredients, serializer: IngredientRecipeSerializer
  has_many :tags, serializer: RecipeTagSerializer
end
