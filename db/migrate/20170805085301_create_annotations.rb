class CreateAnnotations < ActiveRecord::Migration[5.1]
  def change
    create_table :annotations do |t|
      t.integer :game_id
      t.integer :user_id
      t.string :text
    end
    add_index :annotations, :game_id
    add_index :annotations, :user_id
  end
end
