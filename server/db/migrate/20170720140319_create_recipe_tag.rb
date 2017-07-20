class CreateRecipeTag < ActiveRecord::Migration[5.1]
  def change
    create_table :recipe_tags do |t|
      t.references :tag
      t.references :recipe
    end
  end
end
