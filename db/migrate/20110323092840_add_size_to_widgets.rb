class AddSizeToWidgets < ActiveRecord::Migration
  def self.up
    add_column :widgets, :size, :string
  end

  def self.down
    remove_column :widgets, :size
  end
end
