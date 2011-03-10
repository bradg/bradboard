class DashboardController < ApplicationController
  def index
    @widgets = Widget.all
    #@widgets = [Widget.first]
  end
end
