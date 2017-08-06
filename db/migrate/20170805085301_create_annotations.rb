class CreateAnnotations < ActiveRecord::Migration[5.1]
  def change
    create_table :annotations do |t|
      t.integer :game_id,     null: false
      t.integer :user_id,     null: false
      t.string :move_string,  null: false
      t.string :text,         null: false
    end
    add_index :annotations, :game_id
    add_index :annotations, :user_id
  end
end
