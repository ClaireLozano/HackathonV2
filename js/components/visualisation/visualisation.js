

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
                    draw(typeVisualisation, metadata, data, 'box1');
                    /*console.log('metadata')
                    console.log(metadata)
                    console.log('data')
                    console.log(data)*/
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

	init();
	bindListeners();
});
