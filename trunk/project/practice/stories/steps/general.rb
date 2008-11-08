steps_for(:general) do
  When("i go to $url") do |page|
    get page
  end
   
  When("i submit") do 
    form_submit    
  end
  
  Then("i should stay at $url") do |url_or_action|
    response.should render_template(url_or_action)
  end
  
  Then("the $record should have an error on $field") do |record,field|
    assigns(record).errors.on(field).should_not be_nil
  end
  
  Then("i should be redirected to the $record") do |record|
    response.should redirect_to(send("#{record}_path",assigns(record)))
  end
end