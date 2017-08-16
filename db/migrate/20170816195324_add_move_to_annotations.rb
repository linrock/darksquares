class AddMoveToAnnotations < ActiveRecord::Migration[5.1]
  def change
    add_column :annotations, :move, :jsonb
  end
end
