<!DOCTYPE html>
<html>

	<?php include '../header/header.php'; ?>
    <link rel="stylesheet" type="text/css" href="../../../style/style-visualisation.css">


	<body>

		<div id="content-page">

			<h1> Nom de le donnée </h1>
			
			<div class="panel panel-default box">
                <div class="panel-heading">
                    <p class="panel-title">Visualisation</p>
                </div>

				
                <div class="panel-content-visualisation">

					<!-- PANEL -->

					<div class="container"> 
						<ul class="nav nav-tabs">
							<li id="tab-nav-1"><a href="#tab-pane-1" data-toggle="tab">Graphe</a></li>
							<li id="tab-nav-2"><a href="#tab-pane-2" data-toggle="tab">Tableau</a></li>
							<li id="tab-nav-3"><a href="#tab-pane-3" data-toggle="tab">Carte</a></li>
							<li id="tab-nav-4"><a href="#tab-pane-4" data-toggle="tab">Infos</a></li>
							<li id="tab-nav-5"><a href="#tab-pane-5" data-toggle="tab">Télécharger</a></li>
						</ul>

						<div class="tab-content">
							<div class="tab-pane" id="tab-pane-1">
								<div id='box1' class="box-visu"> <!-- TABLEAU --></div>
							</div>
							<div class="tab-pane" id="tab-pane-2">
								<div id='box2' class="box-visu"> <!-- CHART --></div>
							</div>
							<div class="tab-pane" id="tab-pane-3">
								<div id='box3' class="box-visu"> <!-- MAP --></div>
							</div>
							<div class="tab-pane" id="tab-pane-4">
								<div id='box4' class="box-visu"> <!-- INFO --></div>
							</div>
							<div class="tab-pane" id="tab-pane-5">
								<div id='box5' class="box-visu"> <!-- TELECHARGEMENT --></div>
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
						<ul class="comments-list">
							<li class="comment">
								<div class="comment-body">
									<div class="comment-heading">
										<h4 class="user">Annonyme</h4>
										<h5 class="time">Il y a 8 minutes</h5>
									</div>
									<p>Commentaire numéro 1</p>
								</div>
							</li>
							<li class="comment">
								<div class="comment-body">
									<div class="comment-heading">
										<h4 class="user">Open Data La Rochelle</h4>
										<h5 class="time">Il y a 3 minutes</h5>
									</div>
									<p>Commentaire numéro 2</p>
								</div>
							</li>
							<li class="comment">
								<div class="comment-body">
									<div class="comment-heading">
										<h4 class="user">Annonyme</h4>
										<h5 class="time">Il y a 2 minutes</h5>
									</div>
									<p>Commentaire numéro 3</p>
								</div>
							</li>
						</ul>
						<div class="input-group"> 
							<input class="form-control" placeholder="Add a comment" type="text">
							<span class="input-group-addon">
								<a href="#"><i class="glyphicon glyphicon-pencil"></i></a>  
							</span>
						</div>
					</div>
				</div>
			</div>
		</div> <!-- END CONTENT PAGE -->

	</body>

	<?php include '../footer/footer.php'; ?>
	<script type="text/javascript" src="visualisation.js"></script>

</html>
