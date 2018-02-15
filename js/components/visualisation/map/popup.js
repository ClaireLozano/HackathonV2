
/**
 * Add the popup
 *
 * @return null
 */
function addPopup(map, myPopup, description) {
    var element = document.getElementById(myPopup);

    var popup = new ol.Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false
    });
    map.addOverlay(popup);


    // display popup on click
    map.on('click', function (evt) {
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function (feature, layer) {
                return feature;
            });
        if (feature) {
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
                var geometry = feature.getGeometry();
                var coord = geometry.getCoordinates();
                popup.setPosition(coord);
                $(element).attr('data-placement', 'top');
                $(element).attr('data-html', true);
                $(element).attr('data-content', '<p>' + description + ' </p><code>' + feature.get('dispo') + '/' + feature.get('total') + '</code>');
                $(element).attr('data-original-title', feature.get('name'));
                $(element).popover('show');
            }
        }
        else {
            $(element).popover('destroy');
        }
    });
};
