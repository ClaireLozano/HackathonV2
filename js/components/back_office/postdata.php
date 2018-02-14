<h3>Métadonnées </h3>
<p>Ceci est un back-office qui vous permet de créer des métadonnées</p>

<?php

//Afficher les données
//echo $_POST['datatype'];

$postArray = array(
  "datatype" => $_POST['datatype'],
  "link" => $_POST['link'],
  "graph" => array(
        "possibleGraphs" => $_POST['possibleGraphs'],
        "dataComposition" => array(
          "dataComposition_title" =>$_POST['dataComposition_title'],
          "dataComposition_description" =>$_POST['dataComposition_description'],
          "dataComposition_selectList" =>$_POST['dataComposition_selectList'],
          "dataComposition_onlyOneElement" =>$_POST['dataComposition_onlyOneElement']
        )
      )
);

$json = json_encode( $postArray );
// foreach($_POST['possibleGraphs'] as $valeur)
// {
//    echo "La checkbox $valeur a été cochée<br>";
// }

// make sure there were no problems
//if( json_last_error() != JSON_ERROR_NONE ){
//exit;  // do your error handling here instead of exiting
// }

//$file = 'output.json';
//$current = file_get_contents($file);

echo $json;

// echo $_POST['possibleGraphs'];

//echo $_POST['dataComposition'];

//file_put_contents( $file, $json);

$fp = fopen('mdfile.json', 'w');
fwrite($fp, $json);
fclose($fp);


?>

<p>Pour changer les données, <a href="back_office.php">cliquez ici</a> pour revenir à la page du formulaire.</p>
