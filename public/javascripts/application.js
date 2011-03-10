$(function() {
  // init dialogs
  init_widgets();
  reload_all_widget_data();
  init_text_widgets();
});

function init_widgets() {
  $('#dashboard_ul').sortable();
  // show_data() method swaps out existing content and shows new content
  $.fn.show_data = function(html) { 
    new_content = $('<div class="content" style="display:none">');
    new_content.html(html); 
    this.find('.content').last().after(new_content).fadeOut(1000, function() {$(this).remove();});
    new_content.fadeIn(1000);
  };
}

// Reloads the widget content for each widget
function reload_all_widget_data() {
  $('.widget').each(function(i,w) {
    widget = $(w);
    reload_widget_data(widget);
  });
}

function reload_widget_data(widget) {
  $.get(widget.attr('path'), function(data) {
    widget.data('data', data);
    if(widget.hasClass('plain_text_widget') || widget.hasClass('chart_widget')) {  // PlainTextWidget
      widget.show_data(data);
    } else if(widget.hasClass('fixed_text_widget') || widget.hasClass('xml_text_widget')) { // XmlTextWidget
      xmldoc = $($.parseXML(data));
      first_text = xmldoc.find('text').eq(0);
      widget.show_data(first_text);
      widget.data('current', 0);
    } else if(widget.hasClass('red_orange_green_widget')) {  // RedOrangeGreenWidget
      xmldoc = $($.parseXML(data));
      widget.show_data(generate_rog_html(xmldoc));
    } else {
      alert("Don't know how to handle widget data: " + data);
    }
  });
}

function generate_rog_html(xml_data) {
  red = parseInt(xml_data.find('number').eq(0).text());
  orange = parseInt(xml_data.find('number').eq(1).text());
  green = parseInt(xml_data.find('number').eq(2).text());
  total = red + orange + green;
  //alert("r, o, g, total = " + red + orange + green + total);
  html =
  '<div class="rog_bar" height="150">' +
    '<div class="red" style="height: ' + (red / total * 100) + 'px"></div>' +
    '<div class="orange" style="height: ' + (orange / total * 100) + 'px"></div>' +
    '<div class="green" style="height: ' + (green / total * 100) + 'px"></div>' +
  '</div>' +
  '<div class="rog_text" height="150">' +
    '<div class="red">' + red + ' ' + xml_data.find('text').eq(0).text() + '</div>' +
    '<div class="orange">' + orange + ' ' + xml_data.find('text').eq(1).text() + '</div>' +
    '<div class="green">' + green + ' ' + xml_data.find('text').eq(2).text() + '</div>' +
  '</div>'
  return html;
}

// Text widgets rotate through the text
function init_text_widgets() {
  $(".xml_text_widget, .fixed_text_widget").each(function(i,widget) {
    widget = $(widget);
    interval = setInterval(function() { rotate_text_widget(widget);}, 5000);
    widget.data('interval', interval);
  });
}

function rotate_text_widget(widget) {
  //alert('rotating');
  widget = $(widget);
  current = widget.data('current');
  data = widget.data('data');
  xmldoc = $($.parseXML(data));
  if(xmldoc.find('text').eq(current + 1).length > 0) {
    current += 1;
  } else {
    current = 0;
  }
  next_text = xmldoc.find('text').eq(current);
  widget.data('current', current);
  widget.show_data(next_text);
}
