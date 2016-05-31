/**
 * Created by Lukas on 31.05.2016.
 */

var slider;
$(function(){
    var initVal = 1950;
    slider = d3.select('#js_slider').call(d3.slider()
        .on("slideend", function(evt, value) {
            slider.val = value;
            reloadCantonData();
        }) //d3.select('#sliderval').text(value);
        .axis(true).min(1400)
        .max(2015)
        .value(initVal)
        .step(5));
    slider.val = initVal;
    slider.interval = 25; //25 Jahre
});