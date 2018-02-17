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
        $proxy = 'wwwcache.univ-lr.fr:3128';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_PROXY, $proxy);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
        $dataToParse = curl_exec($ch);
        curl_close($ch);
        return json_decode($dataToParse, true);
    }

    function getActeNaissanceData($endUrl){
        $url = 'https://opendata.larochelle.fr/webservice/?service=getData&key=g8ud8AhlECNZw78I' . $endUrl;
        // Pour utiliser le proxy de l'ULR
        $proxy = 'wwwcache.univ-lr.fr:3128';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_PROXY, $proxy);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
        $dataToParse = curl_exec($ch);
        curl_close($ch);
        $obj = json_decode($dataToParse, true);
        
        $val_html = "<table id='my_table' class='table table-striped table-bordered' cellspacing='0' width='100%'><thead><th>Année</th><th>Mois</th><th>Prénom</th><th>Occurrence</th></thead><tfoot><th>Année</th><th>Mois</th><th>Prénom</th><th>Occurrence</th></tfoot><tbody>";
        foreach($obj['opendata']['answer']['data'] as $o){
            $val_html.= "<tr><td>".$o['an_evenement_annee']."</td><td>".$o['an_evenement_mois']."</td><td>".$o['an_enfant_premier_prenom']."</td><td>".$o['an_nombre']."</td></tr>";
        }
        $val_html.="</tbody></table>";
        
        return $val_html;
    }

    function getActeNaissanceWordCloudData($endUrl, $annee){
         
        $url = 'https://opendata.larochelle.fr/webservice/?service=getData&key=g8ud8AhlECNZw78I' . $endUrl;
        // Pour utiliser le proxy de l'ULR
        $proxy = 'wwwcache.univ-lr.fr:3128';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_PROXY, $proxy);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
        $dataToParse = curl_exec($ch);
        curl_close($ch);
        $obj = json_decode($dataToParse, true);
        $values = '';
        if($annee == "all")
        {
            foreach($obj['opendata']['answer']['data'] as $o){
                
                for ($i = 1; $i <= intval($o['an_nombre']); $i++) {
                    $values.= $o['an_enfant_premier_prenom'].',';
                }
                
            }
        }else{
            foreach($obj['opendata']['answer']['data'] as $o){
                if($annee == $o['an_evenement_annee'])
                {
                    for ($i = 1; $i <= intval($o['an_nombre']); $i++) {
                        $values.= $o['an_enfant_premier_prenom'].',';
                    }
                }
                
            }
        }
        
        return $values;
    }

    function getActeNaissanceWordSelect($endUrl){
         
        $url = 'https://opendata.larochelle.fr/webservice/?service=getData&key=g8ud8AhlECNZw78I' . $endUrl;
        // Pour utiliser le proxy de l'ULR
        $proxy = 'wwwcache.univ-lr.fr:3128';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_PROXY, $proxy);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
        $dataToParse = curl_exec($ch);
        curl_close($ch);
        $obj = json_decode($dataToParse, true);
        $values= array();
        $select = "";

        foreach($obj['opendata']['answer']['data'] as $o){
            $values[]= $o['an_evenement_annee'];  
        }
       
        $values = array_unique($values);
        $select = "<p class='select-list select-list-text'>Choisissez l'année : </p><select class='select-list select-list-select' onchange='update(this.value)'><option value='all'>all</option>";
        foreach ($values as $value) {
            $select .=  "<option value='".$value."'>".$value."</option>";
        }
        $select .= "</select>";
        
        return $select;
    }

    // Get arguments
    $arguments = $_POST['arguments'];

    // Call function
    switch($_POST["functionname"]){
        case 'getOpenData':
            echo json_encode(getOpenData($arguments));
            break;
        case 'getActeNaissanceData':
            echo getActeNaissanceData($arguments);
            break;
        case 'getActeNaissanceWordCloudData':
            $annee = $_POST['annee'];
            echo getActeNaissanceWordCloudData($arguments, $annee);
            break;
        case 'getActeNaissanceWordSelect':
            $annee = $_POST['annee'];
            echo getActeNaissanceWordSelect($arguments);
            break;
    }

?>