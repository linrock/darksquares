class AddDeletedAtToAnnotations < ActiveRecord::Migration[5.1]
  def change
    add_column :annotations, :deleted_at, :datetime
  end
end
