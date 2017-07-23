class AddNoteToRecipes < ActiveRecord::Migration[5.1]
  def change
    add_column :recipes, :note, :text
    remove_column :recipes, :instructions
  end
end
