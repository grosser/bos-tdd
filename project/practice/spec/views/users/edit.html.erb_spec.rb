require File.dirname(__FILE__) + '/../../spec_helper'

describe "/users/edit" do
  fixtures :users
  
  before(:each) do
    assigns[:user]=users(:one)
  end
  
  it "sould show errors" do
    assigns[:user].errors.add_to_base 'oh no!'
    render '/users/edit'
    response.should have_tag('.errorExplanation',/oh no!/)
  end
end


