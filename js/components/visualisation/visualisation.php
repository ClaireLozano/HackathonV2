<!DOCTYPE html>
<html>

	<?php include '../header/header.php'; ?>

	<body>
		<!-- The side menu-->
		<div class="container">
			<div class="col-sm-2">
			    <nav class="nav-sidebar">
			    	<h4>Catégories</h4>
						<ul class="nav tabs">
				          <li class="active">
										<a href="#tab1" class="accordion-toggle" data-toggle="tab">Citoyenneté</a>
									</li>
				          <li class="">
										<a href="#tab2" class="accordion-toggle" data-toggle="tab">Déplacement</a>
									</li>
				          <li class="">
										<a href="#tab3" class="accordion-toggle" data-toggle="tab">Espace public</a>
									</li>
				          <li class="">
										<a href="#tab4" class="accordion-toggle" data-toggle="tab">Finance</a>
									</li>
						</ul>
				</nav>
			</div>

			<!-- tab content -->
			<div class="tab-content">

				<div class="tab-pane active text-style" id="tab1">
					<h2>Citoyenneté</h2>
		      <p>Cette catégorie contient deux type de données: les données INSEE et les données Archive.</p>
		      <hr>
					<div class="row">
					  <div class="col-sm-4">
					    <div class="card">
					      <div class="card-block">
					        <h3 class="card-title">INSEE</h3>
									<a href="#"><img src="http://placehold.it/350x250" class="img-rounded pull-left"></a>
					      </div>
					    </div>
					  </div>
					  <div class="col-sm-4">
					    <div class="card">
					      <div class="card-block">
					        <h3 class="card-title">Archives</h3>
									<a href="#"><img src="http://placehold.it/350x250" class="img-rounded pull-left"></a>
					      </div>
					    </div>
					  </div>
					</div>
				</div>

				<div class="tab-pane text-style" id="tab2">
				  <h2>Déplacement</h2>
				  	<p>Les données concernant le déplacement à la ville de La Rochelle.</p>
				    <hr>
						<div class="row">
						  <div class="col-sm-4">
						    <div class="card">
						      <div class="card-block">
						        <h3 class="card-title">Parkings</h3>
										<a href="#">
											<img src="http://placehold.it/450x350" class="img-rounded pull-left">
										</a>
						      </div>
						    </div>
						  </div>
						</div>
				</div>

				<div class="tab-pane text-style" id="tab3">
				  <h2>Espace public</h2>
					<hr>
					<div class="row">
				    <div class="col-xs-6 col-md-3">
				      <img src="http://placehold.it/150x150" class="img-rounded pull-right">
				  	</div>
						<div class="col-xs-6 col-md-3">
				      <img src="http://placehold.it/150x150" class="img-rounded pull-right">
				  	</div>
					</div>
				</div>

				<div class="tab-pane text-style" id="tab4">
				  <h2>Finance</h2>
					<hr>
			  	<div>
						<div class="col-xs-6 col-md-3">
				      <img src="http://placehold.it/150x150" class="img-rounded pull-right">
				  	</div>
						<div class="col-xs-6 col-md-3">
							<img src="http://placehold.it/150x150" class="img-rounded pull-right">
						</div>
					</div>
				</div>

			</div>
		</div>

	</body>

	<?php include '../footer/footer.php'; ?>

</html>
