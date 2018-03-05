$(document).ready(function () {
    /**
     * Get arguments from url
     *
     * @return (type visualisation, nom data)
     */
    var getUrlPage = function () {
        // Get url pour récupérer le nom de la donnée et le type de visualisation
        var url = window.location.href.split("?");

        // Si pas de données renseignées dans l'url, return
        if (!url[1]) {
            console.log('pas de données')
            return null;
        }

        // Récupération des arguments contenu dans l'url
        var d = url[1];
        d = d.split("&");
        var typeVisualisation = d[0].split("=")[1];
        var nomDonnee = d[1].split("=")[1];

        return [typeVisualisation, nomDonnee];
    };


    //Définition de la projection de la carte en Lambert 93
    var projection = new ol.proj.Projection({code: "EPSG:2154", units: 'm'});

    //definition de l'emprise de la carte
    var extent = [375000, 6566000, 382500, 6574000];
    //ajout d'une photo aérienne
    var layer_ortho = new ol.layer.Tile({
        title: 'Ortho 2013',
        source: new ol.source.TileWMS({
            url: 'http://portail-sig.ville-larochelle.fr/opendata/carteWS.php?',
            params: {'LAYERS': 'ortho_2013_lr', 'FORMAT': 'image/png', 'CRS': 'EPSG:2154', 'TILED': true},
            serverType: 'mapserver'
        })
    });
    // Ajout d'une couche pour les parcelles cadastrales
    var cad_parcelle = new ol.layer.Tile({
        title: 'parcelle cadastrale',
        source: new ol.source.TileWMS({
            url: 'http://portail-sig.ville-larochelle.fr/opendata/carteWS.php?',
            params: {'LAYERS': 'cad_parcelle', 'FORMAT': 'image/png', 'CRS': 'EPSG:2154', 'TILED': true},
            serverType: 'mapserver'
        })
    });

    var result = getUrlPage();
    var nomDonnee = result[1];
    var endUrl = getUrl(nomDonnee);


    getData(endUrl, function (data) {

        var parking_coord = [];

        console.log(data);

        for (marker in data) {

            var nb_dispo = data[marker].dp_place_disponible;
            var nb_places = data[marker].dp_nb_places;
            var color = '#B82010';
            if (nb_dispo>nb_places/3){
                color = '#DD985C'
            }
            if (nb_dispo>(nb_places*2/3)){
                color='#C2F732'
            }

            p2 = new ol.Feature({
                geometry: new ol.geom.Point([data[marker].dp_x, data[marker].dp_y]),
                labelPoint: new ol.geom.Point([data[marker].dp_x, data[marker].dp_y]),
                name: data[marker].dp_libelle,
                dispo: nb_dispo,
                total: nb_places
            });


            p2.setStyle(new ol.style.Style({
                image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    color: color,
                    crossOrigin: 'anonymous',
                    src: 'https://openlayers.org/en/v4.6.4/examples/data/dot.png'
                }))
            }));
            parking_coord.push(p2);


        }

        var vectorSource = new ol.source.Vector({
            features: parking_coord
        });

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        var map = new ol.Map({
            layers: [layer_ortho, cad_parcelle, vectorLayer],
            target: document.getElementById('map'),
            view: new ol.View({
                projection: projection,
                center: [379500, 6570000],
                zoom: 16,
                extent: extent
            })
        });

        var element = document.getElementById('popup');

        var popup = new ol.Overlay({
            element: element,
            positioning: 'bottom-center',
            stopEvent: false
        });

        map.addOverlay(popup);

        // display popup on click
        map.on('click', function(evt) {
            var feature = map.forEachFeatureAtPixel(evt.pixel,
                function(feature, layer) {
                    return feature;
                });
            if (feature) {
                var geometry = feature.getGeometry();
                var coord = geometry.getCoordinates();
                popup.setPosition(coord);
                $(element).popover({
                    'title': feature.get('name'),
                    'placement': 'top',
                    'html': true,
                    'content': '<p>Places : </p><code>' + feature.get('dispo') + '/'+feature.get('total') + '</code>'
                });
                $(element).popover('show');
            } else {
                $(element).popover('destroy');
            }
        });

        // change mouse cursor when over marker
        map.on('pointermove', function(e) {
            if (e.dragging) {
                $(element).popover('destroy');
                return;
            }
            var pixel = map.getEventPixel(e.originalEvent);
            var hit = map.hasFeatureAtPixel(pixel);
            map.getTarget().style.cursor = hit ? 'pointer' : '';
        });
    });


});
