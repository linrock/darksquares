class AddDeletedAtToGames < ActiveRecord::Migration[5.1]
  def change
    add_column :games, :deleted_at, :datetime
    add_index :games, :deleted_at
  end
end
