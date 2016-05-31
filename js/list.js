$(function(){

  $(document).on('click','.js_artist',function(){
    artistHauptnr = $(this).data('hauptnr');
    loadArtist(artistHauptnr);
  });

  $(document).on('click','.js_exhibition',function(){
    exhibitionHauptnr = $(this).data('hauptnr');
    loadExhibition(exhibitionHauptnr);
  });

  function loadArtist(artistHauptnr){
    $('#exhibition_detail').hide();
    $('#artist_detail').show();
    var artist = data.artists[artistHauptnr];
    var target = $('#artist_detail');
    loadDetail(artist, target);
  }

  function loadExhibition(exhibitionHauptnr){
    $('#artist_detail').hide();
    $('#exhibition_detail').show();
    var exhibition = data.exhibitions[exhibitionHauptnr];
    var target = $('#exhibition_detail');
    loadDetail(exhibition, target);
  }

  function loadDetail(data, target){
    var targetContainer = target.find('.js_detail_container');
    targetContainer.children().each(function () {
      var id = $(this)[0].id;
      if(id){
        $(this).html(data[id]);
      }
    });
    //previewImages(artist.Werke, $('#images'), 10, false);
    previewImages(data.Werke, target.find('.js_picslider'), 4, true);
  }

  function previewImages(werke, imgTarget, limitImages, random){
    imgTarget.empty();
    var werkArr = werke.split(",");
    if(random){
      werkArr.sort(function() { return 0.5 - Math.random() });
    }
    werkArr.forEach(function(w){
      if(limitImages > 0){
        w = w.trim();
        var werk = data.werke[w];
        limitImages -= showImage(werk, imgTarget); //Count down if image existed
      }
    });
    if(limitImages > 0){
      imgTarget.html($("<div>", {class: "noImage"}));
    }
    return limitImages > 0; //true if still images
  }

  function showImage(werk, imgTarget){
    return loadImage(werk, 400, 400, imgTarget);
  }

  function loadImage(werk, width, height, target) {
    //Check if exists
    var img = new Image();
    path = 'images/bilder/'+werk.Bildname;
    img.src = path;
    if(img.height != 0){
      var div = $("<div>", {class: "js_imageContainer"});
      $('<img src="'+ path +'">').load(function() {
        $(this).width(width).appendTo(div); //.height(height)
        var legende = $("<h4>", {id: "", class: "bildlegende", text: werk.Titel});
        legende.appendTo(div);
        div.appendTo(target);
      });
      return 1;
    }else{
      return 0;
    }
  }
});