class CreateInstructions < ActiveRecord::Migration[5.1]
  def change
    create_table :instructions do |t|
      t.references :recipe, foreign_key: true

      t.timestamps
    end
  end
end
