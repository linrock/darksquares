class AddAnnotatorToAnnotations < ActiveRecord::Migration[5.1]
  def change
    add_column :annotations, :annotator, :string
  end
end
