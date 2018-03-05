/**
 * Define ajax request
 *
 * @param  {String}     endUrl       End of the URL
 *
 * @return
 */
function ajaxRequest(endUrl, callback) {
    jQuery.ajax({
        type: "POST",
        url: '../rest.php',
        data: {functionname: 'getOpenData', arguments: endUrl},
        async: false, // wait for a response
        success:function(data) {
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
