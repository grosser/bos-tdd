require File.dirname(__FILE__) + '/../spec_helper'

describe User do
  fixtures :users
  before(:each) do
    @user = users(:one)
    @valid_attributes = {
      'login'=>'newuser',
      'email'=>'new@email.com',
    }
  end
  
  it 'should create valid user' do
    User.create!(@valid_attributes)
  end
  
  it 'should stop invalid' do
    assert_invalid_attributes User, :login => ['',nil], :email => [nil,'','ohno']
  end

  it 'should not allow duplicated fields' do
    User.create!(@valid_attributes)
    assert_invalid_attributes User, :login => @user.login, :email => @user.email
  end

  it 'should be activated by default' do
    user = User.create!(@valid_attributes)
    user.activated.should be_true
  end

  it 'should only find activated' do
    User.activated(:all).should_not be_empty
    User.activated(:all).reject(&:activated).should be_empty
  end
end
