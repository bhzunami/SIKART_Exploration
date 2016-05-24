var data;
$(function(){ 
  function loadingFinished(){
      console.log('finished loading Ausstellungen/persons');
  }

  function loadData(){
    var artists = new Map();
    var ausstellungen = new Set();
    $.getJSON("data/data.json", function(json) {
      data = json;
      /*
      json.artists.forEach(function(artist){
        
        if(!artists.has(artist.HAUPTNR)) { //Only add non-existing artists, but with ausstellung
          artists.set(artist.HAUPTNR, artist);
        }
      });

      json.exhibitions.forEach(function(aus){
        if(!ausstellungen.has(aus.HAUPTNR) && aus.ARTISTS.length > 10 && aus.ARTISTS.length < 20) { //Only add non-existing ausstellung    ---  && aus.MONAT == '3' && aus.TAG < '10'
          ausstellungen.add(aus.HAUPTNR);
          cy.add({group: "nodes", data: {id:aus.HAUPTNR, name:aus.AUSST_TITEL, NodeType:'Exhibition', ExhibitionSize:aus.ARTISTS.length, Ort: aus.AUSST_ORT}});
          aus.ARTISTS.forEach(function(artistHauptNr){
            if(artists.has(artistHauptNr)) { //Only add edge, if src is really available
              artist = artists.get(artistHauptNr);
              cy.add({group: "nodes", data: {id:artist.HAUPTNR, name:artist.NAME, firstname: artist.VORNAME, NodeType:'Artist', Geschlecht:artist.GESCHLECHT, Lebensdaten:artist.LEBENSDATEN, vita:artist.VITAZEILE, Rating:artist.RATING}});
              cy.add({group: "edges", data: {source:artistHauptNr, target:aus.HAUPTNR, interaction:'cc'}});
            }
          });
        }
      });*/
    }).then(loadingFinished);
  }
  
  loadData();
});