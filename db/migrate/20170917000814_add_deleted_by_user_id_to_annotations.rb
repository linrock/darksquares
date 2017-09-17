class AddDeletedByUserIdToAnnotations < ActiveRecord::Migration[5.1]
  def change
    add_column :annotations, :deleted_by_user_id, :integer
  end
end
