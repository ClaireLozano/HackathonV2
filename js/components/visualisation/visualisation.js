$(document).ready(function () {

    var initActivePanel = '';
    var actualDate = '';

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
            getMetadata(nomDonnee, function (metadata) {

                // Set active panel
                setPositionPanel(metadata);

                // Set active panel
                setActivePanel(typeVisualisation);

                // With end url, get data
                getData(metadata.link, function (data) {
                    if (data) {
                        // Set tab navbar and draw visualisation
                        setTabNavBarAndDraw(metadata, data);
                    } else {
                        alert("Une erreur est survenue: Aucune donnée n'a pu être chargé.");
                    }
                });

                setMapButton();
            });
        }
    };

    /**
     * Init listeners
     *
     * @return
     */
    var bindListeners = function () {
        $(".tab-nav").click(function () {
            $(".tab-pane").css('display', 'none');
            $(".tab-nav").removeClass('active');
        });

        $("#tab-nav-1").click(function () {
            $('#tab-pane-1').css('display', 'block');
            $("#tab-nav-1").addClass('active');
        });

        $("#tab-nav-2").click(function () {
            $('#tab-pane-2').css('display', 'block');
            $("#tab-nav-2").addClass('active');
        });

        $("#tab-nav-3").click(function () {
            $('#tab-pane-3').css('display', 'block');
            $("#tab-nav-3").addClass('active');
            showMap();
        });

        $("#tab-nav-6").click(function () {
            $("#tab-pane-6").css('display', 'block');
            $("#tab-nav-6").addClass('active');
        });

        // Reload the page with the new date
        $(".select-list-date").change(function () {
            // Get value of the selected item
            var nomDonnee = $('.select-list-date :selected').val();
            var url = window.location.href.split("?");
            var activePanel = getActivePanel();
            reloadPage(url[0], nomDonnee, activePanel[0]);
        });

        // Load the compare table
        $(".select-list-date-compare").change(function () {
            // Get value of the selected item
            var nomDonnee = $("option:selected", this).val();
            var activePanel = getActivePanel();
            if (nomDonnee == "none") {
                removeDrawCompare(activePanel[0]);
            } else {

                // Get metadata
                getMetadata(nomDonnee, function (metadata) {
                    // With end url, get data
                    getData(metadata.link, function (data) {
                        if (data) {
                            // Draw visualisation
                            drawCompare(activePanel[0], metadata, data);
                        } else {
                            alert("Une erreur est survenue: Aucune donnée n'a pu être chargé.");
                        }
                    });
                });
            }
        });
    };

    /**
     * Draw compare visualisation
     *
     * @param  {String}     typeVisualisation       Actual type of visualisation
     * @param  {Object}     metadata                The metadata information related to the actual data
     * @param  {Object}     data                    Data from opendata La Rochelle
     *
     * @return
     */
    var drawCompare = function (typeVisualisation, metadata, data) {

        switch (typeVisualisation) {

            case 'table':
                // Remove the table compare if exists
                if ($("#my_table_box1Compare_wrapper").length) {
                    $("#my_table_box1Compare_wrapper").remove();

                // Else, create div compare
                } else {
                    var div = document.createElement('div');
                    div.id = 'box1Compare';
                    div.className = 'box-visu';
                    div.style = "border: 1px solid; padding: 10px;";

                    // Add first date
                    var divDate = document.createElement('div');
                    divDate.id = 'box1date1';
                    divDate.className = 'box-date';
                    divDate.innerHTML = actualDate;

                    $("#tab-pane-1 .box-wrapper-inner").append(div);
                    $("#box1").prepend(divDate);
                    $("#box1").css({ 'border': "1px solid", 'padding': "10px" })
                }

                // Call draw table method
                drawTable(data, metadata, 'box1Compare');

                // Add second date
                var divDate2 = document.createElement('div');
                divDate2.id = 'box1date2';
                divDate2.className = 'box-date';
                divDate2.innerHTML = metadata.timeline.actualDate;
                $("#box1Compare").prepend(divDate2);

                break;

            case 'graph':

                // Remove the table compare if exists
                if ($("#chartbox2Compare").length) {
                    $("#chartbox2Compare").remove();

                    // Else, create div compare
                } else {
                    var div = document.createElement('div');
                    div.id = 'box2Compare';
                    div.className = 'box-visu';
                    $("#tab-pane-2 .box-wrapper-inner").append(div);
                }
                drawGraph(data, metadata, 'box2Compare');
                break;

            case 'cloud':
                // Remove the table compare if exists
                if ($("#box2Compare").length) {
                    $("#box2Compare").remove();

                    // Else, create div compare
                } else {
                    var div = document.createElement('div');
                    div.id = 'box6Compare';
                    div.className = 'box-visu';

                    // Add first date
                    var divDate = document.createElement('div');
                    divDate.id = 'box6date1';
                    divDate.className = 'box-date';
                    divDate.innerHTML = actualDate;

                    $("#tab-pane-6 .box-wrapper-inner").append(div);
                    $("#box6").prepend(divDate);
                }

                // Set div width/height because we need a width to draw the cloud
                $("#box6Compare").width(($('#box6').width() * 2) * 2);
                $("#box6Compare").height($('#box6').height());

                // Draw cloud
                drawCloud(data, metadata, 'box6Compare');

                // Set again div width to make the div responsive
                $("#box6").width("100%");
                $("#box6Compare").width("100%");
                $("#box6Compare").height("100%");

                // Add second date
                var divDate2 = document.createElement('div');
                divDate2.id = 'box6date2';
                divDate2.className = 'box-date';
                divDate2.innerHTML = metadata.timeline.actualDate;
                $("#box6Compare").prepend(divDate2);

                break;
        }
    };

    /**
     * Remove compare visualisation if existe
     *
     * @param  {String}     typeVisualisation       Actual type of visualisation
     *
     * @return
     */
    var removeDrawCompare = function (typeVisualisation) {
        switch (typeVisualisation) {
            case 'table':
                if ($("#my_table_box1Compare_wrapper").length) {
                    $("#box1Compare").remove();
                    $("#box1date1").remove();
                    $("#box1").css({ 'border': "", 'padding': "" });
                }
                break;

            case 'graph':
                if ($("#chartbox2Compare").length) {
                    $("#box2Compare").remove();
                }
                break;

            case 'cloud':
                if ($("#box6Compare").length) {
                    $("#box6Compare").remove();
                }
                break;
        }
    };

    /**
     * Get the panel active + name of id box
     *
     * @return [String, String]    [visualisationType, boxName]     Return type if visualisation
     */
    var getActivePanel = function () {
        if ($("#tab-nav-1").hasClass("active")) {
            return ["table", "box1"];
        } else if ($("#tab-nav-2").hasClass("active")) {
            return ["graph", "box2"];
        } else if ($("#tab-nav-3").hasClass("active")) {
            return ["map", "box3"];
        } else if ($("#tab-nav-4").hasClass("active")) {
            return ["info", "box4"];
        } else if ($("#tab-nav-5").hasClass("active")) {
            return ["telechargement", "box5"];
        } else if ($("#tab-nav-6").hasClass("active")) {
            return ["cloud", "box6"];
        } else {
            return [];
        }
    };

    /**
     * Set buttons to map panel
     *
     * @return
     */
    var setMapButton = function () {
        $(".button-icone").on("click", function () {

            // If the marks are visible, hide them
            if ($(this).val() === "true") {
                $(this).val("false");
                $(this).css({opacity: 0.5});

                if ($(this).attr('id') === "button-icone-bus") {
                    hideLayerBus();
                }
                if ($(this).attr('id') === "button-icone-poste") {
                    hideLayerPoste();
                }
                if ($(this).attr('id') === "button-icone-yelo") {
                    hideLayerYelo();
                }
                if ($(this).attr('id') === "button-icone-piste-cyclable") {
                    hideLayerPisteCyclable();
                }


            // Else, show them
            } else {
                $(this).val("true");
                $(this).css({opacity: 1});

                if ($(this).attr('id') === "button-icone-bus") {
                    showLayerBus();
                }
                if ($(this).attr('id') === "button-icone-poste") {
                    showLayerPoste();
                }
                if ($(this).attr('id') === "button-icone-yelo") {
                    showLayerYelo();
                }
                if ($(this).attr('id') === "button-icone-piste-cyclable") {
                    showLayerPisteCyclable();
                }
            }
        });
    };

    /**
     * Set the second title of the page
     *
     * @param  {Object}     metadata                The metadata information related to the actual data
     *
     * @return
     */
    var setDescription = function (metadata) {
        $("#description-page").html(metadata.description);

        if (metadata.type){
            if (metadata.type !== 'budget'){
                $("#description-page").append("<p><br/>La section Graphe vous permettra d'avoir une visualisation " +
                    "filtrée et progressive suivant le type de dépense sélectionné. Plusieurs graphes " +
                    "apparaitront au fur et à mesure de votre navigation. <br/><br/> " +
                    "<b>N'hésitez pas à cliquer sur les différents graphes pour avoir des détails plus affinés !<b>" +
                  "</p>")
            }
        }
    };

    /**
     * Set position panel
     *
     * @param  {Object}     metadata                The metadata information related to the actual data
     *
     * @return
     */
    var setPositionPanel = function (metadata) {
        // Get position from metadata file
        var position = [];
        if (metadata.graph) {
            position.push({'dataType' : 'graph', 'position' : metadata.graph.panelPosition});
        }
        if (metadata.table) {
            position.push({'dataType' : 'table', 'position' : metadata.table.panelPosition});
        }
        if (metadata.cloud) {
            position.push({'dataType' : 'cloud', 'position' : metadata.cloud.panelPosition});
        }
        if (metadata.map) {
            position.push({'dataType' : 'map', 'position' : metadata.map.panelPosition});
        }
        
        // Sort the position
        var sortedPosition = position.sort(function(a,b) {return (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0);} ); 
        sortedPosition = sortedPosition.reverse();

        for (var i = 0; i < sortedPosition.length; i++) {
            switch (sortedPosition[i].dataType) {
                case 'table':
                    $('#tab-nav-1').prependTo('.nav-visualisation');
                    break;

                case 'graph':
                    $('#tab-nav-2').prependTo('.nav-visualisation');
                    break;

                case 'map':
                    $('#tab-nav-3').prependTo('.nav-visualisation');
                    break;

                case 'cloud':
                    $('#tab-nav-6').prependTo('.nav-visualisation');
                    break;
                }
        }
    };

    /**
     * Set active panel
     *
     * @param  {String}     typeVisualisation       Actual type of visualisation
     *
     * @return
     */
    var setActivePanel = function (typeVisualisation) {
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

            case 'cloud':
                $('#tab-pane-6').css('display', 'block');
                $("#tab-nav-6").addClass('active');
                break;
        }
    };

    /**
     * Set the tab navbar
     *
     * @param  {Object}     metadata                The metadata information related to the actual data
     * @param  {Object}     data                    Data from opendata La Rochelle
     *
     * @return type if visualisation
     */
    var setTabNavBarAndDraw = function (metadata, data) {

        if (metadata.table) {
            drawTable(data, metadata, 'box1');
        } else {
            $("#tab-nav-1").css('display', 'none');
        }

        if (metadata.graph) {
            drawGraph(data, metadata, 'box2');
        } else {
            $("#tab-nav-2").css('display', 'none');
        }

        if (metadata.timeline) {
            // Draw select list
            $('.select-list-date').append("<p class='select-list select-list-text'>Choisissez l'année : </p>");
            var sel = $('<select>').appendTo('.select-list-date');
            sel.addClass("select-list");
            sel.addClass("select-list-select");
            sel.addClass("form-control");

            $('.select-list-date-compare').append("<p class='select-list select-list-text'>La comparer avec : </p>");
            var selCompare = $('<select>').appendTo('.select-list-date-compare');
            selCompare.addClass("select-list");
            selCompare.addClass("select-list-select");
            selCompare.append($("<option>").attr('value', 'none').text('...'));
            selCompare.addClass("form-control");

            for (var key in metadata.timeline.dates) {
                sel.append($("<option>").attr('value', metadata.timeline.dates[key]).text(key));
                selCompare.append($("<option>").attr('value', metadata.timeline.dates[key]).text(key));
            }

            // Set active select
            $(".select-list-date select").val(metadata.timeline.dates[metadata.timeline.actualDate]);

            // Set description
            setDescription(metadata);

            // Set actual date
            actualDate = metadata.timeline.actualDate;
        }

        if (metadata.cloud) {
            // Set div width/height because we need a width to draw the cloud
            var activePanel = getActivePanel();
            $("#box6").width($('#' + activePanel[1]).width());
            $("#box6").height('800px');

            // Draw cloud
            drawCloud(data, metadata, 'box6');

            // Set again div width to make the div responsive
            $("#box6").width("100%");
            $("#box6").height("100%");
        } else {
            $("#tab-nav-6").css('display', 'none');
        }

        if (metadata.map) {
            drawMap(data, metadata, 'box3', 'popup');
        } else {
            $("#tab-nav-3").css('display', 'none');
        }
    };

    init();
    bindListeners();
});
