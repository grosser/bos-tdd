require File.join(File.dirname(__FILE__), "..", "test_helper")
require 'mocha/expectation_list'
require 'mocha/expectation'
require 'set'
require 'method_definer'

class ExpectationListTest < Test::Unit::TestCase
  
  include Mocha
  
  def test_should_return_added_expectation
    expectation_list = ExpectationList.new
    expectation = Expectation.new(nil, :my_method)
    assert_same expectation, expectation_list.add(expectation)
  end
  
  def test_should_find_matching_expectation
    expectation_list = ExpectationList.new
    expectation1 = Expectation.new(nil, :my_method).with(:argument1, :argument2)
    expectation2 = Expectation.new(nil, :my_method).with(:argument3, :argument4)
    expectation_list.add(expectation1)
    expectation_list.add(expectation2)
    assert_same expectation2, expectation_list.detect(:my_method, :argument3, :argument4)
  end
  
  def test_should_find_most_recent_matching_expectation
    expectation_list = ExpectationList.new
    expectation1 = Expectation.new(nil, :my_method).with(:argument1, :argument2)
    expectation2 = Expectation.new(nil, :my_method).with(:argument1, :argument2)
    expectation_list.add(expectation1)
    expectation_list.add(expectation2)
    assert_same expectation2, expectation_list.detect(:my_method, :argument1, :argument2)
  end
  
  def test_should_find_most_recent_matching_expectation_but_give_preference_to_those_allowing_invocations
    expectation_list = ExpectationList.new
    expectation1 = Expectation.new(nil, :my_method)
    expectation2 = Expectation.new(nil, :my_method)
    expectation1.define_instance_method(:invocations_allowed?) { true }
    expectation2.define_instance_method(:invocations_allowed?) { false }
    expectation_list.add(expectation1)
    expectation_list.add(expectation2)
    assert_same expectation1, expectation_list.detect(:my_method)
  end
  
  def test_should_find_most_recent_matching_expectation_if_no_matching_expectations_allow_invocations
    expectation_list = ExpectationList.new
    expectation1 = Expectation.new(nil, :my_method)
    expectation2 = Expectation.new(nil, :my_method)
    expectation1.define_instance_method(:invocations_allowed?) { false }
    expectation2.define_instance_method(:invocations_allowed?) { false }
    expectation_list.add(expectation1)
    expectation_list.add(expectation2)
    assert_same expectation2, expectation_list.detect(:my_method)
  end

end
