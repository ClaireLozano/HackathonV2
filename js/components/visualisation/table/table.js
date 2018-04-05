/**
 * Draw table
 *
 * @param  {Object}         data                Data from open data la rochelle plateform
 * @param  {Object}         metadata            Meta data
 * @param  {Number}         idBox               Id of the box where the table will be
 *
 * @return
 */
var drawTable = function (data, metadata, idBox) {

    // Be sure to have data
    if (!data) {
        alert("Une erreur est survenue: Impossible de construire le tableau.");
        return;
    }

    // Create table and insert title row on table 
    insertRowTitle(data, metadata, idBox, function (err) {
        // Insert rows on table
        insertRows(data, metadata, idBox, function (err) {
            // Draw table with DataTable
            setTable(idBox);
        });
    });
};

/**
 * Create table and th
 *
 * @param  {Object}         data                Data from open data la rochelle plateform
 * @param  {Object}         metadata            Meta data
 * @param  {Number}         idBox               Id of the box where the table will be
 * @param  {callback}       callback               
 *
 * @return callback()
 */
function insertRowTitle(data, metadata, idBox, callback) {

    // Initialization
    var keys_list_table = metadata.table.dataComposition.keys_list;

    var val_html="";
    if (metadata.timeline && metadata.timeline.actualDate) {
        var idBoxAnnee = "idBoxAnnee"+ idBox;
        val_html += "<div class='text-center' id='"+idBoxAnnee+"'>"+metadata.timeline.actualDate+"</div>"
    }

    // Create table
    val_html += "<table id='my_table_" + idBox + "' class='table table-list-search table-striped table-bordered' cellspacing='0' width='100%'><thead><tr>";
    val_tfoot = "";

    // Get dictionnary 
    if (metadata.dictionnaireX) {
        var urlDict = metadata.dictionnaireX.link;
        var initValue = metadata.dictionnaireX.initValue;
        var newValue = metadata.dictionnaireX.newValue;

        // Get dictionnary
        getData(urlDict, function (dict) {

            // Initialize
            var found = false;

            // Create header table
            keys_list_table.forEach(function (key, j, arrJ) {
                found = false;
                dict.forEach(function (d, i, arr) {

                    // If element is on the dictionnary, take the dictionnary value
                    if (d[initValue] === key) {
                        val_html += "<th>" + d[newValue] + "</th>";
                        val_tfoot += "<th>" + d[newValue] + "</th>";
                        found = true;
                    }

                    // If the element isn't found in the dictionnary, keep the keys_list_table value
                    if (i === arr.length - 1 && !found) {
                        val_html += "<th>" + key + "</th>";
                        val_tfoot += "<th>" + key + "</th>";

                        // Last iteration, return
                        if (j === arrJ.length - 1) {
                            val_html += "</tr></thead><tfoot><tr>" + val_tfoot + "</tr></tfoot><tbody id='table_element_" + idBox + "'></tbody></table>";
                            document.getElementById(idBox).innerHTML = val_html;
                            return callback();
                        }
                    }

                    // If last element, return
                    if (i === arr.length - 1 && j === arrJ.length - 1) {
                        val_html += "</tr></thead><tfoot><tr>" + val_tfoot + "</tr></tfoot><tbody id='table_element_" + idBox + "'></tbody></table>";
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
        value_list_table.forEach(function (d, i, arr) {
            val_html += "<th>" + d + "</th>"
            val_tfoot += "<th>" + d + "</th>";

            // Last iteration, return
            if (i === arr.length - 1) {
                val_html += "</tr></thead><tfoot><tr>" + val_tfoot + "</tr></tfoot><tbody id='table_element_" + idBox + "'></tbody></table>";
                document.getElementById(idBox).innerHTML = val_html;
                return callback();
            }
        });
    }
};

/**
 * Insert rows
 *
 * @param  {Object}         data                Data from open data la rochelle plateform
 * @param  {Object}         metadata            Meta data
 * @param  {Number}         idBox               Id of the box where the table will be
 * @param  {callback}       callback               
 *
 * @return callback()
 */
function insertRows(data, metadata, idBox, callback) {

    // Initialization
    var keys_list_table = metadata.table.dataComposition.keys_list;

    // Insert Rows
    if (metadata.dictionnaireY) {
        var urlDict = metadata.dictionnaireY.link;
        var value = metadata.dictionnaireY.value;
        var initValue = metadata.dictionnaireY.initValue;
        var newValue = metadata.dictionnaireY.newValue;

        // Get dictionnary
        getData(urlDict, function (dict) {
            data.forEach(function (d, i, arrI) {
                var table = document.getElementById('my_table_' + idBox);
                var tr = table.insertRow(i);
                keys_list_table.forEach(function (key, j, arrJ) {
                    insertValue = d[key];
                    var found = false;
                    if (key === value) {
                        dict.forEach(function (row, k, arr) {

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
        data.forEach(function (d, i, arr) {
            var table = document.getElementById('my_table_' + idBox);
            var tr = table.insertRow(i);
            keys_list_table.forEach(function (key, j, arrJ) {
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
 * @param  {Number}         idBox               Id of the box where the table will be
 *
 * @return null
 */
function setTable(idBox) {
    $('#my_table_' + idBox).DataTable({
        "language": {
            "sProcessing": "Traitement en cours...",
            "sSearch": "Rechercher&nbsp;:",
            "sLengthMenu": "Afficher _MENU_ &eacute;l&eacute;ments",
            "sInfo": "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
            "sInfoEmpty": "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
            "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
            "sInfoPostFix": "",
            "sLoadingRecords": "Chargement en cours...",
            "sZeroRecords": "Aucun &eacute;l&eacute;ment &agrave; afficher",
            "sEmptyTable": "Aucune donn&eacute;e disponible dans le tableau",
            "oPaginate": {
                "sFirst": "Premier",
                "sPrevious": "←",
                "sNext": "→",
                "sLast": "Dernier"
            },
            "oAria": {
                "sSortAscending": ": activer pour trier la colonne par ordre croissant",
                "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
            }
        }
    });

    // Setup - add a text input to each footer cell
    $('#my_table_' + idBox + ' tfoot th').each(function () {
        var title = $(this).text();
        $(this).html('<input type="text" id="searchTFoot" placeholder="Chercher un(e) ' + title + '" />');
    });

    // DataTable
    var table = $('#my_table_' + idBox).DataTable();

    // Apply the search
    table.columns().every(function () {
        var that = this;

        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });
    });

    $(".dataTables_info").remove();
};
