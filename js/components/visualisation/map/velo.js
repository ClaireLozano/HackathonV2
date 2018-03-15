/**
 * Get velo markers
 *
 * @return vectorLayerYelo
 */
function getYeloLayer() {
    // Recuperation du JSon des velo yelo
    var json_obj = JSON.parse(Get("https://yelo.agglo-larochelle.fr/yelo-api/-/data/bikes/open-data/real-time.json"));

    var yelo = [];

    for (marker in json_obj) {
        // Recuperation d'un arret de bus particulier
        p2 = new ol.Feature({
            geometry: new ol.geom.Point([json_obj[marker].longitude, json_obj[marker].latitude]),
            labelPoint: new ol.geom.Point([json_obj[marker].longitude, json_obj[marker].latitude]),
            name: json_obj[marker].name,
            type: "Velo" // pour la popup
        });

        // Definition du marqueur
        p2.setStyle(new ol.style.Style({
            image: new ol.style.Icon(({
                crossOrigin: 'anonymous',
                src: '../../../images/icone_velo.png',
                scale: 0.045
            })),
            display: 'none'
        }));
        yelo.push(p2);
    }

    // Creation de la couche contenant les velo yelo
    var vectorLayerYelo = new ol.layer.Vector({
        name: 'YeloLayer',
        source: new ol.source.Vector({
            features: yelo
        })
    });

    vectorLayerYelo.setVisible(false);
    
    return vectorLayerYelo
}
