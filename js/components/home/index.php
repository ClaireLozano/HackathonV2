<!DOCTYPE html>
<html>

	<?php include '../header/header.php'; ?>

	<body>

		<div id="welcome" class="box-wrapper-inner">
			<div class="panel panel-default">
		        <div id="panel-welcome">
		            <h3>Bienvenue sur Opendata La Rochelle </h3>
		            </br>
		            <p>le site de la démarche Open Data de la Ville de La Rochelle. Vous trouverez ici l'ensemble des jeux de données publiés par les services de la Ville et ses partenaires sous plusieurs forme de visualisation : cartographique, graphique, tableau ainsi que line temporelle !</p>
		            <p>Voici quelques visualisations aléatoires générées pour vous !</p>
		            </br>
		        </div>
		    </div>
		</div>

		<!-- Première box -->
		<div class="box-wrapper-inner">
            <div class="panel panel-default box">
                <div class="panel-heading">
                    <p id="panel-title-box0" class="panel-title pull-left"></p>
                    <a href="mailto:claire.lozano@live.fr?subject=Problème sur la plateforme&body=Les données vous semble incorrectes ? La visualisationne vous convient pas ? Aidez-nous à améliorer la plateforme !">
                        <button class="btn btn-default label label-warning pull-right"> Un problème ?</button>
                    </a>
                    <div class="clearfix"></div>
                </div>

                <div id='box0' class="panel-body form-group panelBody">
                    <div id="popup0"></div>
                    <a id="seeMoreBox0"> <!-- Mettre les visualisations ici--></a>
                </div>
                <a id="seeMore0" style="float:right" class="glyphicon glyphicon-zoom-in btn btn-default bottomButton" aria-hidden="true"></a>
                <a id="info0" style="float:right" class="glyphicon glyphicon-info-sign btn btn-default bottomButton" aria-hidden="true"></a>
            </div>

            <!-- Deuxième box -->
            <div class="panel panel-default box">
                <div class="panel-heading">
                    <p id="panel-title-box1" class="panel-title pull-left"></p>
                    <a href="mailto:claire.lozano@live.fr?subject=Problème sur la plateforme&body=Les données vous semble incorrectes ? La visualisationne vous convient pas ? Aidez-nous à améliorer la plateforme !">
                        <button class="btn btn-default label label-warning pull-right"> Un problème ?</button>
                    </a>

                    <div class="clearfix"></div>
                </div>
                <div id='box1' class="panel-body form-group panelBody">
                    <div id="popup1"></div>
                    <a id="seeMoreBox1"> <!-- Mettre les visualisations ici--></a>
                </div>
                <a id="seeMore1" style="float:right" class="glyphicon glyphicon-zoom-in btn btn-default bottomButton" aria-hidden="true"></a>
                <a id="info1" style="float:right" class="glyphicon glyphicon-info-sign btn btn-default bottomButton" aria-hidden="true"></a>
            </div>
        </div>

        <div class="box-wrapper-inner">
            <div class="panel panel-default box">
                <div class="panel-heading">
                    <p id="panel-title-box2" class="panel-title pull-left"></p>
                    <a href="mailto:claire.lozano@live.fr?subject=Problème sur la plateforme&body=Les données vous semble incorrectes ? La visualisationne vous convient pas ? Aidez-nous à améliorer la plateforme !">
                        <button class="btn btn-default label label-warning pull-right"> Un problème ?</button>
                    </a>

                    <div class="clearfix"></div>
                </div>

                <div id='box2' class="panel-body form-group panelBody">
                    <div id="popup2"></div>
                    <a id="seeMoreBox2"> <!-- Mettre les visualisations ici--></a>
                </div>
                <a id="seeMore2" style="float:right" class="glyphicon glyphicon-zoom-in btn btn-default bottomButton" aria-hidden="true"></a>
                <a id="info2" style="float:right" class="glyphicon glyphicon-info-sign btn btn-default bottomButton" aria-hidden="true"></a>
            </div>

            <!-- Deuxième box -->
            <div class="panel panel-default box">
                <div class="panel-heading">
                    <p id="panel-title-box3" class="panel-title pull-left"></p>
                    <a href="mailto:claire.lozano@live.fr?subject=Problème sur la plateforme&body=Les données vous semble incorrectes ? La visualisationne vous convient pas ? Aidez-nous à améliorer la plateforme !">
                        <button class="btn btn-default label label-warning pull-right"> Un problème ?</button>
                    </a>

                    <div class="clearfix"></div>
                </div>
                <div id='box3' class="panel-body form-group panelBody">
                    <div id="popup3"></div>
                    <a id="seeMoreBox3"> <!-- Mettre les visualisations ici--></a>
                </div>
                <a id="seeMore3" style="float:right" class="glyphicon glyphicon-zoom-in btn btn-default bottomButton" aria-hidden="true"></a>
                <a id="info3" style="float:right" class="glyphicon glyphicon-info-sign btn btn-default bottomButton" aria-hidden="true"></a>
            </div>
        </div>

	</body>

	<?php include '../footer/footer.php'; ?>
    <script type="text/javascript" src="../visualisation/map/popup.js"></script>
    <script type="text/javascript" src="../visualisation/map/bus.js"></script>
    <script type="text/javascript" src="../visualisation/map/poste.js"></script>
    <script type="text/javascript" src="../visualisation/map/geoloc.js"></script>
    <script type="text/javascript" src="../visualisation/map/map.js"></script>
		<script type="text/javascript" src="../visualisation/chart/bar.js"></script>
		<script type="text/javascript" src="../visualisation/chart/horizontalBar.js"></script>
		<script type="text/javascript" src="../visualisation/chart/pie.js"></script>
		<script type="text/javascript" src="../visualisation/chart/doughnut.js"></script>
		<script type="text/javascript" src="../visualisation/chart/chart.js"></script>
		<script type="text/javascript" src="../visualisation/table/table.js"></script>
    <script type="text/javascript" src="../controller.js"></script>
    <script type="text/javascript" src="../util.js"></script>
    <script type="text/javascript" src="index.js"></script>

</html>
