class CreateWidgets < ActiveRecord::Migration
  def self.up
    create_table :widgets do |t|
      t.integer :dashboard_id
      t.string :type
      t.string :source
      t.text :data

      t.timestamps
    end
  end

  def self.down
    drop_table :widgets
  end
end
