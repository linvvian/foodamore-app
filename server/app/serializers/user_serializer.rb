class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email
  has_many :lists, serializer: UserListSerializer
  has_many :recipes, serializer: UserRecipeSerializer
end
