<!DOCTYPE html>
<html>

<?php include '../header/header.php'; ?>
<link rel="stylesheet" type="text/css" href="../../../style/style-form.css">

<body>
  <div id="content-page">
    <h2>Outil de création des fichiers de metadonnées</h2>
    <form onsubmit="return atleast_onecheckbox(event)" id="form" action="postdata.php" method="post">

      <div class="form-row">
        <hr>

        <div class="form-group col-md-10">
          <p class="textIndent">Afin de faciliter la gestion future d'ajout de nouveaux jeux de données, une interface d'adminsitration a été prévue. Celle-ci doit permettre de décrire les données mises à dispositions, afin d'automatiser le type de visualisation qui sera proposé à l'utilisateur d'une part, et permettre un alignement automatique entre l'organisation des données et celle des outils de visualisation.</p>
          <p class="textIndent">Si vous êtes sur cette page, c'est que vous souhaitez ajouter un nouveau jeu de données. Pour cela, nous vous prions de bien vouloir saisir les champs ci-dessous afin de créer les métadonnes nécessaires à son import. Dès la validation de ce formulaire, votre jeu de données sera ajouté à la plateforme et disponible.<br></p>
        </div>

        <div class="form-group col-md-10">
          <h3>Informations sur le jeu de données</h3>
          <label for="title">Titre du jeu de données</label>
          <p>Correspond au titre qui sera affiché sur la page de visualisation (Ex: "BUDGET PRIMITIF ET COMPTE ADMINISTRATIF - BP 2017 - FONCTION"</p>
          <input type="text" class="form-control" name="title" required>
        </div>
        <div class="form-group col-md-10">
          <label for="inputDescriptionData">Description du jeu de données</label>
          <p>Afin de faciliter la compréhension du jeu de données, il est possible d'afficher une description de la donnée. Cela pourra guider les utilisateurs dans la lecture des données, ou la manipulation de l'outil.</p>
          <textarea form="form" type="text" class="form-control" name="description"></textarea>
        </div>
        <div class="form-group col-md-10">
          <label for="fileName">Nom du fichier qui contiendra les métadonnées</label>
          <p>Merci de saisir l'identifiant de la données (Ex: "disponibilite_parking")</p>
          <input type="text" value="" class="form-control" name="fileName" required>
        </div>
        <div class="form-group col-md-10">
          <label for="link">Lien vers les données</label>
          <p>Ce champ doit permettre d'indiquer à la plateforme où trouver exactement le jeu de données. Attention cependant, il ne faut indiquer que la dernière partie de l'URL qui se situe après le premier "&" (Ex: "&db=budget&table=bp_2014_fonction&format=json")</p>
          <input type="text" class="form-control" name="link" required>
        </div>
        <div class="form-group col-md-10">
          <label for="link">Dictionnaire</label>
          <p>Avez-vous besoin d'un dictionnaire ?</p>
          <div class="form-check checkbox">
            <label class="form-check-label"><input class="form-check-input" type="checkbox" name="checkDict" onclick="addDictionary()" id="add_dict" value="add_dictionary">Saisir dictionnaire</label>
          </div>
        </div>
        <!-- The dictionary -->
        <div id="theDictionary" class="form-row" style="display:none">
          <div class="form-group col-md-6">
            <label for="link">Titre des colonnes (dictionnaire)</label>
            <p>Lien vers le dictionnaire</p>
            <input type="text" class="form-control col-md-4" name="link_dictX">
            <p>Valeur initianle qu'on souhaite remplacer</p>
            <input type="text" class="form-control col-md-4" name="initValue_dictX">
            <p>Nouvelle valeur qui remplacera la valeur initiale</p>
            <input type="text" class="form-control col-md-4" name="newValue_dictX">
          </div>
          <div class="form-group col-md-6">
            <label for="link">Toutes les colonnes (dictionnaire)</label>
            <p>Lien vers le dictionnaire</p>
            <input type="text" class="form-control col-md-3" name="link_dictY">
            <p>Valeur de la colonne</p>
            <input type="text" class="form-control col-md-3" name="value_dictY">
            <p>Valeur initianle qu'on souhaite remplacer</p>
            <input type="text" class="form-control col-md-3" name="initValue_dictY">
            <p>Nouvelle valeur qui remplacera la valeur initiale</p>
            <input type="text" class="form-control col-md-3" name="newValue_dictY">
          </div>
        </div>
        <div class="form-group col-md-10">
          <label for="inputDataType">Type d'affichage de données :</label>
          <p>Choisir un ou plusieurs type(s) d'affichage des données: </p>
          <div class="form-check required checkbox">
            <label class="form-check-label checkbox-inline"><input class="form-check-input" type="checkbox" name="datatype[]" onclick="dataTypeChoice()" id="type_graphe" value="type_graphe">Graphe</label>
            <label class="form-check-label checkbox-inline"><input class="form-check-input" type="checkbox" name="datatype[]" onclick="dataTypeChoice()" id="type_table" value="type_table">Tableau</label>
            <label class="form-check-label checkbox-inline"><input class="form-check-input" type="checkbox" name="datatype[]" onclick="dataTypeChoice()" id="type_map" value="type_map">Carte</label>
            <label class="form-check-label checkbox-inline"><input class="form-check-input" type="checkbox" name="datatype[]" onclick="dataTypeChoice()" id="type_timeline" value="type_timeline">Timeline</label>

          </div>
        </div>
      </div>



      <!-- The graphe  -->
      <div id ="theGraph" class="form-row" style="display:none">
        <div class="form-group col-md-10">
          <hr>
          <h3>Détails du graphe</h3>
          <p>Un graphe peut-être représenté sous plusieurs formes. Veuillez choisir le type de réprésentation :</p>
          <label for="inputGraphType">Type de graphe : </label>
          <div class="form-check checkbox">
            <label class="form-check-input checkbox-inline"><input type="checkbox" name="possibleGraphs[]" value="pie" >Camembert</label>
            <label class="form-check-input checkbox-inline"><input type="checkbox" name="possibleGraphs[]" value="bar">Barres</label>
            <label class="form-check-input checkbox-inline"><input type="checkbox" name="possibleGraphs[]" value="line">Ligne</label>
            <label class="form-check-input checkbox-inline"><input type="checkbox" name="possibleGraphs[]" value="horizontalBar">Barres horizontales</label>
          </div>
        </div>
        <div class="form-group col-md-8">
          <label for="inputGraphDescription">Description du graphe</label>
          <p>Description des données affichées dans le graphe</p>
          <input type="text" class="form-control" name="dataComposition_excludeLines" >
        </div>
        <div class="form-group col-md-10">
          <label for="inputGraphPosition">Position de l'affichage du graphe</label>
          <input type="text" class="form-control" name="panelPosion_graphe" >
        </div>
        <div class="form-group col-md-4">
          <label for="inputGraphLibelle">Axe des abcisses</label>
          <p>Pour un graphe avec des axes, il faut préciser les données qui seront sur l'axe des abcisses.</p>
          <h6>Ex: pour le jeu de données Parking : dp_libelle</h6>
          <input type="text" class="form-control" name="dataComposition_title" >
        </div>
        <div class="form-group col-md-4">
          <label for="inputGraphLibelleName">Nom de l'axe des abcisses</label>
          <p>Le nom de l'axe des abcisses qui sera visible sur le graphe.</p>
          <h6>Ex: pour le jeu de données Parking : Parking</h6>
          <input type="text" class="form-control" name="dataComposition_x_axis" >
        </div>
        <div class="form-group col-md-4">
          <label for="inputGraphLibelleName">Unité de l'axe des abcisses</label>
          <p>L'unité de l'axe des abcisses qui sera visible sur le graphe.</p>
          <input type="text" class="form-control" name="dataComposition_unity_x_axis" >
        </div>

        <div class="form-group col-md-4">
          <label for="inputGraphTitle">Axe des ordonnées</label>
          <p>Pour un graphe avec des axes, il faut préciser les données qui seront sur l'axe des ordonnées.</p>
          <h6>Ex: pour le jeu de données Parking : dp_place_disponible</h6>
          <input type="text" class="form-control" name="dataComposition_value" >
        </div>
        <div class="form-group col-md-4">
          <label for="inputGraphTitle">Nom de l'axe des ordonnées</label>
          <p>Le nom de l'axe des ordonnées.</p>
          <h6>Ex: pour le jeu de données Parking 'Nombre de places disponibles'</h6>
          <input type="text" class="form-control" name="dataComposition_y_axis" >
        </div>
        <div class="form-group col-md-4">
          <label for="inputGraphTitle">Unité de l'axe des ordonnées</label>
          <p>L'unité de l'axe des ordonnées.</p>
          <input type="text" class="form-control" name="dataComposition_unity_y_axis" >
        </div>
      </div>

      <!-- The table  -->
      <div id="theTable" class="form-row" style="display:none">
        <div class="form-group col-md-10">
          <hr>
          <h3>Détails du tableau</h3>
          <p>Dans un premier temps, veuillez lister toutes les colonnes à afficher ainsi que la valeur à afficher sur l'interface utilisateur.</p>
          <label for="inputTableTitle">Titre du tableau</label>
          <input type="text" class="form-control" name="table_dataComposition_title" >
        </div>
        <div class="form-group col-md-8">
          <label for="inputTablePositon">Position de l'affichage du tableau</label>
          <input type="text" class="form-control" name="panelPosion_table" >
        </div>
        <div id="sm" class="form-group col-md-5">
          <label for="inputKeyList">Liste des mots clés</label>
          <br>
          <!-- <button id="b1" class="btn add-more" type="button" onclick="addInput()">+</button> -->
          <div id="buildyourform">
            <h6>Mot clé / valeur</h6>
            <input autocomplete="off" class="input form-control col-md-6" name="table_dataComposition_keys_list[]" type="text" placeholder="Mot clé" />
            <input autocomplete="off" class="input form-control col-md-6" name="table_dataComposition_value_list[]" type="text" placeholder="Valeur" /><br/>
          </div>
          <input type="button" id="b1" class="add" value="Ajouter mot clé/valuer" />
        </div>
      </div>

      <!-- The map  -->
      <div id="theMap" class="form-row" style="display:none">
        <div class="form-group col-md-10">
          <hr>
          <h3>Détails de la carte</h3>
          <p>Les détails d'une carte peuvent être récupérer depuis un fichier "kml" en choisisant "Carte depuis 'fichier.kml' "" ou peuvent être saisis à l'aide des champs ( il faut choisir "Nouvelle carte").</p>
          <div class="form-check radio">
            <label class="form-check-label"><input class="form-check-input" type="radio" name="maptype" onclick="mapChoice()" id="map_newMap" value="newmap">Nouvelle carte</label>
            <label class="form-check-label"><input class="form-check-input" type="radio" name="maptype" onclick="mapChoice()" id="map_fileKml" value="kmlfile">Carte depuis 'fichier.kml'</label>
          </div>
        </div>

        <!-- Nouvelle carte  -->
        <div id="new_map" style="display:none">
          <div class="form-group col-md-6">
            <label for="inputMapPosition">Position de la carte</label>
            <input type="text" class="form-control" name="panelPosion_map" >
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapTitle">Titre de la carte</label>
            <input type="text" class="form-control" name="map_name" >
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapDescription">Description de la carte</label>
            <input type="text" class="form-control" name="map_description_popup" >
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapX">Coordonnées de longitude</label>
            <input type="text" class="form-control" name="map_x" >
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapY">Coordonnées de latitude</label>
            <input type="text" class="form-control" name="map_y" >
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapNominateur">Donnée précise</label>
            <h6>Ex: pour le jeu de données Parking, il faut mettre le champs des places libres "dp_place_disponible"</h6>
            <input type="text" class="form-control" name="map_nominateur" >
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapDenominateur">Données générales</label>
            <h6>Ex: pour le jeu de données Parking, il faut mettre le champs du nombre de toutes les places "dp_nb_places"</h6>
            <input type="text" class="form-control" name="map_denominateur" >
          </div>
        </div>

        <!-- Carte depuis fichier 'kml' -->
        <div id="kmlFile_map" style="display:none">
          <div class="form-group col-md-10">
            <h3>KML file</h3>
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapPosition">Position de la carte</label>
            <input type="text" class="form-control" name="panelPosion_map" >
          </div>
          <div class="form-group col-md-8">
            <label for="inputMapKmlfile">Fichier 'kml'</label>
            <p> Entrer le fichier kml. </p>
            <h6>Ex : pour le jeu de données IRIS "quartier_iris_2008.kml"</h6>
            <input type="text" class="form-control" name="map_kml_file" >
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapKmlValue">Valeur</label>
            <h6>Ex: pour le jeu de données IRIS "pop_rp_2009"</h6>
            <input type="text" class="form-control" name="map_kml_value" >
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapKmlName">Nom</label>
            <h6>Ex: pour le jeu de données IRIS "libellez"</h6>
            <input type="text" class="form-control" name="map_kml_file" >
          </div>
        </div>

      </div>
      <!-- The timeline  -->
      <div id="theTimeline" class="form-row" style="display:none">
        <div class="form-group col-md-10">
          <hr>
          <h3>Timeline</h3>
        </div>

        <div id="sm" class="form-group col-md-5">
          <label for="inputTimelinePosition">Position de la "Timeline"</label>
          <input type="text" class="form-control" name="panelPosion_timeline" >
        </div>
        <div id="sm" class="form-group col-md-5">
          <label for="inputKeyList">Date initiale</label>
          <input type="text" class="form-control" name="actualDate" >
        </div>

        <div id="sm" class="form-group col-md-5">
          <label for="inputKeyList">Liste des années</label>
          <br>
          <!-- <button id="b1" class="btn add-more" type="button" onclick="addInput_timeline()">+</button> -->
          <div id="buildtimeline">
            <h6>Année / valeur</h6>
            <input class="input form-control col-md-6" name="timeline_dataComposition_year_list[]" type="text" placeholder="Année" />
            <input class="input form-control col-md-6" name="timeline_dataComposition_year_value_list[]" type="text" placeholder="Valeur année" />
            <br/>
          </div>
          <input type="button" id="b_timeline" class="add" value="Ajouter année/ valeur de l'année" />
        </div>
        </div>

      <div class="form-group row">
        <div class="col-sm-10">
          <button type="submit" id="submitForm" class="btn btn-primary">Valider</button>
        </div>
      </div>

    </form>
  </div>
</body>

<?php include '../footer/footer.php'; ?>
<script type="text/javascript" src="back_office.js"></script>

</html>
