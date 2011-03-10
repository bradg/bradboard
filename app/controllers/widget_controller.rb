class WidgetController < ApplicationController
  # returns the details of a widget
  def show
    @widget = Widget.find(params[:id])
    render :text => @widget.cached_data
  end

end
