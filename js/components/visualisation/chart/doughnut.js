function initdoughnut(params, box, level, previousValues) {

    var vis = d3.select('#' + box)
        .append("svg")
        .data([params.dataToTreat])
        .attr("id", "chart" + box)
        .attr('viewBox', -params.r + ' ' + -params.r + ' ' + 3.5 * params.r + ' ' + 2 * params.r)
        .attr('preserveAspectRatio', 'xMinYMin')
        .append("g");

    var arc = d3.svg.arc()
        .innerRadius(params.r / 2)
        .outerRadius(params.r);

    var pie = d3.layout.pie()
        .value(function (d) {
            return d[params.realValue]
        });

    var arcs = vis.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("g")
        .classed("slice", true);

    arcs.append("path")
        .style("fill", function (d, i) {
            return params.ordinalScaleColor(i)
        })
        .on("mouseover", function (d, i) {
            d3.select(this).style("fill", params.COLORHOVER)
            //Get this bar's x/y values, then augment for the tooltip
	 					var xPosition = parseFloat(d3.event.pageX);
	 					var yPosition = parseFloat(d3.event.pageY);

	 					//Update the tooltip position and value
	 					d3.select("#tooltip")
	 						.style("left", xPosition + "px")
	 						.style("top", yPosition + "px")


						d3.select("#tooltip")
							.select("#value_nb_places")
							.text(d.data.dp_nb_places);

						d3.select("#tooltip")
							.select("#value_nb_places_disponibles")
							.text(d.data.dp_place_disponible);

	 					d3.select("#tooltip")
	 						.select("#title")
						   .text(d.data.dp_libelle);

	 					//Show the tooltip
	 					d3.select("#tooltip").classed("hidden", false);
        })
        .on("mousemove", function (d, i) {

        })
        .on("mouseout", function (d, i) {
            d3.select(this).style("fill", params.ordinalScaleColor(i))
            //Hide the tooltip
            d3.select("#tooltip").classed("hidden", true)
        })
        .attr("d", arc)
        .attr("data-legend", function (d) {
            return d.data[params.realTitle];
        })
        .on("click", function (node, i) {
            previousValues[level] = node.data[params.realTitle];
            initNewGraph(params, box, level + 1, previousValues)
        })
        .attr('opacity', 0)
        .transition()
            .delay(function(d,i){return i *300;})
            .duration(1000)
            .attr("opacity", 1);

    arcs.append("text")
        .attr("transform", function (d) {                    //set the label's origin to the center of the arc
            d.innerRadius = 0;
            d.outerRadius = params.r * 2;
            return "translate(" + arc.centroid(d) + ")"        //this gives us a pair of coordinates like [50, 50]
        })
        .attr("text-anchor", "middle")                          //center the text on it's origin
        .text(function (d, i) {
            return params.dataToTreat[i][params.realValue]
        })
        .attr('opacity', 0)
        .transition()
            .delay(function(d,i){return i *300;})
            .duration(1000)
            .attr("opacity", 1);        //get the label from our original data array

    var legend = vis.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + params.r * 1.2 + ","+ -params.r*9/10 +")")
        .style("font-size", "12px")
        .call(d3.legend)
}
