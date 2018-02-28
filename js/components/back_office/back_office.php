<!DOCTYPE html>
<html>

  <?php include '../header/header.php'; ?>
  <link rel="stylesheet" type="text/css" href="../../../style/style-form.css">

  <body>
    <div id="content-page">
      <h2>Back office</h2>
      <p>Création de métadonnes pour les jeux de données </p>
      <form id="form" action="postdata.php" method="post">

        <div class="form-row">
          <hr>
          <h3>Détails jeu de données</h3>
          <div class="form-group col-md-10">
            <label for="title">Titre de la données</label>
            <p>Correspond au titre à afficher sur la page de visualisation (Ex: "BUDGET PRIMITIF ET COMPTE ADMINISTRATIF - BP 2017 - FONCTION"</p>
            <input type="text" class="form-control" name="title" required>
          </div>
          <div class="form-group col-md-10">
            <label for="inputDescriptionData">Description des données</label>
            <p>Il est possible d'afficher une description de la données et ainsi guider les utilisateurs dans la lecture des données.</p>
            <textarea form="form" type="text" class="form-control" name="description" required></textarea>
          </div>
          <div class="form-group col-md-10">
            <label for="fileName">Nom du fichier métadonnées</label>
            <p>Le fichier doit prendre le nom de l'identifiant de la données (Ex: "disponibilite_parking")</p>
            <input type="text" class="form-control" name="fileName" required>
          </div>
          <div class="form-group col-md-10">
            <label for="link">Lien vers les données</label>
            <p>Ce bout de lien sert à faire la relation entre la plateforme et le service web. (Ex: "&db=budget&table=bp_2014_fonction&format=json")</p>
            <input type="text" class="form-control" name="link" required>
          </div>
          <div class="form-group col-md-6">
            <label for="link">Titre des colonnes (dictionnaire)</label>
            <p>Lien vers le dictionnaire</p>
            <input type="text" class="form-control col-md-4" name="link_dictX" required>
            <p>Valeur initianle qu'on souhaite remplacer</p>
            <input type="text" class="form-control col-md-4" name="initValue_dictX" required>
            <p>Nouvelle valeur qui remplacera la valeur initiale</p>
            <input type="text" class="form-control col-md-4" name="newValue_dictX" required>
          </div>
          <div class="form-group col-md-6">
            <label for="link">Toutes les colonnes (dictionnaire)</label>
            <p>Lien vers le dictionnaire</p>
            <input type="text" class="form-control col-md-3" name="link_dictY" required>
            <p>Valeur de la colonne</p>
            <input type="text" class="form-control col-md-3" name="value_dictY" required>
            <p>Valeur initianle qu'on souhaite remplacer</p>
            <input type="text" class="form-control col-md-3" name="initValue_dictY" required>
            <p>Nouvelle valeur qui remplacera la valeur initiale</p>
            <input type="text" class="form-control col-md-3" name="newValue_dictY" required>
          </div>
          <div class="form-group col-md-10">
            <label for="inputDataType">Type d'affichage de données :</label>
            <p>Choisir un ou plusieurs type(s) d'affichage des données: </p>
            <div class="form-check">
              <label class="form-check-label"><input class="form-check-input" type="checkbox" name="datatype" onclick="dataTypeChoice()" id="type_graphe" value="NotHistorisedLocalisable">Graphe</label>
              <label class="form-check-label"><input class="form-check-input" type="checkbox" name="datatype" onclick="dataTypeChoice()" id="type_table" value="HistorisedNotLocalisable">Tableau</label>
              <label class="form-check-label"><input class="form-check-input" type="checkbox" name="datatype" onclick="dataTypeChoice()" id="type_map" value="NotHistorisedNotLocalisable">Carte</label>
              <!-- <label class="form-check-label"><input class="form-check-input" type="checkbox" name="datatype" onclick="dataTypeChoice()" id="type_timeline" value="NotHistorisedNotLocalisable">Timeline</label> -->

            </div>
          </div>
        </div>
        <div id ="theGraph" class="form-row" style="display:none">
          <div class="form-group col-md-10">
            <hr>
            <h3>Détails du graphe</h3>
            <p>Un graphe peut-être représenté sous plusieurs formes. Veuillez choisir le type de réprésentation :</p>
            <label for="inputGraphType">Type de graphe : </label>
            <div class="form-check">
              <label class="form-check-input"><input type="checkbox" name="possibleGraphs[]" value="pie" checked>Camembert</label>
              <label class="form-check-input"><input type="checkbox" name="possibleGraphs[]" value="bar">Barres</label>
              <label class="form-check-input"><input type="checkbox" name="possibleGraphs[]" value="line">Ligne</label>
              <label class="form-check-input"><input type="checkbox" name="possibleGraphs[]" value="horizontalBar">Barres horizontales</label>
            </div>
          </div>
          <div class="form-group col-md-8">
            <label for="inputGraphDescription">Description du graphe</label>
            <p>Description des données affichées dans le graphe</p>
            <input type="text" class="form-control" name="dataComposition_excludeLines" required>
          </div>
          <div class="form-group col-md-6">
            <label for="inputGraphLibelle">Axe des abcisses</label>
            <p>Pour un graphe avec des axes, il faut préciser les données qui seront sur l'axe des abcisses.</p>
            <h6>Ex: pour le jeu de données Parking : dp_libelle</h6>
            <input type="text" class="form-control" name="dataComposition_title" required>
          </div>
          <div class="form-group col-md-6">
            <label for="inputGraphLibelleName">Nom de l'axe des abcisses</label>
            <p>Le nom de l'axe des abcisses qui sera visible sur le graphe.</p>
            <h6>Ex: pour le jeu de données Parking : Parking</h6>
            <input type="text" class="form-control" name="dataComposition_x_axis" required>
          </div>
          <div class="form-group col-md-6">
            <label for="inputGraphTitle">Axe des ordonnées</label>
            <p>Pour un graphe avec des axes, il faut préciser les données qui seront sur l'axe des ordonnées.</p>
            <h6>Ex: pour le jeu de données Parking : dp_place_disponible</h6>
            <input type="text" class="form-control" name="dataComposition_value" required>
          </div>
          <div class="form-group col-md-6">
            <label for="inputGraphTitle">Nom de l'axe des ordonnées</label>
            <p>Le nom de l'axe des ordonnées.</p>
            <h6>Ex: pour le jeu de données Parking : Nombre de places disponibles</h6>
            <input type="text" class="form-control" name="dataComposition_y_axis" required>
          </div>
        </div>

        <div id="theTable" class="form-row" style="display:none">
          <div class="form-group col-md-10">
            <hr>
            <h3>Détails du tableau</h3>
            <p>Dans un premier temps, veuillez lister toutes les colonnes à afficher ainsi que la valeur à afficher sur l'interface utilisateur.</p>
            <label for="inputTableTitle">Titre du tableau</label>
            <input type="text" class="form-control" name="table_dataComposition_title" required>
          </div>
          <div id="sm" class="form-group col-md-5">
            <label for="inputKeyList">Liste des mots clés</label>
            <br>
            <input autocomplete="off" class="input form-control col-md-5" id="key1" name="table_dataComposition_keys_list[]" type="text" placeholder="Mot clé" required/>
            <input autocomplete="off" class="input form-control col-md-5" id="value1" name="table_dataComposition_value_list[]" type="text" placeholder="Valeur" required/>
            <button id="b1" class="btn add-more" type="button" onclick="addInput()">+</button>
          </div>
        </div>

        <div id="theMap" class="form-row" style="display:none">
          <div class="form-group col-md-10">
            <hr>
            <h3>Détails de la carte</h3>
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapTitle">Titre de la carte</label>
            <input type="text" class="form-control" name="map_name" required>
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapDescription">Description de la carte</label>
            <input type="text" class="form-control" name="map_description_popup" required>
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapX">Coordonnées de longitude</label>
            <input type="text" class="form-control" name="map_x" required>
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapY">Coordonnées de latitude</label>
            <input type="text" class="form-control" name="map_y" required>
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapNominateur">Donnée précise</label>
            <h6>Ex: pour le jeu de données Parking, il faut mettre le champs des places libres "dp_place_disponible"</h6>
            <input type="text" class="form-control" name="map_nominateur" required>
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapDenominateur">Données générales</label>
            <h6>Ex: pour le jeu de données Parking, il faut mettre le champs du nombre de toutes les places "dp_nb_places"</h6>
            <input type="text" class="form-control" name="map_denominateur" required>
          </div>
        </div>


        <div class="form-group row">
          <div class="col-sm-10">
            <button type="submit" class="btn btn-primary">Valider</button>
          </div>
        </div>

      </form>
    </div>
  </body>

  <?php include '../footer/footer.php'; ?>
  <script type="text/javascript" src="back_office.js"></script>

</html>
