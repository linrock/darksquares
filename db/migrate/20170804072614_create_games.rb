class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.integer :user_id
      t.text :pgn
      t.jsonb :pgn_headers
      t.jsonb :positions
      t.jsonb :moves
      t.jsonb :analysis
      t.jsonb :best_moves
      t.jsonb :graph_points
      t.jsonb :metadata
      t.timestamps
    end
    add_index :games, :user_id
  end
end
