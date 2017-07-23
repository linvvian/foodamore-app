class CreateRecipeUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :recipe_users do |t|
      t.references :recipe, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
