// Variables globales
var vectorLayerPoste = [];
var vectorLayerBus = [];
var vectorLayerYelo = [];
var map = new ol.Map();

/**
 * Show bus
 *
 * @return null
 */
function showLayerBus() {
    vectorLayerBus.setVisible(true)
}

/**
 * Hide bus
 *
 * @return null
 */
function hideLayerBus() {
    vectorLayerBus.setVisible(false)
}

/**
 * Show poste
 *
 * @return null
 */
function showLayerPoste() {
    vectorLayerPoste.setVisible(true)
}

/**
 * Hide poste
 *
 * @return null
 */
function hideLayerPoste() {
    vectorLayerPoste.setVisible(false)
}

/**
 * Show yelo
 *
 * @return null
 */
function showLayerYelo() {
    vectorLayerYelo.setVisible(true)
}

/**
 * Hide yelo
 *
 * @return null
 */
function hideLayerYelo() {
    vectorLayerYelo.setVisible(false)
}

/**
 * Show map
 *
 * @return null
 */
function showMap() {
    setTimeout(function () {
        map.updateSize();
    }, 200);
}

/**
 * Draw map
 *
 * @return null
 */
function drawMap(data, metadata, myDiv, myPopup) {

    // Définition de la projection de la carte en Lambert 93
    var projection = new ol.proj.Projection({code: "EPSG:2154"});
    var projection4326 = new ol.proj.Projection({code: "EPSG:4326"});

    // Definition de l'emprise de la carte
    var extent = [-1.16, 46.1, -1.17, 46.2];

    // Définition des vecteurs
    var vectorDataLayer = new ol.layer.Vector();
    vectorLayerBus = getBusLayer();
    vectorLayerYelo = getYeloLayer();
    vectorLayerPoste = getPosteLayer();


    var coordonnees = [];

    // Define vectors with kml datas
    if (metadata.map.kml) {

        // Define style
        var styleFunction = function (feature) {
            var array = vectorDataLayer.getSource().getFeatures();
            var array2 = array.map(function (el) {
                return el.get(metadata.map.value)
            });
            array.map(function (el) {
                return el.get(metadata.map.value)
            }).reduce(function (el) {
                return Math.min(el)
            });
            var min = Math.min.apply(null, array2);

            var max = Math.max.apply(null, array2);

            var number = feature.get(metadata.map.value);
            number = ((number - min) / (max - min) * 256) | 0;

            return new ol.style.Style({
                fill: new ol.style.Fill({
                    color: [number, 0, 255 - number, 0.4]
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffffff'
                }),
                text: new ol.style.Text({
                    text: feature.get(metadata.map.name) + "\n" + feature.get(metadata.map.value),
                    fill: new ol.style.Fill({color: "#000000"}),
                    stroke: new ol.style.Stroke({color: "#FFFFFF", width: 3}),
                    font: 12 + 'px Calibri,sans-serif'
                })
            });
        };

        // Define vectors
        vectorDataLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                url: "../../kml/" + metadata.map.kml,
                format: new ol.format.KML({
                    extractStyles: false
                })
            }),
            style: styleFunction
        });

        // Define vectors with coordonnées datas
    } else {
        data.forEach(function (marker) {

            var color = '#ffffff';
            var epsg2154 = "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";

            p2 = new ol.Feature({
                geometry: new ol.geom.Point(proj4(epsg2154, "EPSG:4326", [parseFloat(marker[metadata.map.x]), parseFloat(marker[metadata.map.y])])),
                labelPoint: new ol.geom.Point(proj4(epsg2154, "EPSG:4326", [parseFloat(marker[metadata.map.x]), parseFloat(marker[metadata.map.y])])),
                name: marker[metadata.map.name],
                dispo: marker[metadata.map.nominateur],
                total: marker[metadata.map.denominateur],
                type: "openData"
            });

            p2.setStyle(new ol.style.Style({
                image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    color: color,
                    crossOrigin: 'anonymous',
                    src: '../../../images/icone_parking.svg',
                    scale: 0.05
                }))
            }));
            coordonnees.push(p2);
        });

        vectorDataLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: coordonnees
            })
        });
    }

    map = new ol.Map({
        layers: [new ol.layer.Tile({
            source: new ol.source.OSM()
        }), vectorDataLayer, vectorLayerBus, vectorLayerPoste, vectorLayerYelo],
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
    addPopup(map, metadata, myPopup, metadata.map.description_popup);

    showMap();
}
