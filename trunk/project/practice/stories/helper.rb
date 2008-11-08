puts ARGV

ENV["RAILS_ENV"] = "test"
require File.expand_path(File.dirname(__FILE__) + "/../config/environment")
require 'spec/rails/story_adapter'

#load all steps
Dir[File.join(File.dirname(__FILE__), "steps/*.rb")].each do |file|
  require file
end

#run a story
def run_story(file_name)
  run File.join(File.dirname(__FILE__),"/stories/#{file_name}.txt"), :type => RailsStory, :color=>true,:colour=>true
end