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
var draw = function(typeVisualisation, metadata, data, idBox) {
    switch (typeVisualisation) {
        case 'graph':
            // Call draw table method
            drawTable(data, metadata, idBox);
            break;

        case 'table':
            // Call draw table method
            drawTable(data, metadata, idBox);
            break;

        case 'map':
            // Call draw table method
            drawTable(data, metadata, idBox);
            break;
    }
};

/**
 * Draw table
 *
 * @param  {Object}         data                Data from open data la rochelle plateform
 * @param  {Object}         metadata            Meta data
 * @param  {Number}         position            Position of random box
 *
 * @return null
 */
function drawTable(data, metadata, idBox) {

    // Initialization
    var keys_list_table = [];
    var value_list_table = [];
    
    keys_list_table = metadata.table.dataComposition.keys_list;

    // Get dictionnary 
    if (metadata.dictionnaire) {
        urlDict = metadata.dictionnaire[0];
        initValue = metadata.dictionnaire[1];
        newValue = metadata.dictionnaire[2];

        getData(urlDict, function(dict) {
            // Create table
            val_html = "<table id=\"my_table\" class=\"table table-list-search\"><thead><tr>";

            // Create header table
            dict.forEach(function(d) {
                val_html += "<th>" + d[newValue] + "</th>"
            });
            val_html += "</tr></thead><tbody id=\"table_element\"></tbody></table>";

            // Insert Row
            document.getElementById(idBox).innerHTML = val_html;
            data.forEach(function(d, i) {
                var table = document.getElementById("my_table");
                var tr = table.insertRow(i);
                keys_list_table.forEach(function(p, j) {
                    tr.insertCell(j).innerHTML = d[p];
                    document.getElementById("table_element").appendChild(tr);     
                });
            }); 
        });
    } else {
        value_list_table = metadata.table.dataComposition.value_list;
        
        // Create table
        val_html = "<table id=\"my_table\" class=\"table table-list-search\"><thead><tr>";

        // Create header table
        value_list_table.forEach(function(d) {
            val_html += "<th>" + d + "</th>"
        });
        val_html += "</tr></thead><tbody id=\"table_element\"></tbody></table>";

        // Insert Row
        document.getElementById(idBox).innerHTML = val_html;
        data.forEach(function(d, i) {
            var table = document.getElementById("my_table");
            var tr = table.insertRow(i);
            keys_list_table.forEach(function(p, j) {
                tr.insertCell(j).innerHTML = d[p];
                document.getElementById("table_element").appendChild(tr);     
            });
        }); 
    }
};

