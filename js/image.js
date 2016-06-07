var images = {
    previewStringImages : function (werke, imgTarget, limitImages, random) {
        var werkArr = werke.split(",");
        images.previewImages(werkArr, imgTarget, limitImages, random);
    },
    previewImages : function (werkArr, imgTarget, limitImages, random){
        imgTarget.empty();
        if (random) {
            werkArr.sort(function () {
                return 0.5 - Math.random()
            });
        }
        werkArr.forEach(function(w){
            if(limitImages > 0){
                w = w.trim();
                var werk = data.werke[w];
                limitImages -= images.showImage(werk, imgTarget); //Count down if image existed
            }
        });
        if(limitImages > 0){
            imgTarget.html($("<div>", {class: "noImage"}));
        }
        return limitImages > 0; //true if still images
    },
    showImage : function (werk, imgTarget){
        return images.loadImage(werk, 195, 195, imgTarget);
    },
    loadImage : function (werk, width, height, target) {
        //Check if exists
        var img = new Image();
        var path = 'images/bilder/'+werk.Bildname;
        img.src = path;
        if(img.height != 0){
            var div = $("<div>", { class: "js_imageContainer js_artist", 'data-hauptnr': werk.Urhauptnr }); //
            $('<img src="'+ path +'">').load(function() {
                if(img.width < img.height){
                    $(this).width(width);
                }else{
                    $(this).height(height);
                }
                $(this).appendTo(div); //
                $("<h4>", {id: "", class: "bildlegende werkTitel", text: werk.Titel}).appendTo(div);

                var artist = data.artists[werk.Urhauptnr];
                if(artist){
                    $("<h4>", {id: "", class: "bildlegende artistTitel", text: artist.Vorname + ' ' + artist.Name}).appendTo(div);
                }
                div.appendTo(target);
                refreshPicSlider();
            });
            return 1;
        }else{
            return 0;
        }
    }
};

/*a.disabled {
 pointer-events: none;
 cursor: default;
 }*/