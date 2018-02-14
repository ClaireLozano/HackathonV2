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
    <!-- <form action="postdata.php" method="post"> -->
      <!-- <table class="postarea" id="postarea">
          <tbody>
            <tr><td class="postblock">Type de données:</td><td><input type="text" name="datatype"></td></tr>
            <tr><td class="postblock">Lien vers données:</td><td><input type="text" name="link"></td></tr>
            <tr><td class="postblock">Title:</td><td><input type="text" name="title"></input> </td> </tr>
            <tr><td class="assetblock">Type de graphe:</td>
                <td><input type="checkbox" name="possibleGraphs[]" value="pie"></input>Camembert</td>
                <td><input type="checkbox" name="possibleGraphs[]" value="bar"></input>Barres</td>
                <td><input type="checkbox" name="possibleGraphs[]" disabled="true" value="line"></input>Ligne</td>
                <td><input type="checkbox" name="possibleGraphs[]" value="horizontalBar"></input>Barres horizontales</td>
            </tr>
            <tr><td class="assetblock">Données du graphe:</td>
              <td>Titre du graphe <input type="text" name="dataComposition_title"></input> </td>
              <td>Description du graphe <input type="text" name="dataComposition_description"></input> </td>
              <td>Nom du libelle de données <input type="text" name="dataComposition_selectList"></input> </td>
              <td>Nom du champ de données <input type="text" name="dataComposition_onlyOneElement"></input> </td>
            </tr> -->

<!-- <input type="checkbox" name="case" checked="checked" /> -->
<!--
        </tbody>
      </table>  -->

      <form action="postdata.php" method="post">
        <hr>
        <h3>Détails jeu de données</h3>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputDataType">Type de données</label>
            <input type="text" class="form-control" name="datatype">
          </div>
          <div class="form-group col-md-6">
            <label for="inputLink">Lien vers les données</label>
            <input type="text" class="form-control" name="link">
          </div>
        </div>
        <hr>
        <h3>Détails du graphe</h3>
        <div class="form-group col-md-10">
          <label for="inputGraphType">Type de graphe : </label>
          <label class="checkbox-inline"><input type="checkbox" name="possibleGraphs[]" value="pie">Camembert</label>
          <label class="checkbox-inline"><input type="checkbox" name="possibleGraphs[]" value="bar">Barres</label>
          <label class="checkbox-inline"><input type="checkbox" name="possibleGraphs[]" value="line" disabled>Ligne</label>
          <label class="checkbox-inline"><input type="checkbox" name="possibleGraphs[]" value="horizontalBar">Barres horizontales</label>
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
        <br>
        <button type="submit" class="btn btn-primary">Sign in</button>
      </form>

    <!-- <input type="submit" value="Valider" /> -->
<!-- </form> -->

	</body>

</html>
