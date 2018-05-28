
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
  "description" => $_POST['description']
);

// Dictionnaire X
$dictXArray = array(
      "link" => $_POST['link_dictX'],
      "initValue" => $_POST['initValue_dictX'],
      "newValue" => $_POST['newValue_dictX']
    );

// Dictionnaire Y
$dictYArray = array(
      "link" => $_POST['link_dictY'],
      "value" => $_POST['value_dictY'],
      "initValue" => $_POST['initValue_dictY'],
      "newValue" => $_POST['newValue_dictY']
    );

// Dictionnaire
if ($_POST['checkDict'] == 'add_dictionary'){
  $postArray['dictionnaireX'] = $dictXArray;
  $postArray['dictionnaireY'] = $dictYArray;
}


// Grahes :
$grapheArray = array(
      "possibleGraphs" => $_POST['possibleGraphs'],
      "panelPosion" => $_POST['panelPosion_graphe'],
      "dataComposition" => array(
        "excludeLines" => $_POST['dataComposition_excludeLines'],
        "title" => $_POST['dataComposition_title'],
        "value" => $_POST['dataComposition_value'],
        "y_axis" => $_POST['dataComposition_y_axis'],
        "x_axis" => $_POST['dataComposition_x_axis'],
        "unity_x_axis" => $_POST['dataComposition_unity_x_axis'],
        "unity_y_axis" => $_POST['dataComposition_unity_y_axis']
      )
    );

//Tableaux :
$tableauArray = array(
      "dataComposition" => array(
        "title" => $_POST['table_dataComposition_title'],
        "panelPosion" => $_POST['panelPosion_table'],
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
      "panelPosion" => $_POST['panelPosion_timeline'],
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
            "panelPosion" => $_POST['panelPosion_map'],
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
            "panelPosion" => $_POST['panelPosion_map'],
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


$json = json_encode($postArray, JSON_UNESCAPED_UNICODE);
echo $json;



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
// $fp = fopen('mdfile.json', 'w');

// // chemin dynamique :
//$fp = fopen($filepath, 'w');
//
// fwrite($fp, $json);
// fclose($fp);


//$full_path = '...'; // chemin système (local) vers le fichier
$file_name = basename($filepath);

ini_set('zlib.output_compression', 0);
$date = gmdate(DATE_RFC1123);

header('Pragma: public');
header('Cache-Control: must-revalidate, pre-check=0, post-check=0, max-age=0');

header('Content-Tranfer-Encoding: none');
header('Content-Length: '.filesize($filepath));
header('Content-MD5: '.base64_encode(md5_file($filepath)));
header('Content-Type: application/octetstream; name="'.$file_name.'"');
header('Content-Disposition: attachment; filename="'.$file_name.'"');

header('Date: '.$date);
header('Expires: '.gmdate(DATE_RFC1123, time()+1));
header('Last-Modified: '.gmdate(DATE_RFC1123, filemtime($filepath)));
// header('Location: back_office.php');
readfile($filepath);
// header('Location: back_office.php');
// Essayer d'enlever le exit
exit;


?>
<p>Les données sont stockées dans le fichier : <i><?php echo $file; ?></i> du dossier "metadata".</p>
<p>Créer un <a href="back_office.php">nouveau formulaire</a>.</p>
