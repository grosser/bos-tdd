#re-selecting the form means loosing field-data
def form(selector=nil)
  raise "no form found" unless (@form ||= select_form selector)
  @form
end

#reset the form object on each submit
def form_submit
  form.submit
  @form = nil
end

#enter a nested value into the form
def form_enter type, valid_attributes
  valid_attributes.each { |field,value| form.send("#{type}[#{field}]=",value)}
end
