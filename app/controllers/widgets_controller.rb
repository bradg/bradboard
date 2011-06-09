class WidgetsController < ApplicationController
  # returns the details of a widget
  def show
    @widget = Widget.find(params[:id])
    render :text => @widget.cached_data
  end

  # show the form for new widgets
  def new
    @widget = Widget.new
  end
  
  # create a widget
  def create
    if Widget.types.include? params[:widget][:type]
      @widget = Widget.create!(params[:widget])
      @widget.type = params[:widget][:type]
    end
    redirect_to '/'
  end
end
