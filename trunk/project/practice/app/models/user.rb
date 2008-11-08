#AGILEDOX !WILL BE OVERWRITTEN!
#A User:
#  - should create valid user
#  - should stop invalid
#  - should not allow duplicated fields
#  - should be activated by default
#  - should only find activated
#AGILEDOX END
class User < ActiveRecord::Base
  validates_presence_of :email, :login
  validates_format_of :email, :with => /@/
  validates_uniqueness_of :email, :login
  
  def self.activated *args
    with_scope(:find => { :conditions => { :activated => true}}) do
      find(*args) 
    end
  end
end

