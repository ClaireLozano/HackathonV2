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

    var vectorSource = new ol.source.Vector();
    var vectorLayer = new ol.layer.Vector({
        source: vectorSource
    });

    console.log("Markers List Before");
    getData(endUrl, function (data) {
        console.log("During");
        console.log(data.map(data => [data.dp_x, data.dp_y]));
        var markers = data.map(data => [data.dp_x, data.dp_y]);

                for (marker in markers) {
                    console.log(markers[marker]);
                    var feature = new ol.Feature({
                        labelPoint : new ol.geom.Point(markers[marker][0], markers[marker][1]),
                        name: 'myPoint',
                        population: 4000,
                        rainfall: 500
                    });
                    vectorSource.addFeature(feature);
                }
        //vectorSource.addFeatures(markers);


        //vectorLayer.addFeatures(feature);
        //vectorSource.addFeatures(markers);
    });

    //Declaration de la carte
    var map = new ol.Map({
        //layers: [layer_ortho,cad_parcelle, vectorLayer],
        layers: [cad_parcelle, layer_ortho, vectorLayer],
        target: 'map',
        view: new ol.View({
            projection: projection,
            center: [379500, 6570000],
            extent: extent,
            zoom: 16
        })
    });

});
