# This file is copied to ~/spec when you run 'ruby script/generate rspec'
# from the project root directory.
ENV["RAILS_ENV"] = "test"
require File.expand_path(File.dirname(__FILE__) + "/../config/environment")
require 'spec'
require 'spec/rails'
require 'rspec_hpricot_matchers'

Spec::Runner.configure do |config|
  # If you're not using ActiveRecord you should remove these
  # lines, delete config/database.yml and disable :active_record
  # in your config/boot.rb
  config.use_transactional_fixtures = true
  config.use_instantiated_fixtures  = false
  config.fixture_path = RAILS_ROOT + '/spec/fixtures/'

  # == Fixtures
  #
  # You can declare fixtures for each example_group like this:
  #   describe "...." do
  #     fixtures :table_a, :table_b
  #
  # Alternatively, if you prefer to declare them only once, you can
  # do so right here. Just uncomment the next line and replace the fixture
  # names with your fixtures.
  #
  # config.global_fixtures = :table_a, :table_b
  #
  # If you declare global fixtures, be aware that they will be declared
  # for all of your examples, even those that don't use them.
  #
  # == Mock Framework
  #
  # RSpec uses it's own mocking framework by default. If you prefer to
  # use mocha, flexmock or RR, uncomment the appropriate line:
  #
  # config.mock_with :mocha
  # config.mock_with :flexmock
  # config.mock_with :rr

  #create a set of invalid attributes
  def invalid_attributes search='', replace=''
    @valid_attributes ||= {}
    @valid_attributes[search]=replace unless search.blank?
    @valid_attributes
  end
  
  #idea: http://www.railsforum.com/viewtopic.php?id=741
  #example: User, :login=>['',nil,'admin'], :email=>['',nil,'aa','@','a@','@a']
  def assert_invalid_attributes(model_class, attributes)
    attributes.each_pair do |attribute, value|
      assert_invalid_value model_class, attribute, value
    end
  end 
  
  #idea: http://www.railsforum.com/viewtopic.php?id=741
  #example: User, :login, ['',nil,'admin']
  def assert_invalid_value(model_class, attribute, value)
    if value.kind_of? Array
      value.each { |v| assert_invalid_value model_class, attribute, v }
    else
      attributes = invalid_attributes(attribute,value)
      record = model_class.new(attributes)
      assert_block "<#{model_class}.#{attribute}> expected to be invalid when set to <#{value}>" do
        record.valid? # Must be called to generate the errors
        record.errors.invalid? attribute
      end
    end
  end 
  
  config.include(RspecHpricotMatchers)
end
