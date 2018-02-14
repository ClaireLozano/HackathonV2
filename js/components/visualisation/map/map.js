
// Variables globales
vectorLayerPoste = [];
vectorLayerBus = [];

/**
 * Show bus
 *
 * @return null
 */
function showLayerBus() {
    vectorLayerBus.setVisible(true)
};

/**
 * Hide bus
 *
 * @return null
 */
function hideLayerBus() {
    vectorLayerBus.setVisible(false)
};

/**
 * Show poste
 *
 * @return null
 */
function showLayerPoste() {
    vectorLayerPoste.setVisible(true)
};

/**
 * Hide poste
 *
 * @return null
 */
function hideLayerPoste() {
    vectorLayerPoste.setVisible(false)
};

/**
 * Show map
 *
 * @return null
 */
function showMap(map) {
    setTimeout(function () {
        map.updateSize();
    }, 200);
};

/**
 * Draw map
 *
 * @return null
 */
function drawMap(data, metadata, myDiv) {

    // Définition de la projection de la carte en Lambert 93
    var projection = new ol.proj.Projection({code: "EPSG:2154"});
    var projection4326 = new ol.proj.Projection({code: "EPSG:4326"});
    
    // Definition de l'emprise de la carte
    var extent = [-1.16, 46.1, -1.17, 46.2];

    // Définition des vecteurs
    var vectorDataLayer = new ol.layer.Vector();
    vectorLayerBus = getBusLayer();
    vectorLayerPoste = getPosteLayer();

    var map = new ol.Map();
    var parking_coord = [];

    data.forEach(function(marker) {

        var color = '#ffffff';
        var epsg2154 = "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";

        p2 = new ol.Feature({
            geometry: new ol.geom.Point(proj4(epsg2154, "EPSG:4326", [parseFloat(marker[metadata.map.x]), parseFloat(marker[metadata.map.y])])),
            labelPoint: new ol.geom.Point(proj4(epsg2154, "EPSG:4326", [parseFloat(marker[metadata.map.x]), parseFloat(marker[metadata.map.y])])),
            name: marker[metadata.map.name],
            dispo: marker[metadata.map.nominateur],
            total: marker[metadata.map.denominateur],
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
    });

    vectorDataLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: parking_coord
        })
    });

    map = new ol.Map({
        layers: [new ol.layer.Tile({
            source: new ol.source.OSM()
        }), vectorLayerBus, vectorLayerPoste, vectorDataLayer],
        target: document.getElementById(myDiv),
        view: new ol.View({
            center: [-1.1571302, 46.1476461],
            projection: 'EPSG:4326',
            zoom: 16
        })
    });

    // Geoloc
    addGeoloc(map);

    // Popup
    addPopup(map, metadata.map.description_popup);


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

    showMap(map);
};
