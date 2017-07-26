class Api::V1::ListsController < ApplicationController
  def create
    list = List.new(name: params[:list][:name])
    list.user_id = params[:user_id]
    params[:list][:recipesToAdd].each do |recipe|
      list.recipes << Recipe.find(recipe[:id])
    end
    if list.save
      render json: { id: list.id, name: list.name, recipes: list.recipes }
    else
      render json: { error: list.errors.full_message }
    end
  end
end
