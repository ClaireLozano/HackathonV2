<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  </head>
	<body>

    <h2>Back office</h2>
    <p>Création de métadonnes pour les jeux de données </p>
      <form action="postdata.php" method="post">

        <div class="form-row">
          <hr>
          <h3>Détails jeu de données</h3>
          <div class="form-group col-md-10">
            <label for="inputLink">Nom du fichier métadonnées</label>
            <h6>Ex: "parking", "insee" etc </h6>
            <input type="text" class="form-control" name="fileName">
          </div>
          <div class="form-group col-md-10">
            <label for="inputDataType">Type de données :</label>
            <div class="form-check">
              <label class="form-check-label"><input class="form-check-input" type="radio" name="datatype" value="NotHistorisedLocalisable">Non-historisable et localisable</label>
              <label class="form-check-label"><input class="form-check-input" type="radio" name="datatype" value="HistorisedNotLocalisable">Historisable et non-localisable</label>
              <label class="form-check-label"><input class="form-check-input" type="radio" name="datatype" value="HistorisedLocalisable">Historisable et localisable</label>
              <label class="form-check-label"><input class="form-check-input" type="radio" name="datatype" value="NotHistorisedNotLocalisable">Non-historisable et non-localisable</label>
            </div>
          </div>
          <div class="form-group col-md-10">
            <label for="inputLink">Lien vers les données</label>
            <input type="text" class="form-control" name="link">
          </div>
        </div>

        <div class="form-group col-md-10">
          <hr>
          <h3>Détails du graphe</h3>
          <label for="inputGraphType">Type de graphe : </label>
          <div class="form-check">
            <label class="form-check-input"><input type="checkbox" name="possibleGraphs[]" value="pie">Camembert</label>
            <label class="form-check-input"><input type="checkbox" name="possibleGraphs[]" value="bar">Barres</label>
            <label class="form-check-input"><input type="checkbox" name="possibleGraphs[]" value="line">Ligne</label>
            <label class="form-check-input"><input type="checkbox" name="possibleGraphs[]" value="horizontalBar">Barres horizontales</label>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-3">
            <label for="inputGraphTitle">Titre du graphe</label>
            <input type="text" class="form-control" name="dataComposition_title">
          </div>
          <div class="form-group col-md-3">
            <label for="inputGraphDescription">Description du graphe</label>
            <input type="text" class="form-control" name="dataComposition_description">
          </div>
          <div class="form-group col-md-3">
            <label for="inputGraphLibelle">Nom du libelle de données</label>
            <input type="text" class="form-control" name="dataComposition_selectList">
          </div>
          <div class="form-group col-md-3">
            <label for="inputGraphTitle">Nom du champ de données</label>
            <input type="text" class="form-control" name="dataComposition_onlyOneElement">
          </div>
        </div>
        <div class="form-group col-md-10">
          <hr>
          <h3>Détails du tableau</h3>
            <label for="inputTableTitle">Titre du tableau</label>
            <input type="text" class="form-control" name="table_dataComposition_title">
        </div>
        <div class="form-row">
          <div id="keyListInput" class="form-group col-md-10">
            <label for="inputKeyList">Liste des mots clés</label>
            <input type="text" class="form-control" name="table_dataComposition_keys_list[]">
          </div>
          <div id="keyListInput" class="form-group col-md-3">
            <input type="button" value="Ajouter un mot clé" onclick="addInput()">
          </div>

        </div>

        <div class="form-group row">
          <div class="col-sm-10">
            <button type="submit" class="btn btn-primary">Valider</button>
          </div>
        </div>

      </form>
	</body>
  <script type="text/javascript" src="back_office.js"></script>
</html>
