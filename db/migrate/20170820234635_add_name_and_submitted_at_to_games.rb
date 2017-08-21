class AddNameAndSubmittedAtToGames < ActiveRecord::Migration[5.1]
  def change
    add_column :games, :name, :string
    add_column :games, :submitted_at, :datetime
  end
end
