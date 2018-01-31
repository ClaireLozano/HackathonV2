<!DOCTYPE html>
<html>
	
	<?php include '../header/header.php'; ?>
	
	<body>

		<div id="welcome" class="box-wrapper-inner">
			<div class="panel panel-default">
		        <div class="panel-body">
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
                <div id='box0' class="panel panel-default box">
                    <div class="panel-heading">
                        <h4 class="panel-title pull-left"></h4>
                        <button class="btn btn-default label label-warning pull-right" data-toggle="modal" data-target="#example">Un problème ?</button>

                        <div class="modal fade" tabindex="-1" role="dialog" id="example">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                        <h4 class="modal-title">Modal title</h4>
                                    </div>
                                    <div class="modal-body">
                                        <div class="checkbox">
                                            <label class="labelModal"> <input class="check_list" name="check_list[]" type="checkbox">Les données vous semble incorrecte ...</label>
                                        </div>
                                        <div class="checkbox"> 
                                            <label class="labelModal"> <input class="check_list" name="check_list[]" type="checkbox">La visualisation ne vous convient pas ...</label>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="submit" class="btn btn-default" data-dismiss="modal">Envoyer</button>
                                    </div>
                                </div><!-- /.modal-content -->
                            </div><!-- /.modal-dialog -->
                        </div><!-- /.modal -->

                        <div class="clearfix"></div>
                    </div>

                    <div class="panel-body form-group panelBody">
                        <a id="seeMoreBox0"> <!-- Mettre les visualisations ici--></a>
                    </div>
                    <a id="seeMore0" style="float:right" class="glyphicon glyphicon-zoom-in btn btn-default bottomButton" aria-hidden="true"></a>
                    <a id="info0" style="float:right" class="glyphicon glyphicon-info-sign btn btn-default bottomButton" aria-hidden="true"></a>
                </div>

                <!-- Deusième box --> 
                <div id='box2' class="panel panel-default box">
                    <div class="panel-heading">
                        <h4 class="panel-title pull-left"></h4>
                        <button class="btn btn-default label label-warning pull-right" data-toggle="modal" data-target="#example">un problème ?</button>
                        
                        <div class="modal fade" tabindex="-1" role="dialog" id="example">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                        <h4 class="modal-title">Modal title</h4>
                                    </div>
                                    <div class="modal-body">
                                        <div class="checkbox">
                                            <label class="labelModal"> <input class="check_list" name="check_list[]" type="checkbox">Les données vous semble incorrecte ...</label>
                                        </div>
                                        <div class="checkbox"> 
                                            <label class="labelModal"> <input class="check_list" name="check_list[]" type="checkbox">La visualisation ne vous convient pas ...</label>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="submit" class="btn btn-default" data-dismiss="modal">Envoyer</button>
                                    </div>
                                </div><!-- /.modal-content -->
                            </div><!-- /.modal-dialog -->
                        </div><!-- /.modal -->
                        
                        <div class="clearfix"></div>
                    </div>
                    <div class="panel-body form-group panelBody">
                        <a id="seeMoreBox1"> <!-- Mettre les visualisations ici--></a>
                    </div>
                    <a id="seeMore1" style="float:right" class="glyphicon glyphicon-zoom-in btn btn-default bottomButton" aria-hidden="true"></a>
                    <a id="info1" style="float:right" class="glyphicon glyphicon-info-sign btn btn-default bottomButton" aria-hidden="true"></a>
                </div>
            </div>

	</body>

	<?php include '../footer/footer.php'; ?>

</html>


