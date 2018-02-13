//Définition de la projection de la carte en Lambert 93
var projection = new ol.proj.Projection({code: "EPSG:2154"});
var projection4326 = new ol.proj.Projection({code: "EPSG:4326"});
//definition de l'emprise de la carte
var extent = [-1.16, 46.1, -1.17, 46.2];

var result = getUrlPage();
var nomDonnee = result[1];
var endUrl = getUrl(nomDonnee);
var vectorDataLayer = new ol.layer.Vector();
var vectorLayerBus = getBusLayer();
var vectorLayerPoste = getPosteLayer();

function showLayerBus() {
    vectorLayerBus.setVisible(true)
}

function hideLayerBus() {
    vectorLayerBus.setVisible(false)
}

function showLayerPoste() {
    vectorLayerPoste.setVisible(true)
}

function hideLayerPoste() {
    vectorLayerPoste.setVisible(false)
}

function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

var map = new ol.Map();

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
            labelPoint: new ol.geom.Point(proj4(epsg2154, "EPSG:4326", [parseFloat(data[marker].dp_x), parseFloat(data[marker].dp_y)])),
            name: data[marker].dp_libelle,
            dispo: nb_dispo,
            total: nb_places,
            type:"openData"
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

    vectorDataLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: parking_coord
        })
    });

    map = new ol.Map({
        layers: [new ol.layer.Tile({
            source: new ol.source.OSM()
        }), vectorLayerBus, vectorLayerPoste, vectorDataLayer],
        target: document.getElementById('map'),
        view: new ol.View({
            center: [-1.1571302, 46.1476461],
            projection: 'EPSG:4326',
            zoom: 16
        })
    });

    // Geoloc
    addGeoloc(map);

// Popup
    addPopup(map);
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


document.getElementById('tab-nav-3').onclick = function () {
    setTimeout(function () {
        map.updateSize();
    }, 200);
};