class AddTimestampsToAnnotations < ActiveRecord::Migration[5.1]
  def change
    change_table :annotations do |t|
      t.timestamps null: false
    end
  end
end
