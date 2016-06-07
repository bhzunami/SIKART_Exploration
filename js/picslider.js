/*$(document).ready(function(){
  $(".icon_artist").click(function(){
    console.log("icon artist clicked");

      });
});
*/



var currentIndex = 0,
  items = $('#picslider_artists .js_picslider div'),
  all_items = items.length;
  console.log("items total: " + items.length);
  console.log("current index:" +currentIndex);

function cycleItems() {
  var item = $('#picslider_artists div').eq(currentIndex);
  items.hide();
  item.css('display','inline-block');
}

var autoSlide = setInterval(function() {
  currentIndex += 1;
  if (currentIndex > all_items - 1) {
    currentIndex = 0;
  }
  cycleItems();
}, 3000);

$('.next').click(function() {
  clearInterval(autoSlide);
  currentIndex += 1;
  if (currentIndex > all_items - 1) {
    currentIndex = 0;
  }
  cycleItems();
});

$('.prev').click(function() {
  clearInterval(autoSlide);
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = all_items   - 1;
  }
  cycleItems();
});


