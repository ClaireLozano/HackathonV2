

$(document).ready(function(){

	/**
	 * Init
	 *
	 * @return
	 */
	function init() {

		// Get url pour récupérer le nom de la donnée et le type de visualisation
		var url = window.location.href.split("?");

		// Si pas de données renseignées dans l'url, return
		if (!url[1]) {
			console.log('pas de données')
			return;
		}

		var d = url[1];
		d = d.split("&");
		var display = d[0].split("=")[1];
		var donnee = d[1].split("=")[1];

		switch (donnee){
            case 'population_2008':
                $.getJSON( "../../metadata/insee.json", function(metadata){
                    
                    // Fin de l'url qui servira à récupérer les données
                    var endUrl = "&db=insee&table=population_2008&format=json"
                    
                    // Get data
                    console.log('get insee data')

                    // Draw function

                });
                break;

            case 'disponibilite_parking':
                $.getJSON( "../../metadata/parking.json", function(metadata){
                    
                    // Fin de l'url qui servira à récupérer les données
                    var endUrl = "&db=stationnement&table=disponibilite_parking&format=json"
                    
                    // Get data
                    console.log('get parking data')

                    // Draw function

                });
                break;

            case 'fiche':
                $.getJSON( "../../metadata/archive.json", function(metadata){
                    
                    // Fin de l'url qui servira à récupérer les données
                    var endUrl = "&db=archive&table=fiche&format=json"
                    
                    // Get data
                    console.log('get archive data')

                    // Draw function

                });
                break;

            case 'bp_2017_fonction':
                $.getJSON( "../../metadata/budget.json", function(metadata){
                    
                    // Fin de l'url qui servira à récupérer les données
                    var endUrl = "&db=budget&table=bp_2017_fonction&format=json"
                    
                    // Get data
                    console.log('get budget data')

                    // Draw function

                });
                break;
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
