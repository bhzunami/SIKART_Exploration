/*$(document).ready(function(){
  $(".icon_artist").click(function(){
    console.log("icon artist clicked");

      });
});
*/



var currentIndex = 0,
  items = $('.js_detailslider .js_imageContainer'),
  all_items = items.length;
function refreshPicSlider(){
  items = $('.js_detailslider .js_imageContainer');
  all_items = items.length;
  cycleItems();
  console.log("items total: " + items.length);
  console.log("current index:" +currentIndex);
}

function cycleItems() {
  var item = $('.js_detailslider .js_imageContainer').eq(currentIndex);
  items.hide();
  item.css('display','inline-block');
  console.log("items total: " + items.length);
  console.log("current index:" +currentIndex);
}

var autoSlide = setInterval(function() {
  currentIndex += 1;
  if (currentIndex > all_items - 1) {
    currentIndex = 0;
  }
  cycleItems();
}, 3000);

$('.next').click(function() {
  event.preventDefault();
  clearInterval(autoSlide);
  currentIndex += 1;
  if (currentIndex > all_items - 1) {
    currentIndex = 0;
  }
  cycleItems();
});

$('.prev').click(function() {
  event.preventDefault();
  clearInterval(autoSlide);
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = all_items   - 1;
  }
  cycleItems();
});


