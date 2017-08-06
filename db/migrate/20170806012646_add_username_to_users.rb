class AddUsernameToUsers < ActiveRecord::Migration[5.1]
  def up
    add_column :users, :username, :string, null: false
    execute "CREATE UNIQUE INDEX index_users_on_lowercase_username
             ON users USING btree (LOWER(username));"
  end

  def down
    execute "DROP INDEX index_users_on_lowercase_username;"
    remove_column :users, :username
  end

end
