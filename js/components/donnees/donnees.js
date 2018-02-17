

$(document).ready(function(){

	/**
	 * Init
	 *
	 * @return
	 */
	 

	function init() {
	}

	var bindListeners = function() {
        $("#tab-nav-1").click(function() {
            showMap()
        });
        $("#tab-nav-2").click(function() {
            showMap()
        });
        $("#tab-nav-3").click(function() {
            showMap()
        });
	};


    function defineLinks(type, position, nomDonnee) {
        var seeMore = "#seeMore" + position;
        $(seeMore).attr("href", "../visualisation/visualisation.php?type=" + type + "&resource=" + nomDonnee);

        var info = "#info" + position;
        $(info).attr("href", "../visualisation/visualisation.php?type=info&resource=" + nomDonnee);
    }

    /**
     * Add visualisation on random box
     *
     * @return
     */
    var addVisualizationOnBox = function() {
        var boxs = ["disponibilite_parking", "population_2008", "archive_fiche", "bp_2017_fonction", "budget_2018"];

        boxs.forEach(function(box, i, arr) {
			console.log(boxs[i]);

            // Get metadata
            getMetadata(boxs[i], function(metadata) {

                $("#panel-title-box" + i).text(metadata.title);

                // With end url, get data
                getData(metadata.link, function(data) {

                    if ((metadata.dataType === "NotHistorisedLocalisable") || (metadata.dataType === "HistorisedLocalisable")) {

                        // Generate random visualisation
                        var randVisu = getRandomInt(2);

                        // Draw visualisation
                        switch (randVisu) {
                            // switch (0) {
                            case 0:
                                drawTable(data, metadata, box);
                                defineLinks("table", i, boxs[i]);
                                break;

                            case 1:
                                drawMap(data, metadata, box, "popup" + i);
                                defineLinks("map", i, boxs[i]);
                                break;

                            case 2:
                                //drawGraph(data, metadata, box);
                                break;
                        }

                    } else {

                        // Generate random visualisation
                        var randVisu = getRandomInt(1);

                        // Draw visualisation
                        // switch (randVisu) {
                        switch (0) {
                            case 0:
                                drawTable(data, metadata, box);
                                defineLinks("table", i, boxs[i])
                                break;

                            case 1:
                                //drawGraph(data, metadata, box);
                                break;
                        }
                    }
                });
            });
        });
    };

    /**
     * Get random integer
     *
     * @return integer
     */
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    init();
	bindListeners();
    addVisualizationOnBox();
});
