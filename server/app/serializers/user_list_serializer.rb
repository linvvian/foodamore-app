class UserListSerializer < ActiveModel::Serializer
  attributes :id, :name
  attribute :recipes

  def recipes
    object.recipes.map { |e| e.id }
  end
end
