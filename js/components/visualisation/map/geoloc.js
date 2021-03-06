/**
 * Add the geolocalization marker
 *
 * @return null
 */
function addGeoloc(map) {


    var geolocation = new ol.Geolocation({});

    geolocation.setTracking(true);

    var accuracyFeature = new ol.Feature();
    geolocation.on('change:accuracyGeometry', function () {
        accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    });

    // Definition des attributs du marqueur (position, image, ancrage, taille)
    var positionFeature = new ol.Feature();
    positionFeature.setStyle(new ol.style.Style({
        image: new ol.style.Icon(({
            crossOrigin: 'anonymous',
            color: "#000000",
            src: '../../../images/icone_drapeau.svg',
            scale: 0.10
        }))
    }));


    // Changement de position => changer le marqueur
    geolocation.on('change:position', function () {
        var coordinates = geolocation.getPosition();
        positionFeature.setGeometry(coordinates ?
            new ol.geom.Point(coordinates) : null);
    });

    // Creation de la couche contenant la geolocalisation
    new ol.layer.Vector({
        name: 'GeolocLayer',
        map: map,
        source: new ol.source.Vector({
            features: [accuracyFeature, positionFeature]
        })
    });
}
