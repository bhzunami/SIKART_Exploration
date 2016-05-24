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
                        alert("Selected " + JSON.stringify(d.properties.abbr));
                    })
      .attr("d", path);
});
