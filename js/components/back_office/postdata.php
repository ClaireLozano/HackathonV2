<h3>Métadonnées </h3>
<p>Ceci est un back-office qui vous permet de créer des métadonnées</p>

<?php

//Afficher les données
//echo $_POST['datatype'];

$postArray = array(
  "datatype" => $_POST['datatype'],
  "link" => $_POST['link'],
  "title" => $_POST['title'],
  "description" => $_POST['description'],
  "dictionnaireX" => array(
        "link" => $_POST['link_dictX'],
        "initValue" => $_POST['initValue_dictX'],
        "newValue" => $_POST['newValue_dictX']
      ),
  "dictionnaireY" => array(
        "link" => $_POST['link_dictY'],
        "value" => $_POST['value_dictY'],
        "initValue" => $_POST['initValue_dictY'],
        "newValue" => $_POST['newValue_dictY']
      ),
  "graph" => array(
        "possibleGraphs" => $_POST['possibleGraphs'],
        "dataComposition" => array(
          "excludeLines" => $_POST['dataComposition_excludeLines'],
          "title" => $_POST['dataComposition_title'],
          "value" => $_POST['dataComposition_value'],
          "y_axis" => $_POST['dataComposition_y_axis'],
          "x_axis" => $_POST['dataComposition_x_axis']
        )
      ),
  "table" => array(
        "dataComposition" => array(
          "title" => $_POST['table_dataComposition_title'],
          "keys_list" => $_POST['table_dataComposition_keys_list'],
          "value_list" => $_POST['table_dataComposition_value_list']
        )
      ),
  "map" => array(
        "x" => $_POST['map_x'],
        "y" => $_POST['map_y'],
        "name" => $_POST['map_name'],
        "nominateur" => $_POST['map_nominateur'],
        "denominateur" => $_POST['map_denominateur'],
        "description_popup" => $_POST['map_description_popup']
  )
);

$json = json_encode( $postArray );
// foreach($_POST['datatype'] as $valeur)
// {
//    echo "La checkbox $valeur a été cochée<br>";
// }

// make sure there were no problems
//if( json_last_error() != JSON_ERROR_NONE ){
//exit;  // do your error handling here instead of exiting
// }

//$file = 'output.json';
//$current = file_get_contents($file);

// Nom du fichier dynamique:
// $file = $_POST['fileName'];
// $file.= ".json";
// echo $file;


echo $json;

// echo $_POST['possibleGraphs'];


//file_put_contents( $file, $json);
//
$fp = fopen('mdfile.json', 'w');
fwrite($fp, $json);
fclose($fp);


?>

<p>Pour changer les données, <a href="back_office.php">cliquez ici</a> pour revenir à la page du formulaire.</p>
