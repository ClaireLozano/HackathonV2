function getPosteLayer() {
    var json_obj = JSON.parse(Get("https://datanova.legroupe.laposte.fr/api/records/1.0/search/?dataset=laposte_poincont2&lang=Fr&facet=caracteristique_du_site&facet=code_postal&facet=localite&refine.code_postal=17000"));
    json_obj = json_obj['records'];
    console.log(json_obj);

    var poste = [];

    for (marker in json_obj) {
        console.log(json_obj[marker].geometry.coordinates)
        p2 = new ol.Feature({
            geometry: new ol.geom.Point(json_obj[marker].geometry.coordinates),
            labelPoint: new ol.geom.Point(json_obj[marker].geometry.coordinates),
            name: json_obj[marker].fields.libelle_du_site,
            type: json_obj[marker].fields.caracteristique_du_site
        });

        p2.setStyle(new ol.style.Style({
            image: new ol.style.Icon(({
                crossOrigin: 'anonymous',
                src: '../../../images/icone_poste.png',
                scale: 0.045
            })),
            display:'none'
        }));
        poste.push(p2);
    }


    var vectorLayerPoste = new ol.layer.Vector({
        name:'BusLayer',
        source: new ol.source.Vector({
            features: poste
        })
    });
    vectorLayerPoste.setVisible(false);
    return vectorLayerPoste
}