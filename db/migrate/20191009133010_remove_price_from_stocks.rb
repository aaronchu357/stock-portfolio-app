class RemovePriceFromStocks < ActiveRecord::Migration[5.2]
  def change
    remove_column :stocks, :price, :decimal
  end
end
