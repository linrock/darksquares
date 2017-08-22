class CreateGameVotes < ActiveRecord::Migration[5.1]
  def change
    create_table :game_votes do |t|
      t.integer :game_id, null: false
      t.integer :user_id, null: false
      t.integer :value, null: false
      t.timestamps
    end
    add_index :game_votes, [:game_id, :user_id], unique: true
  end
end
