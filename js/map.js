var width = 960;
var height = 500;

var projection = d3.geo.albers().rotate([0, 0])
                                .center([8.73, 46.8]) // Long Lat
                                .scale(13600); // Zoom

// Use projection to show the swiss map
var path = d3.geo.path().projection(projection);

var svg = d3.select(".swiss_map").append("svg")
    .attr("width", width)
    .attr("height", height);

var tooltip = d3.select(".map")
                .append("div")
                .attr("id", "tooltip");

var curCanton = ''; //TODO: Fix default canton
// Load data
d3.json("/data/switzerland.json", function(error, topology) {
  if (error) throw error;

  // Add the svg to our website
  svg.selectAll("path")
      .data(topojson.feature(topology, topology.objects.cantons).features)
      .enter().append("path")
      .attr("class", "canton")
      .on("mouseover", function (d) {
                        tooltip.text(d.properties.name);
                        tooltip.style("visibility", "visible");
                        console.log(d.properties.name);
                    })
      .on("mousedown", function (d) {
                        curCanton = d.properties.abbr;
                        reloadCantonData();
                    })
      .attr("d", path);
});

function within(objStart, objEnd){
    searchStart = slider.val;
    searchEnd = slider.val + slider.interval;
    return (objStart >= searchStart || objEnd >= searchStart)
    &&
    (objEnd <= searchEnd || objStart <= searchEnd);
}

var limit = 10;

function reloadCantonData(){
    var canton = curCanton;
    if(curCanton != ''){
        showArtists(data.cantons[canton]['artists']);
        showExhibitions(data.cantons[canton]['exhibitions']);
    }else{
        var allArtists = getKeys(data.artists);
        showArtists(allArtists);
    }
}

function showArtists(artists){
    var artistsElem = $('#artists');
    artistsElem.empty();

    var randomWerke = new Array();
    var filteredArtists = artists
        .filter(function(artistHauptNr){
            var a = data.artists[artistHauptNr];
            return within(a.Aktivbeginn, a.Aktivende);
        });
    var displayedArtists = new Set();
    filteredArtists
        .forEach(function(artistHauptNr){
            if(!displayedArtists.has(artistHauptNr)){
                var artist = data.artists[artistHauptNr];
                randomWerke.push(splitStringArr(artist.Werke, true)[0]); //Get first random
                displayedArtists.add(artistHauptNr);
            }
        });

    displayedArtists = new Set();
    filteredArtists
        .slice(0,limit)
        .forEach(function(artistHauptNr){
            if(!displayedArtists.has(artistHauptNr)){
                var artist = data.artists[artistHauptNr];
                var elem = $('<div/>', { 'class': 'js_artist','data-hauptnr': artistHauptNr });
                /*
                 <a href="#" class="button icon_artist" data-toggle="tooltip" title="Artist Name">
                 <i class = "glyphicon glyphicon-user" ></i>
                 </a>
                 */
                elem.html(artist.Vorname + ' ' + artist.Name);
                artistsElem.append(elem);
                randomWerke.push(splitStringArr(artist.Werke, true)[0]); //Get first random
                displayedArtists.add(artistHauptNr);
            }
        });
    if(artists.length > limit){
        artistsElem.append('<div>...</div>');
    }

    var imgTarget = $('#imagepreview .js_picslider');
    images.previewImages(randomWerke, imgTarget, 6, true);
}

function showExhibitions(exhibitions){{
    var exhibitionsElem = $('#exhibitions');
    exhibitionsElem.empty();
    var displayedExhibitions = new Set();
    exhibitions
        /*.filter(function(exhibitionHauptNr){
         var ex = data.exhibitions[exhibitionHauptNr];
         return within(ex.JahrVon, ex.JahrBis);
         })*/
        .slice(0,limit)
        .forEach(function(exhibitionHauptNr){
            if(!displayedExhibitions.has(exhibitionHauptNr)) {
                var exhibition = data.exhibitions[exhibitionHauptNr];
                var elem = $('<div/>', {'class': 'js_exhibition', 'data-hauptnr': exhibitionHauptNr});
                elem.html(exhibition.Titel + ' - ');
                exhibitionsElem.append(elem);
                displayedExhibitions.add(exhibitionHauptNr);
            }
        });
    if(exhibitions.length > limit){
        exhibitionsElem.append('<div>...</div>');
    }
}

}