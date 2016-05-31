$(function(){

  $(document).on('click','.js_artist',function(){
    artistHauptnr = $(this).data('hauptnr');
    loadArtist(artistHauptnr);
  });

  function loadArtist(artistHauptnr){
    var artist = data.artists[artistHauptnr];
    var target = $('#artist_detail');
    var targetContainer = target.find('#detail_container');
    targetContainer.children().each(function () {
      var id = $(this)[0].id;
      if(id){
        $(this).html(artist[id]);
      }
    });
    previewImages(artist.Werke, 10);
  }

  function previewImages(werke, limitImages){
    var imgTarget = $('#images');
    imgTarget.empty();
    var werkArr = werke.split(",");
    werkArr.forEach(function(w){
      if(limitImages > 0){
        w = w.trim();
        var werk = data.werke[w];
        limitImages -= showImage(werk.Bildname, imgTarget); //Count down if image existed
      }
    });
    return limitImages > 0; //true if still images
  }

  function showImage(bildName, imgTarget){
    return loadImage('images/bilder/'+bildName, 200, 200, imgTarget);
  }

  function loadImage(path, width, height, target) {
    //Check if exists
    var img = new Image();
    img.src = path;
    if(img.height != 0){
      $('<img src="'+ path +'">').load(function() {
        $(this).width(width).height(height).appendTo(target);
      });
      return 1;
    }else{
      return 0;
    }
  }
});