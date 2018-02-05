

$(document).ready(function(){

	/**
	 * Init
	 *
	 * @return
	 */
	function init() {
        var result = getUrlPage();
        var typeVisualisation = result[0];
        var nomDonnee = result[1];

        if (typeVisualisation && nomDonnee) {
            // Get metadata
            getMetadata(nomDonnee, function(metadata) {
                // Remove map panel if the data is not localisable
                if(metadata.dataType === 'HistorisedNotLocalisable' || metadata.dataType === 'NotHistorisedNotLocalisable') {
                    $("#tab-nav-3").css('display', 'none');
                }

                // Set a select list on historisable data
                if(metadata.dataType === 'HistorisedNotLocalisable' || metadata.dataType === 'HistorisedLocalisable') {
                    $('.select-list-date').append("<p class='select-list select-list-text'>Choisissez l'année : </p>");
                    var sel = $('<select>').appendTo('.select-list-date');
                    sel.addClass("select-list");
                    sel.addClass("select-list-select");
                    sel.addClass("form-control");

                    $('.select-list-date-compare').append("<p class='select-list select-list-text'>La comparer avec : </p>");
                    var selCompare = $('<select>').appendTo('.select-list-date-compare');
                    selCompare.addClass("select-list");
                    selCompare.addClass("select-list-select");
                    selCompare.append($("<option>").attr('value','none').text('...'));
                    selCompare.addClass("form-control");

                    for (var key in metadata.timeline) {
                        sel.append($("<option>").attr('value',metadata.timeline[key]).text(key));
                        selCompare.append($("<option>").attr('value',metadata.timeline[key]).text(key));
                    }
                }
                // Get end url
                var endUrl = getUrl(nomDonnee);
                // With end url, get data
                getData(endUrl, function(data) {
                    // Draw visualisation
                    draw(typeVisualisation, metadata, data);
                    // Set title
                    setTitle(metadata.title);
                    // Set active panel
                    setActivePanel(typeVisualisation);

                    /*console.log('metadata')
                    console.log(metadata)
                    console.log('data')
                    console.log(data)*/
                });
            });
        }
	};

	/**
	 * Init listeners
	 *
	 * @return
	 */
	var bindListeners = function() {
        // Oui c'est sale ... chuuuuuut ... si vous avez mieux à proposer GO!
        $(".tab-nav").click(function() {
            $(".tab-pane").css('display', 'none');
            $(".tab-nav").removeClass('active');
        });

        $("#tab-nav-1").click(function() {
            $('#tab-pane-1').css('display', 'block');
            $("#tab-nav-1").addClass('active');
        });

        $("#tab-nav-2").click(function() {
            $('#tab-pane-2').css('display', 'block');
            $("#tab-nav-2").addClass('active');
        });

        $("#tab-nav-3").click(function() {
            $('#tab-pane-3').css('display', 'block');
            $("#tab-nav-3").addClass('active');
        });

        $("#tab-nav-4").click(function() {
            $("#tab-pane-4").css('display', 'block');
            $("#tab-nav-4").addClass('active');
        });

        $("#tab-nav-5").click(function() {
            $("#tab-pane-5").css('display', 'block');
            $("#tab-nav-5").addClass('active');
        });

	};

    /**
     * Draw visualisation
     *
     * @return null
     */
    var draw = function(typeVisualisation, metadata, data) {
        switch (metadata.dataType) {
            case 'HistorisedLocalisable':
                // Call draw table method
                drawTable(data, metadata, 'box1');
                //drawMap(data, metadata, 'box2');
                //drawGraph(data, metadata, 'box3');
                //setSeletList(data, metadata);
                break;

            case 'HistorisedNotLocalisable':
                // Call draw table method
                drawTable(data, metadata, 'box1');
                //drawGraph(data, metadata, 'box3');
                //setSeletList(data, metadata);
                break;

            case 'NotHistorisedLocalisable':
                // Call draw table method
                drawTable(data, metadata, 'box1');
                //drawMap(data, metadata, 'box2');
                //drawGraph(data, metadata, 'box3');
                break;

            case 'NotHistorisedNotLocalisable':
                // Call draw table method
                drawTable(data, metadata, 'box1');
                //drawGraph(data, metadata, 'box3');
                break;
        }
    };

    /**
     * Set the title of the page
     *
     * @return
     */
    var setTitle = function(title) {
        $("h1").html(title);
    };

    /**
     * Set active panel
     *
     * @return
     */
    var setActivePanel = function(typeVisualisation) {
        switch (typeVisualisation) {
            case 'table':
                $('#tab-pane-1').css('display', 'block');
                $("#tab-nav-1").addClass('active');
                break;

            case 'graph':
                $('#tab-pane-2').css('display', 'block');
                $("#tab-nav-2").addClass('active');
                break;

            case 'map':
                $('#tab-pane-3').css('display', 'block');
                $("#tab-nav-3").addClass('active');
                break;
        }
    };

	init();
	bindListeners();
});
