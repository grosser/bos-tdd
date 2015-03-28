require File.dirname(__FILE__) + '/../../spec_helper'

describe "/users/index" do
  fixtures :users
  
  before(:each) do
    assigns[:users]=[users(:one),users(:one)]
  end
  
  it "sould have enought rows" do
    render '/users/index'
    response.should have_tag('tr',:count=>2+1) #2items + heading
  end
end