$(() => {

  let cities=["Pinneberg","Muenchen","Nuernberg","Berlin","Alfter","Freiburg im Breisgau","Konstanz","Hamburg","Neuendettelsau","Weimar","Wuppertal","Cottbus","Halle","Oldenburg","Kiel","Koeln","Speyer","Zwickau","Gera","Tuebingen","Oestrich-Winkel","Bochum","Jena","Greifswald","Bruehl","Flensburg","Frankfurt an der Oder","Darmstadt","Dresden","Ludwigsburg","Aachen","Bielefeld","Paderborn","Dortmund","Erfurt","Hannover","Nordkirchen","Bad Muenstereifel","Potsdam","Luebeck","Muenster","Iserlohn","Wedel","Heide","Hagen","Duesseldorf","Essen","Frankfurt am Main","Giessen","Erlangen","Goettingen","Heilbronn","Hildesheim","Leipzig","Buxtehude","Aalen","Albstadt","Koethen","Ansbach","Aschaffenburg","Augsburg","Biberach an der Riss","Sankt Augustin","Bremen","Bremerhaven","Coburg","Saarbruecken","Mannheim","Hachenburg","Stuttgart","Bonn","Emden","Esslingen","Idstein","Fulda","Wuerzburg","Erding","Braunschweig","Bayreuth","Edenkoben","Rottenburg am Neckar","Offenbach","Schwaebisch Gmuend","Heidelberg","Regensburg","Herford","Ottersberg","Detmold","Karlsruhe","Rostock","Eberswalde","Kehl","Mayen","Gelsenkirchen","Schwetzingen","Ludwigshafen","Nuertingen","Geisenheim","Hamm","Wernigerode","Hof","Kaiserslautern","Kempten","Koblenz","Landshut","Magdeburg","Mainz","Merseburg","Mittweida","Neubrandenburg","Neu-Ulm","Krefeld","Nordhausen","Offenburg","Osnabrueck","Pforzheim","Weingarten","Reutlingen","Wiesbaden","Kleve","Rosenheim","Muelheim an der Ruhr","Schmalkalden","Stralsund","Trier","Ulm","Freising","Hameln","Wismar","Worms","Zittau","Furtwangen","Bad Honnef","Wilhelmshaven","Eichstaett","Lueneburg","Oberursel","Neuruppin","Elmshorn","Isny im Allgaeu","Amberg","Wolfenbuettel","Bamberg","Marburg","Vallendar","Vechta","Riedlingen","Trossingen","Brandenburg an der Havel","Deggendorf","Ingolstadt","Lemgo","Wildau","Freiberg","Chemnitz","Clausthal-Zellerfeld","Ilmenau","Bingen","Moeckern OT Friedensau","Neubiberg","Kassel","Passau","Siegen","Witten","Fuerth","Friedrichshafen",""];


  new WOW().init();

  $('#CityName').mdbAutocomplete({
    data: cities,
    
    });
  // Regular map
  function regular_map() {
    var var_location = new google.maps.LatLng(40.725118, -73.997699);

    var var_mapoptions = {
      center: var_location,
      zoom: 14
    };

    var var_map = new google.maps.Map(document.getElementById("map-container"),
      var_mapoptions);

    var var_marker = new google.maps.Marker({
      position: var_location,
      map: var_map,
      title: "New York"
    });
  }


  // Initialize maps
  google.maps.event.addDomListener(window, 'load', regular_map);


})