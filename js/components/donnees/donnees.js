

$(document).ready(function(){

	/**
	 * Init
	 *
	 * @return
	 */


	function init() {
		var mdName = "disponibilite_parking"
		var myUrl = getUrl(mdName);
		var mdTitle = "" ;
		var selectList = "";
		var onlyOneElement = "" ;
		var libelleList = [] ;
		var datumList = [] ;
		var libelleListElement = [] ;
		var datumListElement = [] ;

		// Get the metadata
		getMetadata(mdName, function(metadata) {
			mdTitle = metadata["graph"]["dataComposition"]["title"];
			selectList = metadata["graph"]["dataComposition"]["selectList"] ;
			onlyOneElement = metadata["graph"]["dataComposition"]["onlyOneElement"] ;
				});

		// Get the data
		getData(myUrl, function(currentData){
			console.log(currentData);
			currentData.forEach(function(oneLine){
				libelleList.push(oneLine[selectList]);
				datumList.push(oneLine[onlyOneElement]);
			});
		});

		// libelleListElement.forEach(function(e){
		// 		console.log(libelleListElement, e);
		// });
		// datumListElement.forEach(function(e){
		// 		console.log(e);
		// });
		console.log("init", libelleList);
		console.log("init",datumList);

		// Draw a chart
		drawGraph(libelleList, datumList, "bar", mdTitle);

		};

		function drawGraph(labels, datasets, typeChart, titleLabel){
			var block = document.getElementById("myChart0").getContext("2d");
			console.log(labels, datasets, typeChart, titleLabel);

			chart = new Chart(block, {
					type: typeChart,
					data: {
							labels: labels,
							datasets: [{
									label: titleLabel,
									data: datasets,
									backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
									borderWidth: 1
							}]
					},
					options: {
						 responsive: false,
						 scales: {
								 yAxes: [{
										 ticks: {
												 beginAtZero:true,
												 max: 500
										 }
								 }]
						 },
						 legend: {
								 display: true
						 }//,
						 // tooltips: {
							// 	 callbacks: {
							// 			label: function(tooltipItem) {
							// 						 return tooltipItem.yLabel;
							// 			}
							// 	 }
						 // }
				 }
			});
		}



	var bindListeners = function() {
	};


	init();
	bindListeners();
});
