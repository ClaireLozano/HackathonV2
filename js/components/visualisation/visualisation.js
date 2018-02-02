

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
                // Get end url
                var endUrl = getUrl(nomDonnee);
                // With end url, get data
                getData(endUrl, function(data) {
                    // Draw visualisation
                    draw(typeVisualisation, metadata, data, 'box1');
                    // Set title
                    setTitle(metadata.title);
                    // Set active panel
                    setActivePanel(typeVisualisation);

                    console.log('metadata')
                    console.log(metadata)
                    console.log('data')
                    console.log(data)
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
