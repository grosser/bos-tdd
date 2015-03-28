class AddActivatedToUser < ActiveRecord::Migration
  def self.up
    add_column "users", "activated", :boolean, :default => true
  end

  def self.down
    remove_column "users", "activated"
  end
end