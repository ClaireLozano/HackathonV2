

$(document).ready(function(){

	/**
	 * Init
	 *
	 * @return
	 */
	function init() {
        var result = getUrlPage();
        var typeVisualisation = result[0]; 
        var nomDonnee = result[1]; 

        if (typeVisualisation && nomDonnee) {
            // Get metadata
            getMetadata(nomDonnee, function(metadata) {
                // Get end url
                var endUrl = getUrl(nomDonnee);
                // With end url, get data
                getData(endUrl, function(data) {
                    // Draw visualisation
                    draw(typeVisualisation, metadata, data);
                    console.log('metadata')
                    console.log(metadata)
                    console.log('data')
                    console.log(data)
                });
            });
        }
	};

	/**
	 * Init listeners
	 *
	 * @return
	 */
	var bindListeners = function() {

	};

    /**
     * Get arguments from url
     *
     * @return (type visualisation, nom data)
     */
    var getUrlPage = function() {
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

	init();
	bindListeners();
});
