/**
 * Get metadata
 *
 * @return metadata
 */
var getMetadata = function(nomDonnee, callback) {
    var metadata = [];
    switch (nomDonnee) {
        case 'population_2008':
            $.getJSON("../../metadata/insee.json", function(m) {
                return callback(m);
            });
            break;

        case 'disponibilite_parking':
            $.getJSON("../../metadata/parking.json", function(m) {
                return callback(m);
            });
            break;

        case 'fiche':
            $.getJSON("../../metadata/archive.json", function(m) {
                return callback(m);
            });
            break;

        case 'bp_2017_fonction':
            $.getJSON("../../metadata/budget.json", function(m) {
                return callback(m);
            });
            break;
    }
};

/**
 * Get end url
 *
 * @return end url
 */
var getUrl = function(nomDonnee) {
    var endUrl = "";
    switch (nomDonnee) {
        case 'population_2008':
            return "&db=insee&table=population_2008&format=json";
            break;

        case 'disponibilite_parking':
            return "&db=stationnement&table=disponibilite_parking&format=json";
            break;

        case 'fiche':
            return "&db=archive&table=fiche&format=json";
            break;

        case 'bp_2017_fonction':
            return "&db=budget&table=bp_2017_fonction&format=json";
            break;
    }
};

/**
 * Get data
 *
 * @return
 */
var getData = function(endUrl, callback) {
    jQuery.ajax({
        type: "POST",
        url: '../rest.php',
        data: {functionname: 'getOpenData', arguments: endUrl},
        success:function(data) {
            // Parse data in Json
            var obj = JSON.parse(data);
            // Return data
            return callback(obj.opendata.answer.data);
        }
    });
};

/**
 * Draw visualisation
 *
 * @return null
 */
var draw = function(typeVisualisation, metadata, data) {
    switch (typeVisualisation) {
        case 'graph':
            // Call draw graph method
            break;

        case 'table':
            // Call draw table method
            break;

        case 'map':
            // Call draw map method
            break;
    }
};