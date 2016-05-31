var data;
$(function(){ 
  function loadingFinished(){
      reloadCantonData();
  }

  function loadData(){
    $.getJSON("data/data.json", function(json) {
      data = json;
    }).then(loadingFinished);
  }
  
  loadData();
});

function getKeys(obj) {
  var ret = Array();
  for (var key in obj)
    ret.push(key);
  return ret;
}

function splitStringArr(inStr, random){
  var arr = inStr.split(",");
  arr = arr.map(function(e){return e.trim();});
  if (random) {
    arr.sort(function () {
      return 0.5 - Math.random()
    });
  }
  return arr;
}