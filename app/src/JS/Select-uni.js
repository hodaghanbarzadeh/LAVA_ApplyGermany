$(() => {
  var var_mapoptions;
  var var_map;
  let cities=["Pinneberg","Muenchen","Nuernberg","Berlin","Alfter","Freiburg im Breisgau","Konstanz","Hamburg","Neuendettelsau","Weimar","Wuppertal","Cottbus","Halle","Oldenburg","Kiel","Koeln","Speyer","Zwickau","Gera","Tuebingen","Oestrich-Winkel","Bochum","Jena","Greifswald","Bruehl","Flensburg","Frankfurt an der Oder","Darmstadt","Dresden","Ludwigsburg","Aachen","Bielefeld","Paderborn","Dortmund","Erfurt","Hannover","Nordkirchen","Bad Muenstereifel","Potsdam","Luebeck","Muenster","Iserlohn","Wedel","Heide","Hagen","Duesseldorf","Essen","Frankfurt am Main","Giessen","Erlangen","Goettingen","Heilbronn","Hildesheim","Leipzig","Buxtehude","Aalen","Albstadt","Koethen","Ansbach","Aschaffenburg","Augsburg","Biberach an der Riss","Sankt Augustin","Bremen","Bremerhaven","Coburg","Saarbruecken","Mannheim","Hachenburg","Stuttgart","Bonn","Emden","Esslingen","Idstein","Fulda","Wuerzburg","Erding","Braunschweig","Bayreuth","Edenkoben","Rottenburg am Neckar","Offenbach","Schwaebisch Gmuend","Heidelberg","Regensburg","Herford","Ottersberg","Detmold","Karlsruhe","Rostock","Eberswalde","Kehl","Mayen","Gelsenkirchen","Schwetzingen","Ludwigshafen","Nuertingen","Geisenheim","Hamm","Wernigerode","Hof","Kaiserslautern","Kempten","Koblenz","Landshut","Magdeburg","Mainz","Merseburg","Mittweida","Neubrandenburg","Neu-Ulm","Krefeld","Nordhausen","Offenburg","Osnabrueck","Pforzheim","Weingarten","Reutlingen","Wiesbaden","Kleve","Rosenheim","Muelheim an der Ruhr","Schmalkalden","Stralsund","Trier","Ulm","Freising","Hameln","Wismar","Worms","Zittau","Furtwangen","Bad Honnef","Wilhelmshaven","Eichstaett","Lueneburg","Oberursel","Neuruppin","Elmshorn","Isny im Allgaeu","Amberg","Wolfenbuettel","Bamberg","Marburg","Vallendar","Vechta","Riedlingen","Trossingen","Brandenburg an der Havel","Deggendorf","Ingolstadt","Lemgo","Wildau","Freiberg","Chemnitz","Clausthal-Zellerfeld","Ilmenau","Bingen","Moeckern OT Friedensau","Neubiberg","Kassel","Passau","Siegen","Witten","Fuerth","Friedrichshafen",""];


  new WOW().init();

  $('#CityName').mdbAutocomplete({
    data: cities,
    
    }).change(e=>{
      var ipt=$(e.target);
      if(cities.includes(ipt.val()))
      {
        regular_map(ipt.val());
        var latlng=new google.maps.LatLng(51.427573, 6.800383);
        // new google.maps.Geocoder().geocode({'latLng' : latlng}, function(results, status) {
        //   if (status == google.maps.GeocoderStatus.OK) {
        //       if (results[1]) {
        //           var country = null, countryCode = null, city = null, cityAlt = null;
        //           var c, lc, component;
        //           for (var r = 0, rl = results.length; r < rl; r += 1) {
        //               var result = results[r];
      
        //               if (!city && result.types[0] === 'locality') {
        //                   for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
        //                       component = result.address_components[c];
      
        //                       if (component.types[0] === 'locality') {
        //                           city = component.long_name;
        //                           break;
        //                       }
        //                   }
        //               }
        //               else if (!city && !cityAlt && result.types[0] === 'administrative_area_level_1') {
        //                   for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
        //                       component = result.address_components[c];
      
        //                       if (component.types[0] === 'administrative_area_level_1') {
        //                           cityAlt = component.long_name;
        //                           break;
        //                       }
        //                   }
        //               } else if (!country && result.types[0] === 'country') {
        //                   country = result.address_components[0].long_name;
        //                   countryCode = result.address_components[0].short_name;
        //               }
      
        //               if (city && country) {
        //                   break;
        //               }
        //           }
      
        //           console.log("City: " + city + ", City2: " + cityAlt + ", Country: " + country + ", Country Code: " + countryCode);
        //       }
        //   }
        //});
      }
    });
  // Regular map
  function regular_map(city) {
    // var var_location = new google.maps.LatLng(51.427573, 6.800383);

    // var_mapoptions = {
    //   center: var_location,
    //   zoom: 6
    // };

    // window.var_map=var_map = new google.maps.Map(document.getElementById("map-container"),
    //   var_mapoptions);

    // var var_marker = new google.maps.Marker({
    //   position: var_location,
    //   map: var_map,
    //   title: "DUE uni"
    // });
    $('iframe').attr('src',`https://www.google.com/maps/embed/v1/search?q=University%20near%20${city}&key=AIzaSyB3DXYAQNSzN6rOrz6giPYssoYcqGa6xlg`);
  }

  // Initialize maps
  //google.maps.event.addDomListener(window, 'load', regular_map);


});
function loadMapScenario() {
  Microsoft.Maps.ConfigurableMap.createFromConfig(document.getElementById('map-container'), 'style/configmap2.json', false, null, successCallback, errorCallback);
  function successCallback(mapObj) {
    window.map=mapObj;    
    setTimeout(()=>{
      var bounds = Microsoft.Maps.LocationRect.fromLocations(new Microsoft.Maps.Location(47.15630905857346,15.408189134456976), 
                                                             new Microsoft.Maps.Location(55.85630905857346, 5.653838560219752));
      map.setOptions({
          maxZoom: 12,
          minZoom: 5,
          maxBounds: bounds
      });
                                                          
      map.setView({
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        center: new Microsoft.Maps.Location(51.19254942903923,10.399044671663109),
        zoom: 6
      });
      var boundsBorder = new Microsoft.Maps.Polyline([
        new Microsoft.Maps.Location(55.85630905857346, 5.653838560219752),
        new Microsoft.Maps.Location(47.15630905857346, 5.653838560219752),
          new Microsoft.Maps.Location(47.15630905857346,15.408189134456976),
          new Microsoft.Maps.Location(55.85630905857346,15.408189134456976),
          new Microsoft.Maps.Location(55.85630905857346,5.653838560219752)
      ], { strokeColor: 'red', strokeThickness: 5 });
      map.entities.push(boundsBorder);
    },200);
    }
    function errorCallback(message) {
      document.getElementById('printoutPanel').innerHTML = message;
  }
  
  
}
