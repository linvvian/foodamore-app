class AddStepAndOrderToInstructions < ActiveRecord::Migration[5.1]
  def change
    add_column :instructions, :step, :text
    add_column :instructions, :order, :integer
  end
end
