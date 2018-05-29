<!DOCTYPE html>
<html>

	<head>
	    <title>Hackathon</title>
	    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	    <script type="text/javascript" src="../util.js"></script>

	    <!-- Styles -->
	    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	    <link rel="stylesheet" href="https://openlayers.org/en/v4.6.4/css/ol.css" type="text/css">
	    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.16/css/dataTables.bootstrap.min.css">
	    <link rel="stylesheet" type="text/css" href="../../../style/style.css">

	    <!-- The line below is only needed for old environments like Internet Explorer and Android 4.x -->
	    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>

	    <!-- Open Layers -->
	    <script src="https://openlayers.org/en/v4.6.4/build/ol.js"></script>
	    <script src="https://openlayers.org/en/v4.6.4/examples/resources/mapbox-streets-v6-style.js"></script>
	    <script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.4.4/proj4.js"></script>

	    <!-- Table -->
		  <script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
	    <script src="https://cdn.datatables.net/1.10.16/js/dataTables.bootstrap.min.js"></script>

	    <!-- D3js -->
	    <script src="http://d3js.org/d3.v3.min.js"></script>
	    <script type="text/javascript" src="../visualisation/chart/d3.legend.js"></script>


	    <!-- Map -->
	    <?php
	      header('Access-Control-Allow-Origin: *');
	      header("Access-Control-Allow-Credentials: true");
	      header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
	      header('Access-Control-Max-Age: 1000');
	      header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
	    ?>
	</head>

	<body>
		<div class="modal"></div>

		<div id="content-page">
			<h1 id="title-page"></h1>
			<div class="panel panel-default box">
                <div class="panel-heading">
                    <p class="panel-title pull-left">Visualisation</p>

					<!-- Bouton "un probleme?" -->
                    <a href="mailto:opendata@ville-larochelle.fr?subject=Problème sur la plateforme&body=Les données vous semble incorrectes ? La visualisation vous convient pas ? Aidez-nous à améliorer la plateforme !"> <button class="btn btn-default label label-warning pull-right">Un problème ?</button> </a>
                    <div class="clearfix"></div>
                </div>


                <div class="panel-content-visualisation">

					<!-- PANEL -->
					<div class="container">
						<ul class="nav nav-tabs nav-visualisation">
							<li id="tab-nav-1" class="tab-nav"><a href="#tab-pane-1" data-toggle="tab"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Tableau</a></li>
							<li id="tab-nav-2" class="tab-nav"><a href="#tab-pane-2" data-toggle="tab"><span class="glyphicon glyphicon-stats" aria-hidden="true"></span> Graphe</a></li>
							<li id="tab-nav-6" class="tab-nav"><a href="#tab-pane-6" data-toggle="tab"><span class="glyphicon glyphicon-cloud" aria-hidden="true"></span> Word Cloud</a></li>
							<li id="tab-nav-3" class="tab-nav"><a href="#tab-pane-3" data-toggle="tab"><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span> Carte</a></li>
						</ul>
						<div class="tab-content">
							<p id="description-page"></p>
							<div class="tab-pane" id="tab-pane-1">
								<div class="option-panel">
									<div class="select-list-date"></div>
									<div class="select-list-date-compare"></div>
								</div>
								<div class="box-wrapper-inner">
									<div id='box1' class="box-visu"> <!-- TABLEAU --></div>
								</div>
							</div>
							<div class="tab-pane" id="tab-pane-2">
								<div class="option-panel">
									<div class="select-list-date"></div>
									<div class="select-list-date-compare"></div>
								</div>
								<div class="box-wrapper-inner">
									<div id='box2' class="box-visu"> <!-- GRAPH --></div>
								</div>
							</div>
							<div class="tab-pane" id="tab-pane-3">
								<div id='box3' class="box-visu">
									<!-- MAP -->
									<div id="popup"></div>
                                   <!--  <?php #include 'map/map.php'; ?> -->
								</div>
								<input id="button-icone-bus" class="button-icone" value="false" type="image" src="../../../images/icone_bus.png"/>
								<input id="button-icone-poste" class="button-icone" value="false" type="image" src="../../../images/icone_poste.png"/>
                                <input id="button-icone-yelo" class="button-icone" value="false" type="image" src="../../../images/icone_velo.png"/>
                                <input id="button-icone-piste-cyclable" class="button-icone" value="false" type="image" src="../../../images/icone_piste_cyclable.png"/>
							</div>
							<div class="tab-pane" id="tab-pane-6">
								<div class="option-panel">
									<div class="select-list-date"></div>
									<div class="select-list-date-compare"></div>
								</div>
								<div class="box-wrapper-inner">
									<div id='box6' class="box-visu"> <!-- CLOUD --></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div> <!-- END CONTENT PAGE -->

		<script type="text/javascript" src="map/bus.js"></script>
		<script type="text/javascript" src="map/velo.js"></script>
		<script type="text/javascript" src="map/piste_cyclable.js"></script>
		<script type="text/javascript" src="map/poste.js"></script>
		<script type="text/javascript" src="map/popup.js"></script>
		<script type="text/javascript" src="map/geoloc.js"></script>
		<script type="text/javascript" src="map/map.js"></script>

        <script type="text/javascript" src="chart/needed.js"></script>
		<script type="text/javascript" src="chart/bar.js"></script>
		<script type="text/javascript" src="chart/horizontalBar.js"></script>
		<script type="text/javascript" src="chart/pie.js"></script>
		<script type="text/javascript" src="chart/doughnut.js"></script>
        <script type="text/javascript" src="chart/chart.js"></script>
    	<script type="text/javascript" src="table/table.js"></script>

		<script type="text/javascript" src="cloud/drawCloud.js"></script>
		<script type="text/javascript" src="cloud/cloud.js"></script>

        <script type="text/javascript" src="visualisation.js"></script>
	</body>
</html>
