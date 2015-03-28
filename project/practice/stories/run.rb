require File.join(File.dirname(__FILE__),'helper')
require File.join(File.dirname(__FILE__),'form')

with_steps_for :users, :general do
  run_story 'users'
end