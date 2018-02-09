

$(document).ready(function(){

	/**
	 * Init
	 *
	 * @return
	 */
	function init() {

	};

	/**
	 * Init listeners
	 *
	 * @return
	 */
	var bindListeners = function() {
        
	};

    /**
     * Definie link
     *
     * @param  {Object}         type                Type of visualisation
     * @param  {Object}         nomDonnee           Meta data link
     * @param  {Number}         position            Position of random box
     *
     * @return null
     */
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
        var boxs = ["box0", "box1"];
        var nomDonnee = ["disponibilite_parking", "population_2008", "bp_2017_fonction"];

        boxs.forEach(function(box, i, arr) {

            var randNomDonnee = getRandomInt(nomDonnee.length);

            // Get metadata
            getMetadata(nomDonnee[randNomDonnee], function(metadata) {
                $("#panel-title-box" + i).text(metadata.title);

                // With end url, get data
                getData(metadata.link, function(data) {

                    // Generate random visualisation
                    var randVisu = getRandomInt(3);

                    // Draw visualisation
                    // switch (randVisu) {
                    switch (0) {
                        case 0:
                            drawTable(data, metadata, box);
                            defineLinks("table", i, nomDonnee[randNomDonnee])
                            break;

                        case 1:
                            //drawGraph(data, metadata, box);
                            break;

                        case 2:
                            //drawMap(data, metadata, box);
                            break;
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