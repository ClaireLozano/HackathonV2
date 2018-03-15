$(document).ready(function () {

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
    };

    /**
     * Draw visualisation on random box
     *
     * @return
     */
    var addVisualizationOnBox = function () {

        // Define data to display
        var nomDonnee = ["disponibilite_parking", "bp_2017_fonction", "acte_naissance_02_2014", "population_2008"];

        // Define type of visualisation
        var visu = ["map", "graph", "cloud", "map"];

        nomDonnee.forEach(function (n, i) {
            drawVisualisationIndex(nomDonnee[i], visu[i], i);
        });
    };

    /**
     * Draw visualisation on random box
     *
     * @return
     */
    var drawVisualisationIndex = function (nomDonnee, visu, i) {

        // Get metadata
        getMetadata(nomDonnee, function (metadata) {
            $("#panel-title-box" + i).text(metadata.title);

            // With end url, get data
            getData(metadata.link, function (data) {

                // Draw visualisation
                switch (visu) {
                    case "table":
                        drawTable(data, metadata, "box" + i);
                        defineLinks("table", i, nomDonnee);
                        break;

                    case "map":
                        drawMap(data, metadata, "box" + i, "popup" + i);
                        defineLinks("map", i, nomDonnee);
                        break;

                    case "graph":
                        drawGraph(data, metadata, "box" + i);
                        defineLinks("graph", i, nomDonnee);
                        break;

                    case "cloud":
                        drawCloud(data, metadata, "box" + i);
                        defineLinks("cloud", i, nomDonnee);
                        break;
                }
            });
        });
    };

    addVisualizationOnBox();
});
