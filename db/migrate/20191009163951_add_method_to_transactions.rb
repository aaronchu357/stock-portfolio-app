class AddMethodToTransactions < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :method, :string
  end
end
