/**
 * Created by Lukas on 31.05.2016.
 */

var slider;
$(function(){
    slider = d3.select('#js_slider').call(d3.slider()
        .on("slide", function(evt, value) {slider.val = value;}) //d3.select('#sliderval').text(value);
        .axis(true).min(1400)
        .max(2015)
        .step(5));
});