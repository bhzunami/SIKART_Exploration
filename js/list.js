function scrollToBottom(){
  $('html, body').animate({scrollTop: $("body").height()}, 800);
}

$(function(){

  $(document).on('click','.js_artist',function(){
    var artistHauptnr = $(this).data('hauptnr');
    loadArtist(artistHauptnr);
    scrollToBottom();
  });

  $(document).on('click','.js_exhibition',function(){
    var exhibitionHauptnr = $(this).data('hauptnr');
    loadExhibition(exhibitionHauptnr);
    scrollToBottom();
  });

  function loadArtist(artistHauptnr){
    $('#exhibition_detail').hide();
    $('#exhibition_detail .js_detailslider').empty();
    $('#artist_detail').show();
    var artist = data.artists[artistHauptnr];
    var target = $('#artist_detail');
    loadDetail(artist, target);
  }

  function loadExhibition(exhibitionHauptnr){
    $('#artist_detail').hide();
    $('#artist_detail .js_detailslider').empty();
    $('#exhibition_detail').show();
    var exhibition = data.exhibitions[exhibitionHauptnr];
    var target = $('#exhibition_detail');
    exhibition.Kuenstler = "";
    exhibition.Artists.forEach(function (a) {
      var artist = data.artists[a];
      if(artist) {
        if(exhibition.Kuenstler != ''){
          exhibition.Kuenstler += ', ';
        }else{
          exhibition.Kuenstler += 'Mit Künstlern von: ';
        }
        exhibition.Kuenstler += artist.Vorname + ' ' + artist.Name;
      }
    });

    loadDetail(exhibition, target);
  }

  function loadDetail(inData, target){
    var targetContainer = target.find('.js_detail_container');
    targetContainer.children().each(function () {
      var id = $(this)[0].id;
      if(id){
        $(this).html(inData[id]);
      }
    });
    //previewImages(artist.Werke, $('#images'), 10, false);
    images.previewStringImages(inData.Werke, target.find('.js_picslider'), 4, true);
  }
});