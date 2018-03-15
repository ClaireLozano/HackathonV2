/**
 * Get bus markers
 *
 * @return vectorLayerBus
 */
function getBusLayer() {
    // Recuperation du JSon des bus
    var json_obj = JSON.parse(Get("https://yelo.agglo-larochelle.fr/yelo-api/-/data/bus-stops.json"));

    var bus = [];

    for (marker in json_obj) {
        // Recuperation d'un arret de bus particulier
        p2 = new ol.Feature({
            geometry: new ol.geom.Point([json_obj[marker].Longitude, json_obj[marker].Latitude]),
            labelPoint: new ol.geom.Point([json_obj[marker].Longitude, json_obj[marker].Latitude]),
            name: json_obj[marker].Name,
            type: "Arrêt de bus" // pour la popup
        });

        // Definition du marqueur
        p2.setStyle(new ol.style.Style({
            image: new ol.style.Icon(({
                crossOrigin: 'anonymous',
                src: '../../../images/icone_bus.png',
                scale: 0.045
            })),
            display: 'none'
        }));
        bus.push(p2);
    }

    // Creation de la couche contenant les arrets de bus
    var vectorLayerBus = new ol.layer.Vector({
        name: 'BusLayer',
        source: new ol.source.Vector({
            features: bus
        })
    });

    vectorLayerBus.setVisible(false);
    
    return vectorLayerBus
}
