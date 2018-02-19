/**
 * Get metadata
 *
 * @return metadata
 */
var getMetadata = function(nomDonnee, callback) {
    var metadata = [];
    $.getJSON("../../metadata/" + nomDonnee + ".json", function(m) {
        return callback(m);
    });
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

/**
 * Reload page
 *
 * @return 
 */
var reloadPage = function(url, endUrl, typeVisualisation) {
    window.location.replace(url + '?type=' + typeVisualisation + '&data=' + endUrl);
};

/**
 * Draw table
 *
 * @param  {Object}         data                Data from open data la rochelle plateform
 * @param  {Object}         metadata            Meta data
 * @param  {Number}         idBox               Id of the box where the table will be
 *
 * @return null
 */
function drawTable(data, metadata, idBox) {

    // Be sure to have data
    if (!data) {
        alert("Une erreur est survenue: Impossible de construire le tableau.");
        return;
    }

    // Create table and insert title row on table 
    insertRowTitle(data, metadata, idBox, function(err) {
        // Insert rows on table
        insertRows(data, metadata, idBox, function(err) {
            // Draw table with DataTable
            setTable(idBox);
        });
    });
};

/**
 * Create table and th
 *
 * @return 
 */
var insertRowTitle = function(data, metadata, idBox, callback) {

    // Initialization
    var keys_list_table = metadata.table.dataComposition.keys_list;

    // Create table
    var val_html = "<table id='my_table_" + idBox + "' class='table table-list-search table-striped table-bordered' cellspacing='0' width='100%'><thead><tr>";

    // Get dictionnary 
    if (metadata.dictionnaireX) {
        var urlDict = metadata.dictionnaireX.link;
        var initValue = metadata.dictionnaireX.initValue;
        var newValue = metadata.dictionnaireX.newValue;

        // Get dictionnary
        getData(urlDict, function(dict) {

            // Initialize
            var found = false;

            // Create header table
            keys_list_table.forEach(function(key, j, arrJ) {
                found = false;
                dict.forEach(function(d, i, arr) {

                    // If element is on the dictionnary, take the dictionnary value
                    if (d[initValue] === key) {
                        val_html += "<th>" + d[newValue] + "</th>";
                        found = true;
                    }

                    // If the element isn't found in the dictionnary, keep the keys_list_table value
                    if (i === arr.length - 1 && !found) { 
                        val_html += "<th>" + key + "</th>";

                        // Last iteration, return
                        if (j === arrJ.length - 1) { 
                            val_html += "</tr></thead><tbody id='table_element_" + idBox + "'></tbody></table>";
                            document.getElementById(idBox).innerHTML = val_html;
                            return callback();
                        }
                    }

                    // If last element, return
                    if (i === arr.length - 1 && j === arrJ.length - 1) { 
                        val_html += "</tr></thead><tbody id='table_element_" + idBox + "'></tbody></table>";
                        document.getElementById(idBox).innerHTML = val_html;
                        return callback();
                    }
                });
            });
        });
    } else {

        // Get title from metadata
        var value_list_table = metadata.table.dataComposition.value_list;

        // Create header table
        value_list_table.forEach(function(d, i, arr) {
            val_html += "<th>" + d + "</th>"

            // Last iteration, return
            if (i === arr.length - 1) { 
                val_html += "</tr></thead><tbody id='table_element_" + idBox + "'></tbody></table>";
                document.getElementById(idBox).innerHTML = val_html;
                return callback();
            }
        });
    }
};

/**
 * Insert rows
 *
 * @return 
 */
var insertRows = function(data, metadata, idBox, callback) {

    // Initialization
    var keys_list_table = metadata.table.dataComposition.keys_list; 
    
    // Insert Rows
    if (metadata.dictionnaireY) {
        var urlDict = metadata.dictionnaireY.link;
        var value = metadata.dictionnaireY.value;
        var initValue = metadata.dictionnaireY.initValue;
        var newValue = metadata.dictionnaireY.newValue;

        // Get dictionnary
        getData(urlDict, function(dict) {
            data.forEach(function(d, i, arrI) {
                var table = document.getElementById('my_table_' + idBox);
                var tr = table.insertRow(i);
                keys_list_table.forEach(function(key, j, arrJ) {
                    insertValue = d[key];
                    var found = false;
                    if (key === value) {
                        dict.forEach(function(row, k, arr) {

                            // If element is on the dictionnary, take the dictionnary value
                            if (d[key] === row[value]) {
                                insertValue = row[newValue];
                                tr.insertCell(j).innerHTML = insertValue;
                                document.getElementById("table_element_" + idBox).appendChild(tr); 
                                found = true;
                            } 

                            // If the element isn't found in the dictionnary, keep the keys_list_table value
                            if (k === arr.length - 1 && !found) { 
                                tr.insertCell(j).innerHTML = insertValue;
                                document.getElementById("table_element_" + idBox).appendChild(tr); 

                                // Return if last element
                                if (j === arrJ.length - 1 && i === arrI.length - 1) {
                                    return callback();
                                } 
                            }
                        });
                    } else {
                        tr.insertCell(j).innerHTML = insertValue;
                        document.getElementById("table_element_" + idBox).appendChild(tr); 

                        // Return if last element
                        if (j === arrJ.length - 1 && i === arrI.length - 1) {
                            return callback();
                        } 
                    }
                });
            });
        });
    } else {
        data.forEach(function(d, i, arr) {
            var table = document.getElementById('my_table_' + idBox);
            var tr = table.insertRow(i);
            keys_list_table.forEach(function(key, j, arrJ) {
                tr.insertCell(j).innerHTML = d[key];
                document.getElementById("table_element_" + idBox).appendChild(tr); 
                
                // Return if last element
                if (i === arr.length - 1 && j === arrJ.length - 1) {
                    return callback();
                }    
            });
        });
    }
};

/**
 * Get only element we need + translate en french
 *
 * @return type if visualisation 
 */
var setTable = function(idBox) {
    $('#my_table_' + idBox).DataTable({
        "language": {
            "sProcessing":     "Traitement en cours...",
            "sSearch":         "Rechercher&nbsp;:",
            "sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
            "sInfo":           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
            "sInfoEmpty":      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
            "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
            "sInfoPostFix":    "",
            "sLoadingRecords": "Chargement en cours...",
            "sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
            "sEmptyTable":     "Aucune donn&eacute;e disponible dans le tableau",
            "oPaginate": {
                "sFirst":      "Premier",
                "sPrevious":   "←",
                "sNext":       "→",
                "sLast":       "Dernier"
            },
            "oAria": {
                "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
                "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
            }
        }
    });

    $(".dataTables_info").remove();
    // $("#my_table_box1_filter label").html("Rechercher: ");
};

/**
 * Map
 *
 * @return (data)
 */
function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}
