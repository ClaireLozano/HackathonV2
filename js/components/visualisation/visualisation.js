$(document).ready(function () {

    var initActivePanel = '';

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

                // Set title
                setTitle(metadata.title);

                // Set active panel
                setActivePanel(typeVisualisation);

                // Set comments
                setComments(nomDonnee);

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

        $("#tab-nav-4").click(function () {
            $("#tab-pane-4").css('display', 'block');
            $("#tab-nav-4").addClass('active');
        });

        $("#tab-nav-5").click(function () {
            $("#tab-pane-5").css('display', 'block');
            $("#tab-nav-5").addClass('active');
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

        // Disable submit button if empty textarea
        $('#submit-comment').attr('disabled',true);
        $('#text-comment').keyup(function(){
            if($(this).val().length !=0)
                $('#submit-comment').attr('disabled', false);            
            else
                $('#submit-comment').attr('disabled',true);
        });

        $('#submit-comment').click(function() {
            var text = $('#text-comment').val();
            var name = $('#name-comment').val();
            var date = new Date();

            // Clear inputs
            $('#text-comment').val("");
            $('#name-comment').val(""); 

            // Call function to save data in database

            // Add the comment to the list
            $(".comments-list").append('<li class="comment"> <div class="comment-body"> <div class="comment-heading"> <h4 class="user">' + name + '</h4> <h5 class="time">'+ formatDate(date) + '</h5> </div> <p>' + text + '</p> </div> </li>');
            
            return false;
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
                    $("#tab-pane-1 .box-wrapper-inner").append(div);
                }

                // Call draw table method
                drawTable(data, metadata, 'box1Compare');
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
                    $("#tab-pane-6 .box-wrapper-inner").append(div);
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
            }
        });
    };

    /**
     * Set the title of the page
     *
     * @param  {String}     title       Data title
     *
     * @return 
     */
    var setTitle = function (title) {
        $("#title-page").html(title);
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

        if(metadata.title.search('Budget') != -1){
            $("#description-page").append("<p><br/>La section Graphe vous permettra d'avoir une visualisation " +
                "filtrée et progressive suivant le type de dépense sélectionné. Plusieurs graphes " +
                "apparaitront au fur et à mesure de votre navigation.</p>")
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

            case 'info':
                $('#tab-pane-4').css('display', 'block');
                $("#tab-nav-4").addClass('active');
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

    /**
     * Set comments
     *
     * @param  {String}     nomDonnee                Name of the data
     *
     * @return 
     */
    var setComments = function (nomDonnee) {

        // Call server and remove this function
        getFakeComments(nomDonnee, function(err, comments) {

            // Display all comments related to a data
            comments.forEach(function(comment) {
                $(".comments-list").append('<li class="comment"> <div class="comment-body"> <div class="comment-heading"> <h4 class="user">' + comment.name + '</h4> <h5 class="time">'+ formatDate(comment.date) + '</h5> </div> <p>' + comment.text + '</p> </div> </li>');
            });
        });
    };

    /**
     * Get pretty date
     *
     * @param  {Date}       date                    A comment date
     *
     * @return pretty date
     */
    function formatDate(date) {
        var monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    };

    var getFakeComments = function (nomDonnee, callback) {
        return callback(null,  [{'name': 'Annonyme', 'date': 'Tue Mar 20 2018 10:29:30 GMT+0100 (CET)', 'text': 'Commentaire numéro 1'}, 
                                {'name': 'Annonyme', 'date': 'Tue Mar 20 2018 11:30:01 GMT+0100 (CET)', 'text': 'Commentaire numéro 2'},
                                {'name': 'Open data ville la rochelle', 'date': 'Tue Mar 20 2018 12:31:25 GMT+0100 (CET)', 'text': 'Commentaire numéro 3'}]);
    };

    init();
    bindListeners();
});
