$(() => {
  var var_mapoptions;
  var var_map;
  let cities = ["Pinneberg", "Muenchen", "Nuernberg", "Berlin", "Alfter", "Freiburg im Breisgau", "Konstanz", "Hamburg", "Neuendettelsau", "Weimar", "Wuppertal", "Cottbus", "Halle", "Oldenburg", "Kiel", "Koeln", "Speyer", "Zwickau", "Gera", "Tuebingen", "Oestrich-Winkel", "Bochum", "Jena", "Greifswald", "Bruehl", "Flensburg", "Frankfurt an der Oder", "Darmstadt", "Dresden", "Ludwigsburg", "Aachen", "Bielefeld", "Paderborn", "Dortmund", "Erfurt", "Hannover", "Nordkirchen", "Bad Muenstereifel", "Potsdam", "Luebeck", "Muenster", "Iserlohn", "Wedel", "Heide", "Hagen", "Duesseldorf", "Essen", "Frankfurt am Main", "Giessen", "Erlangen", "Goettingen", "Heilbronn", "Hildesheim", "Leipzig", "Buxtehude", "Aalen", "Albstadt", "Koethen", "Ansbach", "Aschaffenburg", "Augsburg", "Biberach an der Riss", "Sankt Augustin", "Bremen", "Bremerhaven", "Coburg", "Saarbruecken", "Mannheim", "Hachenburg", "Stuttgart", "Bonn", "Emden", "Esslingen", "Idstein", "Fulda", "Wuerzburg", "Erding", "Braunschweig", "Bayreuth", "Edenkoben", "Rottenburg am Neckar", "Offenbach", "Schwaebisch Gmuend", "Heidelberg", "Regensburg", "Herford", "Ottersberg", "Detmold", "Karlsruhe", "Rostock", "Eberswalde", "Kehl", "Mayen", "Gelsenkirchen", "Schwetzingen", "Ludwigshafen", "Nuertingen", "Geisenheim", "Hamm", "Wernigerode", "Hof", "Kaiserslautern", "Kempten", "Koblenz", "Landshut", "Magdeburg", "Mainz", "Merseburg", "Mittweida", "Neubrandenburg", "Neu-Ulm", "Krefeld", "Nordhausen", "Offenburg", "Osnabrueck", "Pforzheim", "Weingarten", "Reutlingen", "Wiesbaden", "Kleve", "Rosenheim", "Muelheim an der Ruhr", "Schmalkalden", "Stralsund", "Trier", "Ulm", "Freising", "Hameln", "Wismar", "Worms", "Zittau", "Furtwangen", "Bad Honnef", "Wilhelmshaven", "Eichstaett", "Lueneburg", "Oberursel", "Neuruppin", "Elmshorn", "Isny im Allgaeu", "Amberg", "Wolfenbuettel", "Bamberg", "Marburg", "Vallendar", "Vechta", "Riedlingen", "Trossingen", "Brandenburg an der Havel", "Deggendorf", "Ingolstadt", "Lemgo", "Wildau", "Freiberg", "Chemnitz", "Clausthal-Zellerfeld", "Ilmenau", "Bingen", "Moeckern OT Friedensau", "Neubiberg", "Kassel", "Passau", "Siegen", "Witten", "Fuerth", "Friedrichshafen", ""];


  new WOW().init();

  $('#CityName').mdbAutocomplete({
    data: cities,

  }).change(e => {
    var ipt = $(e.target);
    if (cities.includes(ipt.val())) {
      lookupUni(ipt.val());
    }
  });
  $('.mdb-autocomplete-wrap').on("mousedown", "li", (e) => {
    lookupUni($(e.target).text());
  });


});
function lookupUni(cityName, lan, fields) {
  map.entities.clear()
  Microsoft.Maps.loadModule(['Microsoft.Maps.SpatialDataService', 'Microsoft.Maps.Search'], function () {
    var searchManager = new Microsoft.Maps.Search.SearchManager(map);
    var geocodeRequest = {
      where: cityName,
      callback: function (geocodeResult) {
        if (geocodeResult && geocodeResult.results && geocodeResult.results.length > 0) {
          map.setView({ bounds: geocodeResult.results[0].bestView });
          var geoDataRequestOptions = {
            entityType: 'PopulatedPlace',
            getAllPolygons: true
          };
          setTimeout(() => {
            map.setView({ zoom: 9 });
            setTimeout(() => {
              unisearch(cityName);

            }, 200);
          }, 200);
          //Use the GeoData API manager to get the boundary of New York City
          Microsoft.Maps.SpatialDataService.GeoDataAPIManager.getBoundary(geocodeResult.results[0].location, geoDataRequestOptions, map, function (data) {
            if (data.results && data.results.length > 0) {
              map.entities.push(data.results[0].Polygons);
            }
          }, null, function errCallback(networkStatus, statusMessage) {
            console.log(networkStatus);
            console.log(statusMessage);
          });
        }
      },
    };
    searchManager.geocode(geocodeRequest);
  });

}

