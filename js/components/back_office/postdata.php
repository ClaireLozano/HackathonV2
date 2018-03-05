<h3>Métadonnées </h3>
<p>Ceci est un back-office qui vous permet de créer des métadonnées</p>

<?php

//Afficher les données
$datatypeArray =  $_POST['datatype'];
$tableau = 'type_table';
$carte = 'type_map';
$graphe = 'type_graphe';
$timeline = 'type_timeline';





$years = $_POST['timeline_dataComposition_year_list'];
$years_value = $_POST['timeline_dataComposition_year_value_list'];

$postArray = array(

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
      )
);




Grahes :
$grapheArray = array(
      "possibleGraphs" => $_POST['possibleGraphs'],
      "dataComposition" => array(
        "excludeLines" => $_POST['dataComposition_excludeLines'],
        "title" => $_POST['dataComposition_title'],
        "value" => $_POST['dataComposition_value'],
        "y_axis" => $_POST['dataComposition_y_axis'],
        "x_axis" => $_POST['dataComposition_x_axis']
      )
    );

//Tableaux :
$tableauArray = array(
      "dataComposition" => array(
        "title" => $_POST['table_dataComposition_title'],
        "keys_list" => $_POST['table_dataComposition_keys_list'],
        "value_list" => $_POST['table_dataComposition_value_list']
      )
    );

//Cartes :
// $carteArray = array(
//       "x" => $_POST['map_x'],
//       "y" => $_POST['map_y'],
//       "name" => $_POST['map_name'],
//       "nominateur" => $_POST['map_nominateur'],
//       "denominateur" => $_POST['map_denominateur'],
//       "description_popup" => $_POST['map_description_popup'],
//       "kml" => $_POST['map_kml_file'],
//       "value" => $_POST['map_kml_value'],
//       "name" => $_POST['map_kml_file']
// );

// Timeline :
$timelineArray = array(
      "actualDate" => $_POST['actualDate']);




// Type d'affichage des données :
foreach ($datatypeArray as $key => $value) {
  if ($value == $graphe) {
    $postArray['graph'] = $grapheArray;
  }
  if ($value == $tableau) {
    $postArray['table'] = $tableauArray;
  }
  if ($value == $carte) {

    if ($_POST['maptype'] == 'newmap') {
      // Nouvelle carte :
      $carteArray = array(
            "x" => $_POST['map_x'],
            "y" => $_POST['map_y'],
            "name" => $_POST['map_name'],
            "nominateur" => $_POST['map_nominateur'],
            "denominateur" => $_POST['map_denominateur'],
            "description_popup" => $_POST['map_description_popup']
      );

      $postArray['map'] = $carteArray;
    } else if ($_POST['maptype'] == 'kmlfile'){
      // Carte depuis fichier kml :
      $carteArray = array(
            "kml" => $_POST['map_kml_file'],
            "value" => $_POST['map_kml_value'],
            "name" => $_POST['map_kml_file']
      );

      $postArray['map'] = $carteArray;
    }

  }
  if ($value == $timeline) {
    $postArray['timeline'] = $timelineArray;
    $dates_timeline = array();
    $dates_timelineArray = $postArray['timeline'];
    foreach( $years as $key=>$value)
    {
      $dates_timeline[$years[$key]] =  $years_value[$key];

    }
    // Add the dates for the timeline :
    $postArray['timeline']['dates'] = $dates_timeline;

  }

}



$json = json_encode( $postArray );
echo $json;



// make sure there were no problems
//if( json_last_error() != JSON_ERROR_NONE ){
//exit;  // do your error handling here instead of exiting
// }

//$file = 'output.json';
//$current = file_get_contents($file);

// Nom du fichier dynamique:
$file = $_POST['fileName'];
$file.= ".json";

// Dossier metadata
$path = "../../metadata";
$path = realpath ($path);

//Fichier dans le dossier "metadata"
$filepath = $path . DIRECTORY_SEPARATOR . $file;


// chamin statique :
$fp = fopen('mdfile.json', 'w');

// chemin dynamique :
// $fp = fopen($filepath, 'w');

fwrite($fp, $json);
fclose($fp);


?>

<p>Pour changer les données, <a href="back_office.php">cliquez ici</a> pour revenir à la page du formulaire.</p>
