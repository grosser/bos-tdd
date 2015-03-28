require File.dirname(__FILE__) + '/../spec_helper'

describe Rating do
  fixtures :ratings
  
  before(:each) do
    @rating = ratings(:one)
  end

  it "should not be rateable outside of 1-5" do
    lambda {@rating.rate! 6}.should raise_error
    lambda {@rating.rate! 0}.should raise_error
  end
  
  it "should return self when rating" do
    @rating.rate!(2).should be_a_kind_of(Rating)
  end
  
  it "should calculate correctly" do
    @rating.total_points.should == 15 
    @rating.total_ratings.should == 5

    @rating.rate!(2).rating.should == "2.83" 
  end
  
  it "should save when rate!-ing" do
    @rating.rate!(2).reload.r2.should == 2 
  end
  
  it "should cut off ending zero" do
    @rating.rate!(3).rating.should == "3"    #18/6
    @rating.rate!(1).rate!(1).rating.should == "2.5"  #20/8
  end
end
