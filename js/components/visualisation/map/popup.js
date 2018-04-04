/**
 * Add the popup
 *
 * @return null
 */
function addPopup(map, metadata, myPopup, description) {
    var element = document.getElementById(myPopup);

    // Creation d'une couche de popup
    var popup = new ol.Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false
    });
    map.addOverlay(popup);


    // display popup on click
    map.on('click', function (evt) {
        // Si KML : On ne clique pas sur une zone
        // Extraction de la zone cliquee
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function (feature, layer) {
                return feature;
            });
        if (feature) {
            // Affichage du marqueur selon son type
            if (feature.get('type') && feature.get('type') != "openData") {
                var geometry = feature.getGeometry();
                var coord = geometry.getCoordinates();
                popup.setPosition(coord);
                $(element).attr('data-placement', 'top');
                $(element).attr('data-html', true);
                $(element).attr('data-original-title', '<p>' + feature.get('name') + '</p>');
                $(element).attr('data-content', feature.get('type'));
                $(element).popover('show');
            }
            else {
                if (feature.get("dispo")) {
                    var geometry = feature.getGeometry();
                    var coord = geometry.getCoordinates();
                    popup.setPosition(coord);
                    $(element).attr('data-placement', 'top');
                    $(element).attr('data-html', true);
                    $(element).attr('data-content', '<p>' + description + ' </p><code>' + feature.get('dispo') + '/' + feature.get('total') + '</code>');
                    $(element).attr('data-original-title', feature.get('name'));
                    $(element).popover('show');
                }
                else {
                    $(element).popover('destroy');
                }
            }
        }
        else {
            $(element).popover('destroy');
        }
    });
}
