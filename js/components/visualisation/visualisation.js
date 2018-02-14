

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

                // Set 2 select lists on historisable data
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

                    for (var key in metadata.timeline.dates) {
                        sel.append($("<option>").attr('value',metadata.timeline.dates[key]).text(key));
                        selCompare.append($("<option>").attr('value',metadata.timeline.dates[key]).text(key));
                    }

                    // Set active select
                    $(".select-list-date select").val(metadata.timeline.dates[metadata.timeline.actualDate]);

                    // Set description
                    setDescription(metadata);
                }
                // With end url, get data
                getData(metadata.link, function(data) {
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

        // Reload the page with the new date
        $(".select-list-date").change(function() {
            // Get value of the selected item 
            var nomDonnee = $('.select-list-date :selected').val();
            var url = window.location.href.split("?");
            var activePanel = getActivePanel();
            reloadPage(url[0], nomDonnee, activePanel);
        });

        // Load the compare table
        $(".select-list-date-compare").change(function() {
            // Get value of the selected item 
            var nomDonnee = $('.select-list-date-compare :selected').val();
            var typeVisualisation = getActivePanel();
            if (nomDonnee == "none") {
                // Remove the table compare
                if ($("#my_table_box1Compare_wrapper").length) {
                    $("#box1Compare").remove();
                }
            } else {
                // Get metadata
                getMetadata(nomDonnee, function(metadata) {
                    // With end url, get data
                    getData(metadata.link, function(data) {
                        if (data) {
                            // Draw visualisation
                            drawCompare(typeVisualisation, metadata, data);
                        } else {
                            alert("Une erreur est survenue: Aucune donnée n'a pu être chargé.");
                        }
                    });
                });
            }
        });
	};

    /**
     * Get the panel active
     *
     * @return type if visualisation 
     */
    var getActivePanel = function() {
        if ($("#tab-nav-1").hasClass("active")) {
            return "table";
        } else if ($("#tab-nav-2").hasClass("active")) {
            return "graph";
        } else {
            return "map";
        }
    };

    /**
     * Draw visualisation
     *
     * @return null
     */
    var drawCompare = function(typeVisualisation, metadata, data) {
        switch (typeVisualisation) {
            case 'table':
                // Remove the table compare if exists
                if ($("#my_table_box1Compare_wrapper").length) {
                    $("#my_table_box1Compare_wrapper").remove();
                } else {
                    // Else, create div compare
                    var div = document.createElement('div');
                    div.id = 'box1Compare';
                    div.className = 'box-visu';
                    $("#tab-pane-1 .box-wrapper-inner").append(div);
                }
                // Set the second title
                // setSecondTitle(metadata.title);
                // Call draw table method
                drawTable(data, metadata, 'box1Compare');
                break;

            case 'graph':
                // Call draw graph method
                // Create div compare
                var div = document.createElement('div');
                div.id = 'box2Compare';
                div.className = 'box-visu';
                $("#tab-pane-2 .box-wrapper-inner").append(div);
                //drawGraph(data, metadata, 'box2Compare');
                //setSeletList(data, metadata);
                break;
        }
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
                setMapButton();
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
                setMapButton();
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
     * Set buttons to map panel
     *
     * @return
     */
    var setMapButton = function() {
        $(".button-icone").on("click", function() {

            // If the marks are visible, hide them
            if ($(this).val() === "true") {
                $(this).val("false");
                $(this).css({opacity: 0.5});

                // Remove bus marks
                if($(this).attr('id') === "button-icone-bus") {
                    hideLayerBus()
                }

                // Remove poste marks
                if($(this).attr('id') === "button-icone-poste") {
                    hideLayerPoste()
                }

            // Else, show them
            } else {
                $(this).val("true");
                $(this).css({opacity: 1});
                
                // Draw bus marks
                if($(this).attr('id') === "button-icone-bus") {
                    showLayerBus()
                }

                // Draw poste marks
                if($(this).attr('id') === "button-icone-poste") {
                    showLayerPoste()
                }
            }
        });
    };

    /**
     * Set the title of the page
     *
     * @return
     */
    var setTitle = function(title) {
        $("#title-page").html(title);
    };

    /**
     * Set the second title of the page
     *
     * @return
     */
    var setDescription = function(metadata) {
        $("#description-page").html(metadata.description);
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

            case 'info':
                $('#tab-pane-4').css('display', 'block');
                $("#tab-nav-4").addClass('active');
                break;
        }
    };

	init();
	bindListeners();
});
