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
                        var canton = d.properties.abbr;
                        var artistsElem = $('#artists');
                        var limit = 10;
                        artistsElem.empty();
                        data.cantons[canton]['artists'].slice(0,limit).forEach(function(artistHauptNr){
                            var artist = data.artists[artistHauptNr];
                            var elem = $('<div/>', { 'class': 'js_artist','data-hauptnr': artistHauptNr });
                            elem.html(artist.Vorname + ' ' + artist.Name);
                            artistsElem.append(elem); //TODO: Use template
                        });
                        if(data.cantons[canton]['artists'].length > limit){
                            artistsElem.append('<div>...</div>');
                        }
                        
                        var exhibitionsElem = $('#exhibitions');
                        exhibitionsElem.empty();
                        data.cantons[canton]['exhibitions'].slice(0,limit).forEach(function(exhibitionHauptNr){
                            var exhibition = data.exhibitions[exhibitionHauptNr];
                            var elem = $('<div/>', { 'class': 'js_exhibition','data-hauptnr': exhibitionHauptNr });
                            elem.html(exhibition.Titel + ' - ');
                            exhibitionsElem.append(elem); //TODO: Use template
                        });
                        if(data.cantons[canton]['exhibitions'].length > limit){
                            exhibitionsElem.append('<div>...</div>');
                        }
                    })
      .attr("d", path);
});
