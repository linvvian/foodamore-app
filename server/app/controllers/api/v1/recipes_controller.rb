class Api::V1::RecipesController < ApplicationController
  def index
    render json: Recipe.all
  end

  def create
    recipe = Recipe.new(recipe_params(:name, :source, :image, :video, :note))

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

      User.find(params[:user_id]).recipes << recipe
      recipe.users << User.find(params[:user_id])
      render json: recipe
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
    params[:recipe][:tags].each do |tag|
      tagsUpdated.push(Tag.find_or_create_by(name: tag[:name]))
    end
    params[:recipe][:addTags].each do |tag|
      tagsUpdated.push(Tag.find_or_create_by(name: tag))
    end
    instructionsUpdated = []
    params[:recipe][:instructions].each.with_index do |instruction, index|
      foundNewInstruction = Instruction.where({step: instruction[:step], recipe: recipe}).first_or_create(step: instruction[:step], order: index + 1, recipe: recipe)
      if foundNewInstruction[:order] != index + 1
        foundNewInstruction.update_attribute(:order, index+1)
      end
      instructionsUpdated.push(foundNewInstruction)
    end

    ingredientsUpdated = []
    params[:recipe][:ingredients].each do |ingredient|
      ingredientsUpdated.push(Ingredient.where({name: ingredient[:name], recipe: recipe}).first_or_create(name: ingredient[:name], recipe: recipe))
    end

    Recipe.update(params[:id], tags: tagsUpdated)
    Recipe.update(params[:id], instructions: instructionsUpdated.sort_by{ |t| t.order })
    Recipe.update(params[:id], ingredients: ingredientsUpdated)

    if recipe.update_attributes(recipe_params(:name, :source, :image, :video, :note))
      render json: { status: 200, message: "Recipe Updated", recipe: recipe }
    else
      render json: { message: recipe.errors.full_message }
    end
  end

  def destroy
    recipe = Recipe.find(params[:id])
    if recipe.destroy
      render json: { status: 200, message: "Recipe Deleted", id: params[:id] }
    else
      render json: { message: recipe.errors.full_message }
    end
  end

  private
  def recipe_params(*args)
    params.require(:recipe).permit(args)
  end
end
