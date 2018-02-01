<!DOCTYPE html>
<html>

	<?php include '../header/header.php'; ?>

	<body>
		<h1>Page de visualisation</h1>
		<div class="col-sm-4">
				<p> Données : <?php echo $_GET['data'] .' , Graphe : '. $_GET['type'];?> </p>
		</div>

	</body>

	<?php include '../footer/footer.php'; ?>
	<script type="text/javascript" src="visualisation.js"></script>

</html>
