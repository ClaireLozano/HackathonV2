//Définition de la projection de la carte en Lambert 93
var projection = new ol.proj.Projection({code: "EPSG:2154"});
var projection4326 = new ol.proj.Projection({code: "EPSG:4326"});
//definition de l'emprise de la carte
var extent = [-1.16, 46.1, -1.17, 46.2];

//ajout d'une photo aérienne
var layer_ortho = new ol.layer.Tile({
    title: 'Ortho 2013',
    source: new ol.source.TileWMS({
        projection: 'EPSG:2154',
        url: 'http://portail-sig.ville-larochelle.fr/opendata/carteWS.php?',
        params: {'LAYERS': 'ortho_2013_lr', 'FORMAT': 'image/png', 'CRS': 'EPSG:2154', 'TILED': true},
        serverType: 'mapserver'
    })
});
// Ajout d'une couche pour les parcelles cadastrales
var cad_parcelle = new ol.layer.Tile({
    title: 'parcelle cadastrale',
    source: new ol.source.TileWMS({
        projection: 'EPSG:2154',
        url: 'http://portail-sig.ville-larochelle.fr/opendata/carteWS.php?',
        params: {'LAYERS': 'cad_parcelle', 'FORMAT': 'image/png', 'CRS': 'EPSG:2154', 'TILED': true},
        serverType: 'mapserver'
    })
});

var result = getUrlPage();
var nomDonnee = result[1];
var endUrl = getUrl(nomDonnee);


getData(endUrl, function (data) {

    var parking_coord = [];

    for (marker in data) {

        var nb_dispo = data[marker].dp_place_disponible;
        var nb_places = data[marker].dp_nb_places;
        var color = '#ffffff';
        /*if (nb_dispo > nb_places / 3) {
            color = '#DD985C'
        }
        if (nb_dispo > (nb_places * 2 / 3)) {
            color = '#C2F732'
        }*/


        var epsg2154 = "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";

        p2 = new ol.Feature({
            geometry: new ol.geom.Point(proj4(epsg2154, "EPSG:4326", [parseFloat(data[marker].dp_x), parseFloat(data[marker].dp_y)])),
            labelPoint:  new ol.geom.Point(proj4(epsg2154, "EPSG:4326", [parseFloat(data[marker].dp_x), parseFloat(data[marker].dp_y)])),
            name: data[marker].dp_libelle,
            dispo: nb_dispo,
            total: nb_places
        });

        p2.setStyle(new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                color: color,
                crossOrigin: 'anonymous',
                src: '../../../images/icone_parking.svg',
                scale: 0.05
            }))
        }));
        parking_coord.push(p2);


    }

    var vectorSource = new ol.source.Vector({
        features: parking_coord
    });

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource
    });


    ////////////////
    /////YELO///////
    ////////////////
    function Get(yourUrl) {
        var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET", yourUrl, false);
        Httpreq.send(null);
        return Httpreq.responseText;
    }

    var json_obj = JSON.parse(Get("https://yelo.agglo-larochelle.fr/yelo-api/-/data/bus-stops.json"));

    var bus = [];

    for (marker in json_obj) {
        p2 = new ol.Feature({
            geometry: new ol.geom.Point([json_obj[marker].Longitude, json_obj[marker].Latitude]),//.transform("EPSG:4326","EPSG:2154"),
            labelPoint: new ol.geom.Point([json_obj[marker].Longitude, json_obj[marker].Latitude]),
            name: json_obj[marker].Name,
            type:"Arrêt de bus"
        });

        p2.setStyle(new ol.style.Style({
            image: new ol.style.Icon( ({
                crossOrigin: 'anonymous',
                src: '../../../images/icone_bus.svg',
                scale: 0.045
            }))
        }));
        bus.push(p2);
    }
    var vectorSourceBus = new ol.source.Vector({
        features: bus
    });

    var vectorLayerBus = new ol.layer.Vector({
        source: vectorSourceBus
    });


    ////////////////
    //////MAP///////
    ////////////////

    var map = new ol.Map({
        layers: [new ol.layer.Tile({
            source: new ol.source.OSM()
        }), vectorLayerBus,vectorLayer],
        target: document.getElementById('map'),
        view: new ol.View({
            center: [-1.1571302, 46.1476461],
            projection: 'EPSG:4326',
            zoom: 16
        })
    });

    var element = document.getElementById('popup');

    var popup = new ol.Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false
    });
    map.addOverlay(popup);



// display popup on click
    map.on('click', function (evt) {
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function (feature, layer) {
                return feature;
            });
        if (feature) {
            if (feature.get('type') && feature.get('type')=="Arrêt de bus") {
                var geometry = feature.getGeometry();
                var coord = geometry.getCoordinates();
                popup.setPosition(coord);
                $(element).attr('data-placement', 'top');
                $(element).attr('data-html', true);
                $(element).attr('data-original-title', feature.get('type'));
                $(element).attr('data-content','<p>'+feature.get('name') + '</p>');
                $(element).popover('show');
            }
            else {
                var geometry = feature.getGeometry();
                var coord = geometry.getCoordinates();
                popup.setPosition(coord);
                $(element).attr('data-placement', 'top');
                $(element).attr('data-html', true);
                $(element).attr('data-content', '<p>Places : </p><code>' + feature.get('dispo') + '/' + feature.get('total') + '</code>');
                $(element).attr('data-original-title', feature.get('name'));
                $(element).popover('show');
            }
        }
        else {
            $(element).popover('destroy');
        }
    });



    // Geoloc
    addGeoloc(map);

    // change mouse cursor when over marker
    map.on('pointermove', function (e) {
        if (e.dragging) {
            $(element).popover('destroy');
            return;
        }
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTarget().style.cursor = hit ? 'pointer' : '';
    });


    document.getElementById('tab-nav-3').onclick = function () {
        setTimeout(function () {
            map.updateSize();
        }, 200);
    };
});
