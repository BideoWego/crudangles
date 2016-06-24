class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :author, :null => false
      t.text :body, :null => false
      t.integer :score, :default => 0
      t.integer :post_id, :null => false

      t.index :score
      t.index :post_id
      t.index :author

      t.timestamps null: false
    end
  end
end