function unisearch(cityName) {
  //   var sdsDataSourceUrl = 'https://spatial.virtualearth.net/REST/v1/data/f22876ec257b474b82fe2ffcb8393150/NavteqNA/NavteqPOIs';


  //   Microsoft.Maps.loadModule('Microsoft.Maps.SpatialDataService', function () {
  //     //Create a query to get nearby data.
  //     queryOptions = {
  //         queryUrl: sdsDataSourceUrl,
  //         top: 11,
  //         inlineCount: true,
  //         spatialFilter: {
  //             spatialFilterType: 'nearby',
  //             location: map.getCenter(),
  //             radius: 50
  //         },
  //         filter: new Microsoft.Maps.SpatialDataService.Filter('EntityTypeID','eq',5540) 
  //       };
  //     //Trigger an initial search.
  //     getNearByLocations(queryOptions);
  // });
  // var searchManager = new Microsoft.Maps.Search.SearchManager(map);
  // var requestOptions = {
  //   bounds: map.getBounds(),
  //   maxResults: 10,
  //   where: 'Universität',
  //   callback: function (r, userData) {
  //     if (r && r.results && r.results.length > 0) {
  //       var pin, pins = [], locs = [], output = 'Results:<br/>';
  //       for (var i = 0; i < r.results.length; i++) {
  //         //Create a pushpin for each result.
  //         pin = new Microsoft.Maps.Pushpin(r.results[i].location, { text: i + '' });
  //         pins.push(pin);
  //         locs.push(r.results[i].location);
  //       }
  //       //Add the pins to the map
  //       map.entities.push(pins);
  //       //Display list of results
  //       //Determine a bounding box to best view the results.

  //     }
  //   }
  // };
  // searchManager.geocode(requestOptions);
  $.ajax({
    url: 'https://nominatim.openstreetmap.org/search/University%20near%20'+cityName+'?format=json&addressdetails=1&limit=300',

    dataType: 'json', // Notice! JSONP <-- P (lowercase)
    success: function (r) {
      if (r && r.length > 0) {
        var pin, pins = [], locs = []
        for (var i = 0; i < r.length; i++) {
          //Create a pushpin for each result.
          pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(r[i].lat,r[i].lon), { text: i });
          pins.push(pin);
          locs.push(new Microsoft.Maps.Location(r[i].lat,r[i].lon));
        }
        //Add the pins to the map
        map.entities.push(pins);
      }
    },
    error: function () {
      alert("Error");
    }
  });


}
function getNearByLocations(queryOptions) {
  //Remove any existing data from the map.
  map.entities.clear();
  //Update the query options to skip results based on the page index.
  Microsoft.Maps.SpatialDataService.QueryAPIManager.search(queryOptions, map, function (data, inlineCount) {
    //Store the number of results available.
    numResults = inlineCount;
    if (data.length > 0) {
      //Calculate the start and end result index.
      //Add results to the map.
      map.entities.push(data);
      //Set the map view to show all the locations.
      //Add apadding to account for the pushpins pixel size.
      map.setView({
        bounds: Microsoft.Maps.LocationRect.fromLocations(locations),
        padding: 30
      });
    }
  });
}
function listItemClicked(entityId) {
  //When an item in the list is clicked, look up its pushpin by entitiyId.
  var shape, len = map.entities.getLength();
  for (var i = 0; i < len; i++) {
    shape = map.entities.get(i);
    if (shape.entity.EntityID == entityId) {
      //Center the map over the pushpin and zoom in.
      map.setView({ center: shape.getLocation(), zoom: 15 });
      break;
    }
  }
}
function pageBackwards() {
  if (pageIdx > 0) {
    pageIdx--;
    getNearByLocations();
  }
}
function pageForward() {
  //Ensure that paging does not exceed the number of results.
  if ((pageIdx + 1) * 10 < numResults) {
    pageIdx++;
    getNearByLocations();
  }
}


function loadMapScenario() {
  Microsoft.Maps.ConfigurableMap.createFromConfig(document.getElementById('map-container'), 'style/configmap2.json', false, null, successCallback, errorCallback);
  function successCallback(mapObj) {
    window.map = mapObj;
    setTimeout(() => {
      var bounds = Microsoft.Maps.LocationRect.fromLocations(new Microsoft.Maps.Location(47.15630905857346, 15.408189134456976),
        new Microsoft.Maps.Location(55.85630905857346, 5.653838560219752));
      map.setOptions({
        maxZoom: 12,
        minZoom: 5,
        maxBounds: bounds
      });

      map.setView({
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        center: new Microsoft.Maps.Location(51.19254942903923, 10.399044671663109),
        zoom: 6
      });
      var boundsBorder = new Microsoft.Maps.Polyline([
        new Microsoft.Maps.Location(55.85630905857346, 5.653838560219752),
        new Microsoft.Maps.Location(47.15630905857346, 5.653838560219752),
        new Microsoft.Maps.Location(47.15630905857346, 15.408189134456976),
        new Microsoft.Maps.Location(55.85630905857346, 15.408189134456976),
        new Microsoft.Maps.Location(55.85630905857346, 5.653838560219752)
      ], { strokeColor: 'red', strokeThickness: 5 });
    }, 200);
    map.entities.push(boundsBorder);
  }
  function errorCallback(message) {
    document.getElementById('printoutPanel').innerHTML = message;
  }


}
