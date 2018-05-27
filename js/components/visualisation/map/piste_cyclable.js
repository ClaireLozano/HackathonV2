/**
 * Get velo markers
 *
 * @return vectorLayerYelo
 */
function getPisteCyclableLayer() {

    var styleFunction = function(feature) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color:"#2E2EFE",
                width : 2
            })
        });
    };

    // Creation de la couche contenant les velo yelo
    var vectorLayerPisteCyclable = new ol.layer.Vector({
        name: 'YeloLayer',
        source: new ol.source.Vector({
            url: "../../kml/" + "tr_piste_cyclable.kml",
            format: new ol.format.KML({
                extractStyles: false
            })
        }),
        style: styleFunction
    });

    vectorLayerPisteCyclable.setVisible(false);
    
    return vectorLayerPisteCyclable
}
