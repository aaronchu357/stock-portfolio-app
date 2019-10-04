class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :quantity
      t.references :stock, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
