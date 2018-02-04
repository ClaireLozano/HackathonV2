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
        success:function(data) {
            // Parse data in Json
            var obj = JSON.parse(data);
            return callback(obj.opendata.answer.data);
        }
    });
}; 
