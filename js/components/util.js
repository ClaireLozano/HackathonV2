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
