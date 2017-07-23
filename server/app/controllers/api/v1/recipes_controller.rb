class Api::V1::RecipesController < ApplicationController
  def index
    render json: Recipe.all
  end

  def show
    recipe = Recipe.find(params[:id])
    render json: recipe
  end

  def create
    recipe = Recipe.new(recipe_params(:name, :image, :video, :note))

    if recipe.save
      params[:recipe][:tags].each do |tag|
        recipe.tags << Tag.find_or_create_by(name: tag)
      end

      params[:recipe][:instructions].each_with_index do |instruction, index|
        Instruction.create(step: instruction, order: index + 1, recipe: recipe)
      end

      params[:recipe][:ingredients].each do |ingredient|
        Ingredient.create(name: ingredient, recipe: recipe)
      end

      user = User.find(params[:user_id])
      user.recipes << recipe
      render json: { status: 200, message: "Saved Recipe" }
    else
      render json: { message: "Recipe could not be saved"}
    end

  end

  private
  def recipe_params(*args)
    params.require(:recipe).permit(args)
  end
end
