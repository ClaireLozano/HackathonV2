/**
 * Get metadata
 *
 * @param   {String}        nomDonnee          File name
 *
 * @return  {Object}        metadata
 */
var getMetadata = function (nomDonnee, callback) {
    var metadata = [];
    $.getJSON("../../metadata/" + nomDonnee + ".json", function (m) {
        return callback(m);
    });
};

/**
 * Define ajax request
 *
 * @param  {String}     endUrl          End of the URL
 *
 * @return {object}     data            Data from opendatalarochelle
 */
var getData = function (endUrl, callback) {
    jQuery.ajax({
        type: "POST",
        url: '../rest.php',
        async: false, // wait for a response
        data: {functionname: 'getOpenData', arguments: endUrl},
        success: function (data) {
        },
        complete: function (request, textStatus) {
            if (request.responseText !== 'null') {
                // Parse data in Json
                var obj = JSON.parse(request.responseText);
                // Return data
                return callback(obj.opendata.answer.data);
            } else {
                return callback(null);
            }
        }
    });
};

/**
 * Get arguments from url
 *
 * @return [String, String]     typeVisualisation, nomDonnee            Return type of visualisation to display and data name
 */
var getUrlPage = function () {
    
    // Get url pour récupérer le nom de la donnée et le type de visualisation
    var url = window.location.href.split("?");

    // Si pas de données renseignées dans l'url, return
    if (!url[1]) {
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
 * @return null
 */
var reloadPage = function (url, endUrl, typeVisualisation) {
    window.location.replace(url + '?type=' + typeVisualisation + '&data=' + endUrl);
};

/**
 * Get data which are not related with the opendata larochelle
 *
 * @param  {String}     endUrl          End of the URL
 *
 * @return {object}     data            Data from url
 */
function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest(); 
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
};
