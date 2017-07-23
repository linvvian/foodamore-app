class Api::V1::RecipesController < ApplicationController
  def index
    render json: Recipe.all
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
      render json: { message: recipe.errors.full_message }
    end
  end

  def show
    recipe = Recipe.find(params[:id])
    render json: recipe
  end

  def update
    recipe = Recipe.find(params[:id])
    tagsUpdated = []
    params[:tags].each do |tag|
      tagsUpdated.push(Tag.find_or_create_by(name: tag[:name]))
    end
    instructionsUpdated = []
    params[:instructions].each.with_index do |instruction, index|
      instructionsUpdated.push(Instruction.where({step: instruction[:step], recipe: recipe}).first_or_create(step: instruction[:step], order: index + 1, recipe: recipe))
    end

    ingredientsUpdated = []
    params[:ingredients].each do |ingredient|
      ingredientsUpdated.push(Ingredient.where({name: ingredient[:name], recipe: recipe}).first_or_create(name: ingredient, recipe: recipe))
    end

    updatedRecipe = recipe_params(:name, :image, :video, :note)
    updatedRecipe[:tags] = tagsUpdated
    updatedRecipe[:instructions] = instructionsUpdated
    updatedRecipe[:ingredients] = ingredientsUpdated

    if recipe.update(updatedRecipe)
      render json: { status: 200, message: "Recipe Updated" }
    else
      render json: { status: 401, message: recipe.errors.full_message }
    end
  end

  private
  def recipe_params(*args)
    params.require(:recipe).permit(args)
  end
end
