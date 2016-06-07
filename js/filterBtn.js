/**
 * Created by Lukas on 07.06.2016.
 */
$(function(){
   $('.filter_btn').on('click',function(){
       event.preventDefault();
       $(this).toggleClass('btn_selected');
       $(this).toggleClass('btn_unselected');
       reloadCantonData();
   });
});