class SetGamesMetadataDefault < ActiveRecord::Migration[5.1]
  def up
    change_column :games, :metadata, :jsonb, default: {}
  end

  def down
    change_column :games, :metadata, :jsonb, default: nil
  end
end
