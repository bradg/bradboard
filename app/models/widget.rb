require 'open-uri'
class Widget < ActiveRecord::Base
  def get_data_from_source
    raise "No source for widget #{self.id}" unless self.source
    #sleep 1 if Rails.env == 'development' # slow down requests to prevent localhost server locking up 
    self.data = open(self.source).read
    self.save
    self.data
  end

  def cached_data
    if self.source
      self.get_data_from_source
    else
      self.data
    end
  end

  def self.types
    self.subclasses.map(&:to_s).map(&:underscore)
    %w/plain_text_widget fixed_text_widget red_orange_green_widget xml_text_widget chart_widget/
  end
end
