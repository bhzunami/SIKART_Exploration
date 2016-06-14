
var width = 0.9 * window.innerWidth;
var height = 1 * window.innerHeight;

var projection = d3.geo.albers().rotate([0, 0])
    .center([8.73, 46.9]) // Long Lat
    .scale(13600); // Zoom
//.translate([width / 2, height / 2]);

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
$(function() {
    d3.json("/data/switzerland.json", function (error, topology) {
        if (error) throw error;

        // Add the svg to our website
        svg.selectAll("path")
            .data(topojson.feature(topology, topology.objects.cantons).features)
            .enter().append("path")
            .attr("class", "canton")
            .on("mouseover", function (d) {

                //svg.selectAll("path").style("fill", "none");
                tooltip.text(d.properties.name + " (" + getSizeOfArtist(d.properties.abbr) + " Künstler / "
                    + getSizeOfExhibitions(d.properties.abbr) + " Ausstellungen)");
                tooltip.style("visibility", "visible");
                svg.selectAll("path").filter(function (p) {
                    return d.properties.abbr == p.properties.abbr;
                }).attr("class", getColorForMap(d.properties.abbr, false));     //.style("fill", "blue");
            })
            .on("mousedown", function (d) {
                curCanton = d.properties.abbr;
                reloadCantonData();

                svg.selectAll("path").attr("class", "canton");
                repaintCantons();
                svg.selectAll("path").filter(function (p) {
                    return d.properties.abbr == p.properties.abbr;
                }).attr("class", getColorForMap(d.properties.abbr, true));
            })
            .attr("d", path);

        repaintCantons();
    });
});

function repaintCantons(){
    // Add default color
    svg.selectAll("path").each(function (d, i) {
        svg.selectAll("path").filter(function (p) {
                return d.properties.abbr == p.properties.abbr;
            })
            .attr("class", function (p, i) {
                return getColorForMap(d.properties.abbr, false);
            });
    });
}

function within(objStart, objEnd){
  searchStart = slider.val;
  searchEnd = slider.val + slider.interval;
  return (objStart >= searchStart || objEnd >= searchStart)
      &&
      (objEnd <= searchEnd || objStart <= searchEnd);
}

var limit = 60; //Limit per canton

function reloadCantonData(){
  var canton = curCanton;
  if(curCanton != ''){
    showArtists(data.cantons[canton]['artists']);
    showExhibitions(data.cantons[canton]['exhibitions']);
  }else{
    var allArtists = getKeys(data.artists);
    showArtists(allArtists);
    var allExhibitions = getKeys(data.exhibitions);
    showExhibitions(allExhibitions);
  }
}


function getSizeOfArtist(canton) {
  var artists = data.cantons[canton]['artists'];
  var filteredArtists = artists
      .filter(function(artistHauptNr){
        var a = data.artists[artistHauptNr];
        return within(a.Aktivbeginn, a.Aktivende);
      });
  return filteredArtists.length;

}


function getSizeOfExhibitions(canton) {
  var exhibitions = data.cantons[canton]['exhibitions'];
  var filteredExhibitions = exhibitions
      .filter(function(exhibitionHauptNr){
        var ex = data.exhibitions[exhibitionHauptNr];
        return within(ex.JahrVon, ex.JahrBis);
      });
  return filteredExhibitions.length;

}

function getColorForMap(canton, hover) {
  var numberOfArtists = getSizeOfArtist(canton);
  var numberOfExhibitions = getSizeOfExhibitions(canton);
  if (numberOfArtists > 100 || numberOfExhibitions > 100) {
    return hover ? "active_canton_veryhigh" : "canton_veryhigh";
  } else if(numberOfArtists > 50 || numberOfExhibitions > 50 ) {
    return hover ? "active_canton_high" : "canton_high";
  } else if(numberOfArtists > 20 || numberOfExhibitions > 20 ) {
    return hover ? "active_canton_mid" : "canton_mid";
  } else if(numberOfArtists > 10 || numberOfExhibitions > 10 ) {
    return hover ? "active_canton_low" : "canton_low";
  } else {
    return hover ? "active_canton_verylow" : "canton_verylow";
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
          var elem = $('<span/>', { 'class': 'button icon_artist js_artist','title':artist.Vorname + ' ' + artist.Name,'data-hauptnr': tooltip,'data-hauptnr': artistHauptNr});
          var icon = $('<i/>', {'class':'glyphicon glyphicon-user'}).appendTo(elem);
          artistsElem.append(elem);
          randomWerke.push(splitStringArr(artist.Werke, true)[0]); //Get first random
          displayedArtists.add(artistHauptNr);
        }
      });
  if(artists.length > limit){
      artistsElem.append('<div class="numberExceeded">von insgesamt '+filteredArtists.length+' Künstlern </div><div class="numberExceeded right"><a href=""><i class="fa fa-angle-double-right"></i>&nbsp;alle anzeigen</a></div>');
  }

  var imgTarget = $('#imagepreview .js_picslider');
  images.previewImages(randomWerke, imgTarget, 6, true);

}

function showExhibitions(exhibitions){
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
          var elem = $('<span/>', { 'class': 'button icon_artist js_exhibition','title':exhibition.Titel,'data-hauptnr': tooltip,'data-hauptnr': exhibitionHauptNr});
          var icon = $('<i/>', {'class':'glyphicon glyphicon-home'}).appendTo(elem);
          exhibitionsElem.append(elem);
          displayedExhibitions.add(exhibitionHauptNr);
        }
      });
  if(exhibitions.length > limit){
      exhibitionsElem.append('<div class="numberExceeded">von insgesamt '+exhibitions.length+' Ausstellungen</div><div class="numberExceeded right"><a href=""><i class="fa fa-angle-double-right"></i>&nbsp;alle anzeigen</a></div>');
  }

}