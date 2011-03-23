class ChartWidget < Widget
  def cached_data
    if self.source
      self.get_data_from_source
    else
      self.data
    end
    # replace the data with google charts image tag
    self.data = self.to_google_chart
    self.save
    self.data
  end

  # converts the data from xml to google chart url
  def to_google_chart
    xml = Nokogiri.XML(self.data)
    numbers = (xml / 'number').map(&:text).map(&:to_f)
    xstart = xml.css('xaxis minlabel').first.text if xml.css('xaxis minlabel').first
    xend   = xml.css('xaxis maxlabel').first.text if xml.css('xaxis maxlabel').first
    puts "xstart #{xstart}, xend #{xend}"
    xsize = 190; ysize = 127
    xsize = 410 if self.size && self.size =~ /2x./
    ysize = 347 if self.size && self.size =~ /.x2/
    google_chart_url = "https://chart.googleapis.com/chart?chs=#{xsize}x#{ysize}&cht=lc&chd=t:#{numbers.join(',')}&chds=#{[numbers.min,0].min},#{numbers.max}&chxt=y,x&chxr=0,#{[numbers.min,0].min},#{numbers.max}&chxl=1:|#{xstart}|#{xend}"
    "<img src=\"#{google_chart_url}\" />"
  end
end
