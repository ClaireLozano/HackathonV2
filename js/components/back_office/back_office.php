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
            <input type="text" class="form-control" name="title">
          </div>
          <div class="form-group col-md-10">
<!-- <<<<<<< HEAD
            <label for="inputDataType">Type de données :</label>
            <div class="form-check">
              <label class="form-check-label"><input class="form-check-input" type="radio" name="datatype" onclick="dataTypeChoice()" id="nH_L" value="NotHistorisedLocalisable">Non-historisable et localisable</label>
              <label class="form-check-label"><input class="form-check-input" type="radio" name="datatype" onclick="dataTypeChoice()" id="h_NL" value="HistorisedNotLocalisable">Historisable et non-localisable</label>
              <label class="form-check-label"><input class="form-check-input" type="radio" name="datatype" onclick="dataTypeChoice()" id="h_l" value="HistorisedLocalisable">Historisable et localisable</label>
              <label class="form-check-label"><input class="form-check-input" type="radio" name="datatype" onclick="dataTypeChoice()" id="nH_nL" value="NotHistorisedNotLocalisable">Non-historisable et non-localisable</label>
            </div>
======= -->
            <label for="inputDescriptionData">Lien vers les données</label>
            <p>Il est possible d'afficher une description de la données et ainsi guider les utilisateurs dans la lecture des données.</p>
            <textarea form="form" type="text" class="form-control" name="inputDescriptionData"></textarea>
<!-- >>>>>>> 707ae697509e223f38bcb8cf8e08a66a6044cf44 -->
          </div>
          <div class="form-group col-md-10">
            <label for="fileName">Nom du fichier métadonnées</label>
            <p>Le fichier doit prendre le nom de l'identifiant de la données (Ex: "menu_allergenes_accomp")</p>
            <input type="text" class="form-control" name="fileName">
          </div>
          <div class="form-group col-md-10">
            <label for="link">Lien vers les données</label>
            <p>Ce bout de lien sert à faire la relation entre la plateforme et le service web. (Ex: "&db=budget&table=bp_2014_fonction&format=json")</p>
            <input type="text" class="form-control" name="link">
          </div>
          <div class="form-group col-md-10">
            <label for="inputDataType">Type de données :</label>
            <p>Les données de l'open data peuvent être divers et varié. Elles peuvent être historisées, c'est-à-dire qu'une données a pu être enregistré à plusieurs moment dans le temps (Ex: bugdet 2015 et budget 2016) et elle peuvent être de type géographique et donc représentable sur une carte. On a finallement retenue 5 types de données qui sont : </p>
            <p>Todo : mettre une select list à la place (?)</p>
            <div class="form-check">
              <label class="form-check-label"><input class="form-check-input" type="radio" name="datatype" onclick="dataTypeChoice()" id="nH_L" value="NotHistorisedLocalisable">Non-historisable et localisable</label>
              <label class="form-check-label"><input class="form-check-input" type="radio" name="datatype" onclick="dataTypeChoice()" id="h_NL" value="HistorisedNotLocalisable">Historisable et non-localisable</label>
              <label class="form-check-label"><input class="form-check-input" type="radio" name="datatype" onclick="dataTypeChoice()" id="h_l" value="HistorisedLocalisable">Historisable et localisable</label>
              <label class="form-check-label"><input class="form-check-input" type="radio" name="datatype" onclick="dataTypeChoice()" id="nH_nL" value="NotHistorisedNotLocalisable">Non-historisable et non-localisable</label>
              <label class="form-check-label"><input class="form-check-input" type="radio" name="datatype" onclick="dataTypeChoice()" id="loc" value="Localisable">Localisable</label>
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
              <label class="form-check-input"><input type="checkbox" name="possibleGraphs[]" value="pie">Camembert</label>
              <label class="form-check-input"><input type="checkbox" name="possibleGraphs[]" value="bar">Barres</label>
              <label class="form-check-input"><input type="checkbox" name="possibleGraphs[]" value="line">Ligne</label>
              <label class="form-check-input"><input type="checkbox" name="possibleGraphs[]" value="horizontalBar">Barres horizontales</label>
            </div>
          </div>
          <div class="form-group col-md-4">
            <label for="inputGraphDescription">Description du graphe</label>
            <input type="text" class="form-control" name="dataComposition_excludeLines">
          </div>
          <div class="form-group col-md-4">
            <label for="inputGraphLibelle">Nom du libelle de données</label>
            <input type="text" class="form-control" name="dataComposition_selectList">
          </div>
          <div class="form-group col-md-4">
            <label for="inputGraphTitle">Nom du champ de données</label>
            <input type="text" class="form-control" name="dataComposition_onlyOneElement">
          </div>
        </div>

        <div id="theTable" class="form-row" style="display:none">
          <div class="form-group col-md-10">
            <hr>
            <h3>Détails du tableau</h3>
            <p>Dans un premier temps, veuillez lister toutes les colonnes à afficher ainsi que la valeur à afficher sur l'interface utilisateur.</p>
            <label for="inputTableTitle">Titre du tableau</label>
            <input type="text" class="form-control" name="table_dataComposition_title">
          </div>
          <div id="keyListInput" class="form-group col-md-6">
            <label for="inputKeyList">Liste des mots clés</label>
            <input type="text" class="form-control" name="table_dataComposition_keys_list[]">
          </div>
          <div id="valueListInput" class="form-group col-md-6">
            <label for="inputValueList">Valeur des mots clés</label>
            <input type="text" class="form-control" name="table_dataComposition_value_list[]">
          </div>
          <div id="keyListInput" class="form-group col-md-3">
            <input type="button" value="Ajouter un mot clé" onclick="addInput()">
          </div>
        </div>

        <div id="theMap" class="form-row" style="display:none">
          <div class="form-group col-md-10">
            <hr>
            <h3>Détails de la carte</h3>
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapTitle">Titre de la carte</label>
            <input type="text" class="form-control" name="map_name">
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapDescription">Description de la carte</label>
            <input type="text" class="form-control" name="map_description_popup">
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapX">Coordonnées de longitude</label>
            <input type="text" class="form-control" name="map_x">
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapY">Coordonnées de latitude</label>
            <input type="text" class="form-control" name="map_y">
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapNominateur">Donnée précise</label>
            <h6>Ex: pour le jeu de données Parking, il faut mettre le champs des places libres "dp_place_disponible"</h6>
            <input type="text" class="form-control" name="map_nominateur">
          </div>
          <div class="form-group col-md-6">
            <label for="inputMapDenominateur">Données générales</label>
            <h6>Ex: pour le jeu de données Parking, il faut mettre le champs du nombre de toutes les places "dp_nb_places"</h6>
            <input type="text" class="form-control" name="map_denominateur">
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
