require File.dirname(__FILE__) + '/../spec_helper'

describe UsersController do
  fixtures :users
  
  before(:each) do
    @user = users(:one)
    User.stubs(:find).with(users(:one).id.to_s).returns(@user)
    User.stubs(:find).with(users(:one).id).returns(@user)
  end
  
  it 'index should succeed' do
    User.expects(:activated).with(:all).once.returns([])
    
    get :index
    response.should be_success
    assigns(:users).should_not be_nil
  end
  
  it 'new should succeed' do
    excpect_new
    
    get :new
    response.should be_success
    assigns(:user).should_not be_nil
  end

  it 'create should succeed' do
    excpect_new
    expect_save true
    @user.stubs(:new_record?).returns(false)#user_path(@user) = /users/ --> /user/1

    post :create, :user => {}
    flash[:notice].should_not be_nil
    response.should redirect_to(user_path(@user))
  end
  
  it 'create should fail' do
    excpect_new
    expect_save false
    
    post :create, :user => {}
    assigns(:user).should == @user
    response.should render_template('new')
  end

  it 'show should succeed' do
    get :show, :id => users(:one).id
    assigns(:user).should == @user
    response.should be_success
  end

  it 'edit should succeed' do
    get :edit, :id => users(:one).id
    assigns(:user).should == @user
    response.should be_success
  end

  it 'update should succeed' do
    expect_save true
    
    put :update, :id => users(:one).id, :user => {:login => 'micha' }
    assigns(:user).should == @user
    @user.login.should == 'micha'
    response.should redirect_to(user_path(assigns(:user)))
  end
  
  it 'update should fail' do
    expect_save false

    put :update, :id => users(:one).id, :user => {:login => 'micha' }
    assigns(:user).should == @user
    @user.login.should == 'micha'
    response.should render_template('edit')
  end

  it 'destroy should succeed' do
    @user.expects(:destroy).once.returns(true)
    
    delete :destroy, :id => users(:one).id
    response.should redirect_to(users_path)
  end

  def excpect_new
    @user = User.new
    User.expects(:new).once.returns(@user)
  end
  
  def expect_save val
    @user.expects(:save).once.returns(val)
  end
end
