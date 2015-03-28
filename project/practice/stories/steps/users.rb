valid_attributes = {
  'login'=>'newuser',
  'email'=>'new@email',
  'activated'=>"1",
}

steps_for(:users) do
  When("i enter valid attributes") do
    form_enter 'user', valid_attributes
  end
  
  When("i enter valid attributes except $attribute") do |attribute|
    form_enter 'user', valid_attributes
    form.user[attribute]=''
  end
  
  When("i change the first to $field = $value") do |field,value|
    response.body.should have_tag('tr a') do |links|
      next if (links.to_s !~ /\/(\d+)\/edit/)
      @first_id = $1
      User.find(@first_id).update_attributes({field => value})
    end
  end
  
  Then("i do not see the first") do
    response.body.should have_tag('*') do |all|
      all.to_s.should_not =~ /\/#{@first_id}[^\d]\//i
    end
  end
end