class AddFenToAnnotations < ActiveRecord::Migration[5.1]
  def change
    add_column :annotations, :fen, :string
  end
end
