require File.dirname(__FILE__) + '/../test_helper'

class RatingTest < Test::Unit::TestCase
  scenario :simple_ratings
  def setup
    @rating = ratings(:ratings_001)
  end

  def test_should_fail_when_rate_not_in_min_max
    assert_raise(RuntimeError) { @rating.rate! 6 }
    assert_raise(RuntimeError) { @rating.rate! 0 }
  end
  
  def test_calculations
    assert_equal 15,@rating.total_points 
    assert_equal 5,@rating.total_ratings 
    assert_equal "3",@rating.rating 
  end
  
  def test_rate
    new_avg = "2.83"
    
    rating = @rating.rate!(2)
    
    assert rating.kind_of?(Rating)
    assert_equal new_avg, rating.rating
    
    #get from db to see if it was saved
    rating = Rating.find @rating.id
    
    assert_equal 2, rating.r2
    assert_equal 6, rating.total_ratings
    assert_equal 17, rating.total_points
    assert_equal new_avg, rating.rating
  end
  
  def test_should_cut_off_ending_zero
    @rating.rate! 3 #18/6
    assert_equal "3", @rating.rating
    
    @rating.rate! 1
    @rating.rate! 1 #20/8
    assert_equal "2.5", @rating.rating
  end  
end
