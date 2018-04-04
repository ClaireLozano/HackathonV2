<?php

    /**
    * Get data from open data la rochelle plateform
    * Solution temporaire
    *
    * @param  {String}      endUrl      End of the URL
    *
    */
    function getOpenData($endUrl){
        $url = 'https://opendata.larochelle.fr/webservice/?service=getData&key=g8ud8AhlECNZw78I' . $endUrl;
        // Pour utiliser le proxy de l'ULR
        //$proxy = 'wwwcache.univ-lr.fr:3128';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_PROXY, $proxy);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        //curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
        $dataToParse = curl_exec($ch);
        curl_close($ch);
        return json_decode($dataToParse, true);
    }

    // Get arguments
    $arguments = $_POST['arguments'];

    // Call function
    switch($_POST["functionname"]){
        case 'getOpenData':
            echo json_encode(getOpenData($arguments));
            break;
    }

?>
