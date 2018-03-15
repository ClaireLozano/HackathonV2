/**
 * Get la poste markers
 *
 * @return vectorLayerPoste
 */
function getPosteLayer() {
    // Recuperation du JSon des bureaux de poste
    var json_obj = JSON.parse(Get("https://datanova.legroupe.laposte.fr/api/records/1.0/search/?dataset=laposte_poincont2&lang=Fr&facet=caracteristique_du_site&facet=code_postal&facet=localite&refine.code_postal=17000"));
    json_obj = json_obj['records'];

    var poste = [];

    for (marker in json_obj) {
        // Recuperation d'un bureau de poste particulier
        p2 = new ol.Feature({
            geometry: new ol.geom.Point(json_obj[marker].geometry.coordinates),
            labelPoint: new ol.geom.Point(json_obj[marker].geometry.coordinates),
            name: json_obj[marker].fields.libelle_du_site,
            type: json_obj[marker].fields.caracteristique_du_site
        });

        // Definition du marqueur
        p2.setStyle(new ol.style.Style({
            image: new ol.style.Icon(({
                crossOrigin: 'anonymous',
                src: '../../../images/icone_poste.png',
                scale: 0.045
            })),
            display: 'none'
        }));
        poste.push(p2);
    }


    // Creation de la couche contenant les bureaux de poste
    var vectorLayerPoste = new ol.layer.Vector({
        name: 'BusLayer',
        source: new ol.source.Vector({
            features: poste
        })
    });

    vectorLayerPoste.setVisible(false);
    
    return vectorLayerPoste;
}
