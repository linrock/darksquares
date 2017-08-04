class CreatePositionAnalyses < ActiveRecord::Migration[5.1]
  def change
    create_table :position_analyses do |t|
      t.string :fen
      t.integer :depth
      t.text :analysis_output
      t.timestamps
    end
    add_index :position_analyses, :fen
  end
end
