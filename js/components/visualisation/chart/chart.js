
/**
 * Draw map
 *
 * @return null
 */
function drawGraph(dataToTreat, metadata, box) {

  console.log("metadata", metadata)
  // load the data
  dataToTreat.forEach(function(d) {
      d[metadata.graph.dataComposition.titleElements] = d[metadata.graph.dataComposition.titleElements];
      d[metadata.graph.dataComposition.onlyOneElement] = + d[metadata.graph.dataComposition.onlyOneElement];
  });

  var w = 800, h = 500;
	var margin = {
		top:58,
		bottom:150,
		left:80,
		right:40
	};

	var width = w - margin.left - margin.right;
	var height = h - margin.top - margin.bottom;
  var r = 200
  //var ordinalScaleColor = d3.scale.category20b();
  var ordinalScaleColor = d3.scale.ordinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  var select = d3.select('#' + box)
                .append('select')
                .classed('selectGraph',true)
                .on('change',onChange);

  var options = select.selectAll('option')
              	.data(metadata.graph.possibleGraphs).enter()
              	.append('option')
                .attr("value", function(d){ return d; })
              	.text(function(d){ return d; });


  function onChange() {

    var selectValue = d3.select('.selectGraph').property('value')
    console.log(selectValue);

    switch (selectValue) {
      case "bar":
        //exit
        d3.selectAll("svg").remove();
        d3.selectAll(".chart>p").remove();

        var x = d3.scale.ordinal()
                .domain(dataToTreat.map(function(entry){
                  return entry[metadata.graph.dataComposition.titleElements]
                }))
                .rangeBands([0,width]);

        var y = d3.scale.linear()
                .domain([0, d3.max(dataToTreat, function(d){return d[metadata.graph.dataComposition.onlyOneElement];})])
                .range([height,0]);


        var xAxis = d3.svg.axis()
                          .scale(x)
                          .orient("bottom");

        var yAxis = d3.svg.axis()
                          .scale(y)
                          .orient("left");

        var yGridlines = d3.svg.axis()
              .scale(y)
              .tickSize(-width,0,0)
              .tickFormat("")
              .orient("left");

        var svg = d3.select('#' + box).append("svg")
                  .attr("id","chart")
                  .attr("width",w)
                  .attr("height",h);

        var chart = svg.append("g")
                    .classed("display",true)
                    .attr("transform","translate("+margin.left+","+margin.top+")");

        function drawAxis(params) {
      		  if(params.initialize) {
              //this is title
              this.append("text")
                  .attr("x", (width / 2))
                  .attr("y", 0 - (margin.top / 2))
                  .attr("text-anchor", "middle")
                  .style("font-size", "16px")
                  .text("");

              //this is gridline
      				this.append("g")
      					.call(params.gridlines)
      					.classed("gridline", true)
      					.attr("transform", "translate(0,0)")

      		    //this is x axis
      				this.append("g")
      						.classed("x axis", true)
      						.attr("transform","translate("+0+","+height+")")
      						.call(params.axis.x)
      							.selectAll("text")
      							.style("text-anchor","end")
      							.attr("dx",-8)
      							.attr("dy",8)
      							.attr("transform","translate(0,0) rotate(-45)");

      				//this is y axis
      				this.append("g")
      						.classed("y axis", true)
      						.attr("transform","translate(0,0)")
      						.call(params.axis.y);

      				//this is y label
      				this.select(".y.axis")
      						.append("text")
      						.attr("x",0)
      						.attr("y",0)
      						.style("text-anchor","middle")
      						.attr("transform","translate(-50,"+height/2+") rotate(-90)")
      						.text("Nombre de places disponibles")

      				//this is x label
      				this.select(".x.axis")
      						.append("text")
      						.attr("x",0)
      						.attr("y",0)
      						.style("text-anchor","middle")
      						.attr("transform","translate("+width/2+", 130)")
      						.text("Parking")
      		} else {
      			this.selectAll("g.x.axis")
      					.call(params.axis.x)
      			this.selectAll("g.y.axis")
      					.call(params.axis.y)
      		}
      	}

      	function plot(params) {

      			x.domain(dataToTreat.map(function(entry){
      				return entry.dp_libelle
      			}))

      			y.domain([0, d3.max(dataToTreat, function(d){
      				return d[metadata.graph.dataComposition.onlyOneElement];
      			})])

      			drawAxis.call(this,params);

      			//enter
      			this.selectAll(".bar")
      					.data(params.data)
      					.enter().append("rect")
      									.classed("bar", true);

      			this.selectAll(".bar-label")
      					.data(params.data)
      					.enter().append("text")
      							.classed("bar-label", true)
                    .style("font-size", "14px");

      			//update
      			this.selectAll(".bar")
      								.attr("x",function(d,i){
      									return x(d[metadata.graph.dataComposition.titleElements])
      								})
      								.attr("y",function(d,i){
      									return y(d[metadata.graph.dataComposition.onlyOneElement]);
      								})
      								.attr("width",function(d,i){
      									return x.rangeBand();
      								})
      								.attr("height",function(d){
      									return height - y(d[metadata.graph.dataComposition.onlyOneElement]);
      								})
      								.style("fill",function(d,i){
      									return ordinalScaleColor(i);
      								});

      			this.selectAll(".bar-label")
      								.attr("x",function(d,i){
      									return x(d[metadata.graph.dataComposition.titleElements]) +  (x.rangeBand()/2);
      								})
      								.attr("dx", 0) //-4
      								.attr("y",function(d,i){
      									return y(d[metadata.graph.dataComposition.onlyOneElement]);
      								})
      								.attr("dy",function(d,i){
      									// return y(1)/1.5; //linear scale
      									//return y.rangeBand()/1.5; //ordinal scale
      									return -6;
      								})
      								.text(function(d,i){
      									return d[metadata.graph.dataComposition.onlyOneElement];
      								});
      			//exit
      			this.selectAll(".bar")
      					.data(params.data)
      					.exit()
      					.remove();

      			this.selectAll(".bar-label")
      					.data(params.data)
      					.exit()
      					.remove();

      	}

  	    plot.call(chart, {
      		data:dataToTreat,
      		axis:{
      			x: xAxis,
      			y: yAxis
      		},
      		gridlines: yGridlines,
      		initialize:true
      	});

        break;
      case "pie":
        d3.selectAll("svg").remove();
        d3.selectAll(".chart>p").remove();

        var vis = d3.select('#' + box)
           .append("svg")
           .data([dataToTreat])
               .attr("width", w)
               .attr("height", h)
           .append("g")
               .attr("transform", "translate(" + r + "," + r + ")")

       var arc = d3.svg.arc()
           .outerRadius(r);

       var pie = d3.layout.pie()
           .value(function(d) { return d[metadata.graph.dataComposition.onlyOneElement]; });

       var arcs = vis.selectAll("g.slice")
           .data(pie)
           .enter()
               .append("g")
                   .classed("slice",true);

           arcs.append("path")
                   .style("fill",function(d,i){
                     return ordinalScaleColor(i);
                   })
                   .attr("d", arc);


           arcs.append("text")
                   .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                       d.innerRadius = 0;
                       d.outerRadius = r*2;
                       return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
                   })
                   .attr("text-anchor", "middle")                          //center the text on it's origin
                   .text(function(d, i) { return dataToTreat[i][metadata.graph.dataComposition.titleElements] +
                                                  "\n" +
                                                  dataToTreat[i][metadata.graph.dataComposition.onlyOneElement]; });        //get the label from our original data array


        break;
      case "doughnut":
        d3.selectAll("svg").remove();
        d3.selectAll(".chart>p").remove();

        var vis = d3.select('#' + box)
           .append("svg")
           .data([dataToTreat])
               .attr("width", w)
               .attr("height", h)
           .append("g")
               .attr("transform", "translate(" + r + "," + r + ")")

       var arc = d3.svg.arc()
           .innerRadius(r/2)
           .outerRadius(r);

       var pie = d3.layout.pie()
           .value(function(d) { return d[metadata.graph.dataComposition.onlyOneElement]; });

       var arcs = vis.selectAll("g.slice")
           .data(pie)
           .enter()
               .append("g")
                   .classed("slice",true);

           arcs.append("path")
                   .style("fill",function(d,i){
                     return ordinalScaleColor(i);
                   })
                   .attr("d", arc);


           arcs.append("text")
                   .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                       d.innerRadius = 0;
                       d.outerRadius = r*2;
                       return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
                   })
                   .attr("text-anchor", "middle")                          //center the text on it's origin
                   .text(function(d, i) { return dataToTreat[i][metadata.graph.dataComposition.titleElements] +
                                                  "\n" +
                                                  dataToTreat[i][metadata.graph.dataComposition.onlyOneElement]; });        //get the label from our original data array



        break;
      case "horizontalBar":
        d3.selectAll("svg").remove();
        d3.selectAll(".chart>p").remove();

        var x = d3.scale.linear()
        		.domain([0, d3.max(dataToTreat, function(d){
              return d[metadata.graph.dataComposition.onlyOneElement];
        		})])
        		.range([0, width]);

        var y = d3.scale.ordinal()
        		.domain(dataToTreat.map(function(entry){
        			return entry[metadata.graph.dataComposition.titleElements];
        		}))
        		.rangeBands([0, height]);

        var xAxis = d3.svg.axis()
        			.scale(x)
        			.orient("bottom");

        var yAxis = d3.svg.axis()
        			.scale(y)
        			.orient("left");

        var svg = d3.select('#' + box).append("svg")
        			.attr("width", w)
        			.attr("height", h);

        var chart = svg.append("g")
        			.classed("display", true)
        			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        function plotHorizontal(params){
        	this.selectAll(".bar")
        		.data(params.data)
        		.enter()
        			.append("rect")
        			.classed("bar", true)
        			.attr("x", 0)
        			.attr("y", function(d,i){
        				return y(d[metadata.graph.dataComposition.titleElements]);
        			})
        			.attr("height", function(d,i){
        				return y.rangeBand();
        			})
        			.attr("width", function(d){
        				return x(d[metadata.graph.dataComposition.onlyOneElement]);
        			})
        			.style("fill", function(d,i){
        				return ordinalScaleColor(i);
        			});
        	this.selectAll(".bar-label")
        		.data(params.data)
        		.enter()
        			.append("text")
        			.classed("bar-label", true)
              .style("font-size", "14px")
        			.attr("x", function(d){
        				return x(d[metadata.graph.dataComposition.onlyOneElement]);
        			})
        			.attr("dx", 15)
        			.attr("y", function(d,i){
        				return y(d[metadata.graph.dataComposition.titleElements]);
        			})
        			.attr("dy", function(d,i){
        				return y.rangeBand()/1.5+2;
        			})
        			.text(function(d){
        				return d[metadata.graph.dataComposition.onlyOneElement];
        			})
        	this.append("g")
        		.classed("x axis", true)
        		.attr("transform", "translate(" + 0 + "," + height + ")")
        		.call(xAxis);

        	this.append("g")
        		.classed("y axis", true)
        		.attr("transform", "translate(0,0)")
        		.call(yAxis);
        }
        plotHorizontal.call(chart, {data: dataToTreat});

        break;
      default:
        d3.selectAll("svg").remove();
        d3.selectAll(".chart>p").remove();

        d3.select("'#" + box + "'")
          .append('p')
          .text("Veuillez séléctionner un type de graphe avant de continuer.")
    }
  }

  /*
  * Adding refresh method to reload new data
  */
  /*
  function refresh(values){
    // var values = d3.range(1000).map(d3.random.normal(20, 5));
    var data = d3.layout.histogram()
      .bins(x.ticks(20))
      (values);

    // Reset y domain using new data
    var yMax = d3.max(data, function(d){return d.length});
    var yMin = d3.min(data, function(d){return d.length});
    y.domain([0, yMax]);
    var colorScale = d3.scale.linear()
                .domain([yMin, yMax])
                .range([d3.rgb(color).brighter(), d3.rgb(color).darker()]);

    var bar = svg.selectAll(".bar").data(data);

    // Remove object with data
    bar.exit().remove();

    bar.transition()
      .duration(1000)
      .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

    bar.select("rect")
        .transition()
        .duration(1000)
        .attr("height", function(d) { return height - y(d.y); })
        .attr("fill", function(d) { return colorScale(d.y) });

    bar.select("text")
        .transition()
        .duration(1000)
        .text(function(d) { return formatCount(d.y); });

  }

  // Calling refresh repeatedly.
  setInterval(function() {
    var values = d3.range(1000).map(d3.random.normal(20, 5));
    refresh(values);
  }, 2000);
  */

  onChange();
};
