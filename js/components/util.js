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

        case 'archive_fiche':
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
 * @param  {Number}         position            Position of random box
 *
 * @return null
 */
function drawTable(data, metadata, idBox) {

    // Be sure to have data
    if (!data) {
        alert("Une erreur est survenue: Impossible de construire le tableau.");
        return;
    }

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
            val_html = "<table id='my_table_" + idBox + "' class='table table-list-search table-striped table-bordered' cellspacing='0' width='100%'><thead><tr>";
            var found = false;
            // Create header table
            keys_list_table.forEach(function(key, j) {
                found = false;
                dict.forEach(function(d, i, arr) {
                    // If element is on the dictionnary, take the dictionnary value
                    if (d[initValue] === key) {
                        val_html += "<th>" + d[newValue] + "</th>";
                        found = true;
                        return;
                    }
                    // If the element isn't found in the dictionnary, keep the keys_list_table value
                    if (i === arr.length - 1 && !found) { 
                       val_html += "<th>" + key + "</th>";
                    }
                });
            });
            
            val_html += "</tr></thead><tbody id='table_element_" + idBox + "'></tbody></table>";

            // Insert Row
            document.getElementById(idBox).innerHTML = val_html;
            console.log(data)
            data.forEach(function(d, i) {
                var table = document.getElementById('my_table_' + idBox);
                var tr = table.insertRow(i);
                keys_list_table.forEach(function(p, j) {
                    tr.insertCell(j).innerHTML = d[p];
                    document.getElementById("table_element_" + idBox).appendChild(tr);     
                });
            });
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
            setTable();
        });
    } else {
        value_list_table = metadata.table.dataComposition.value_list;
        
        // Create table
        val_html = "<table id='my_table_" + idBox + "' class='table table-list-search table-striped table-bordered' cellspacing='0' width='100%'><thead><tr>";

        // Create header table
        value_list_table.forEach(function(d) {
            val_html += "<th>" + d + "</th>"
        });
        val_html += "</tr></thead><tbody id='table_element_" + idBox + "'></tbody></table>";

        // Insert Row
        document.getElementById(idBox).innerHTML = val_html;
        data.forEach(function(d, i) {
            var table = document.getElementById('my_table_' + idBox);
            var tr = table.insertRow(i);
            keys_list_table.forEach(function(p, j) {
                tr.insertCell(j).innerHTML = d[p];
                document.getElementById("table_element_" + idBox).appendChild(tr);     
            });
        }); 
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
        setTable();
    }
};

/**
 * Get only element we need + translate en french
 *
 * @return type if visualisation 
 */
var setTable = function() {
    $(".dataTables_info").remove();
    // $("#my_table_box1_filter label").html("Rechercher: ");
};
