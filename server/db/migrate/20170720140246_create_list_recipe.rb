class CreateListRecipe < ActiveRecord::Migration[5.1]
  def change
    create_table :list_recipes do |t|
      t.references :list
      t.references :recipe
    end
  end
end
