<!DOCTYPE html>
<html>

	<?php include '../header/header.php'; ?>

	<body>
		<div class="modal"></div>
		<div id="content-page">

			<div id = "tooltip" class="hidden">
			<p><center><strong><span id="title">  </span></strong></center></p>
			<p>Valeur : <span id="value">  </span></p>

		</div>

			<h1 id="title-page"></h1>
			<div class="panel panel-default box">
                <div class="panel-heading">
                    <p class="panel-title pull-left">Visualisation</p>

					<!-- Bouton "un probleme?" -->
                    <a href="mailto:claire.lozano@live.fr?subject=Problème sur la plateforme&body=Les données vous semble incorrectes ? La visualisationne vous convient pas ? Aidez-nous à améliorer la plateforme !"> <button class="btn btn-default label label-warning pull-right"> Un problème ?</button> </a>
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
							<li id="tab-nav-4" class="tab-nav"><a href="#tab-pane-4" data-toggle="tab"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> Infos</a></li>
							<li id="tab-nav-5" class="tab-nav"><a href="#tab-pane-5" data-toggle="tab"><span class="glyphicon glyphicon-cloud-download" aria-hidden="true"></span> Télécharger</a></li>
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
							</div>
							<div class="tab-pane" id="tab-pane-4">
								<div id='box4' class="box-visu"> <!-- INFO --></div>
							</div>
							<div class="tab-pane" id="tab-pane-5">
								<div id='box5' class="box-visu"> <!-- TELECHARGEMENT --></div>
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



					<!-- PARTAGER -->

					<h2>Partager </h2>
					<p>Vous pouvez partager cette page sur facebook ainsi que twitter : </p>
			        <div id="rs">

			            <!-- FACEBOOK -->
			            <div id="fb-root" class="rs"></div>
			            <script>(
			                function(d, s, id) {
			                    var js, fjs = d.getElementsByTagName(s)[0];
			                    if (d.getElementById(id)) return;
			                    js = d.createElement(s); js.id = id;
			                    js.src = "//connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v2.9&appId=778292025574313";
			                    fjs.parentNode.insertBefore(js, fjs);
			                }(document, 'script', 'facebook-jssdk'));
			            </script>

			            <!-- TWITTER -->
			            <div class="rs">
			                <a href="https://twitter.com/share" class="twitter-share-button" data-size="large">Tweet</a>
			                <script>
			                    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
			                </script>
			            </div>

			              <!-- Your share button code -->
			              <div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-size="large" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Partager</a></div>
			        </div>



					<!-- COMMENTAIRES -->

					<h2>Commentaires </h2>
					<div class="post-footer">
						<ul class="comments-list"></ul>
						<div class="add-comment">
							<p class="title-comment">Nom</p>
							<input id="name-comment" class="form-control" placeholder="Ajouter un nom/pseudo..." type="text">
							<p class="title-comment">Message</p>
							<textarea id="text-comment" rows="5" class="form-control" placeholder="Ajouter un commentaire..."></textarea>
							<button id="submit-comment" type="button" class="btn btn-primary active">Envoyer</button>
						</div>
					</div>
				</div>
			</div>
		</div> <!-- END CONTENT PAGE -->

		<script type="text/javascript" src="map/bus.js"></script>
		<script type="text/javascript" src="map/velo.js"></script>
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

        <script type="text/javascript" src="../controller.js"></script>
        <script type="text/javascript" src="visualisation.js"></script>
	</body>

	<?php include '../footer/footer.php'; ?>



</html>
