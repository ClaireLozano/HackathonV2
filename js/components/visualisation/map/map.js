//Définition de la projection de la carte en Lambert 93
var projection = new ol.proj.Projection({code: "EPSG:2154", units: 'm'});
//definition de l'emprise de la carte
var extent = [375000, 6566000, 382500, 6574000];
//ajout d'une photo aérienne
var layer_ortho = new ol.layer.Tile({
    title: 'Ortho 2013',
    source: new ol.source.TileWMS({
        url: 'http://portail-sig.ville-larochelle.fr/opendata/carteWS.php?',
        params: {'LAYERS': 'ortho_2013_lr', 'FORMAT': 'image/png', 'CRS': 'EPSG:2154', 'TILED': true},
        serverType: 'mapserver'
    })
});
// Ajout d'une couche pour les parcelles cadastrales
var cad_parcelle = new ol.layer.Tile({
    title: 'parcelle cadastrale',
    source: new ol.source.TileWMS({
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

        p2 = new ol.Feature({
            geometry: new ol.geom.Point([data[marker].dp_x, data[marker].dp_y]),
            labelPoint: new ol.geom.Point([data[marker].dp_x, data[marker].dp_y]),
            name: data[marker].dp_libelle,
            dispo: nb_dispo,
            total: nb_places
        });


        p2.setStyle(new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                color: color,
                crossOrigin: 'anonymous',
                src: '../../../images/icone_parking.svg',
                scale:0.05
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


    var map = new ol.Map({
        layers: [layer_ortho, cad_parcelle, vectorLayer],
        target: document.getElementById('map'),
        view: new ol.View({
            projection: projection,
            center: [379500, 6570000],
            zoom: 16,
            extent: extent
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
        if (feature && feature.get('name')) {
            var geometry = feature.getGeometry();
            var coord = geometry.getCoordinates();
            popup.setPosition(coord);
            $(element).attr('data-placement', 'top');
            $(element).attr('data-html', true);
            $(element).attr('data-content', '<p>Places : </p><code>' + feature.get('dispo') + '/' + feature.get('total') + '</code>');
            $(element).attr('data-original-title', feature.get('name'));
            $(element).popover('show');
        } else {
            $(element).popover('destroy');
        }
    });

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

    document.getElementById('tab-nav-3').onclick = function() {
        setTimeout( function() { map.updateSize();}, 200);
    }








    var geolocation = new ol.Geolocation({
        projection: projection
    });

    geolocation.setTracking(true);

    var accuracyFeature = new ol.Feature();
    geolocation.on('change:accuracyGeometry', function() {
        accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    });

    var positionFeature = new ol.Feature();
    positionFeature.setStyle(new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
            crossOrigin: 'anonymous',
            color:"#000000",
            src: '../../../images/icone_drapeau.svg',
            scale:0.15
        }))
    }));

    geolocation.on('change:position', function() {
        var coordinates = geolocation.getPosition();
        positionFeature.setGeometry(coordinates ?
            new ol.geom.Point(coordinates) : null);
    });

    new ol.layer.Vector({
        map: map,
        source: new ol.source.Vector({
            features: [accuracyFeature, positionFeature]
        })
    });
});
