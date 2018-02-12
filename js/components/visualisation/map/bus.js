function addBusLayer(map) {
    var json_obj = JSON.parse(Get("https://yelo.agglo-larochelle.fr/yelo-api/-/data/bus-stops.json"));


    var bus = [];

    for (marker in json_obj) {
        p2 = new ol.Feature({
            geometry: new ol.geom.Point([json_obj[marker].Longitude, json_obj[marker].Latitude]),//.transform("EPSG:4326","EPSG:2154"),
            labelPoint: new ol.geom.Point([json_obj[marker].Longitude, json_obj[marker].Latitude]),
            name: json_obj[marker].Name,
            type: "Arrêt de bus"
        });

        p2.setStyle(new ol.style.Style({
            image: new ol.style.Icon(({
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

    return vectorLayerBus
}