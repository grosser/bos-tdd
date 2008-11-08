require File.dirname(__FILE__) + '/../spec_helper'

describe Rating do
  scenario :simple_ratings
  before(:all) do
    @rating = ratings(:ratings_001)
  end

  it 'should fail when rate not in min max' do
    assert_raise(RuntimeError) { @rating.rate! 6 }
    assert_raise(RuntimeError) { @rating.rate! 0 }
  end
  
  it 'calculations' do
    assert_equal 15,@rating.total_points 
    assert_equal 5,@rating.total_ratings 
    assert_equal "3",@rating.rating 
  end
  
  it 'rate' do
    new_avg = "2.83"
    
    rating = @rating.rate!(2)
    
    rating.kind_of?(Rating).should be_true
    rating.rating.should == new_avg
    
    #get from db to see if it was saved
    rating = Rating.find @rating.id
    
    rating.r2.should == 2
    rating.total_ratings.should == 6
    rating.total_points.should == 17
    rating.rating.should == new_avg
  end
  
  it 'should cut off ending zero' do
    @rating.rate! 1 #16/6
    @rating.rating.should == "2.5"
    
    @rating.rate! 5 #21/7
    @rating.rating.should == "3"
  end  
end
