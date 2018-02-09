$(document).ready(function () {

    var result = getUrlPage()
    var nomDonnee = result[1];
    var endUrl = getUrl(nomDonnee);

    getData(endUrl, function(dataToTreat){
      console.log(dataToTreat);
      // load the data
      dataToTreat.forEach(function(d) {
          d.dp_libelle = d.dp_libelle;
          d.dp_place_disponible = +d.dp_place_disponible;
      });

      var w = 800, h = 450;
    	var margin = {
    		top:58,
    		bottom:150,
    		left:80,
    		right:40
    	};

    	var width = w - margin.left - margin.right;
    	var height = h - margin.top - margin.bottom;


    	var x = d3.scale.ordinal()
    					.domain(dataToTreat.map(function(entry){
    						return entry.dp_libelle
    					}))
    					.rangeBands([0,width]);

    	var y = d3.scale.linear()
    					.domain([0, d3.max(dataToTreat, function(d){return d.dp_place_disponible;})])
    					.range([height,0]);

    	var linearScaleColor = d3.scale.linear()
    													.domain([0, dataToTreat.length])
    													.range(["#572500","#F68026"]);

    	var ordinalScaleColor = d3.scale.category20();

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

    	var svg = d3.select(".chart").append("svg")
    						.attr("id","chart")
    						.attr("width",w)
    						.attr("height",h);

    	var chart = svg.append("g")
    							.classed("display",true)
    							.attr("transform","translate("+margin.left+","+margin.top+")");

    	var controls = d3.select("body")
    									.append("div")
    									.attr("id","controls")

    	var sort_btn =controls.append("button")
    												.html("Sort Data : ascending")
    												.attr("state",0)

    	function drawAxis(params){

    		if(params.initialize){
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

    	function plot(params){

    			x.domain(dataToTreat.map(function(entry){
    				return entry.dp_libelle
    			}))

    			y.domain([0, d3.max(dataToTreat, function(d){
    				return d.dp_place_disponible;
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
    							.classed("bar-label", true);

    			//update
    			this.selectAll(".bar")
    								.attr("x",function(d,i){
    									return x(d.dp_libelle)
    								})
    								.attr("y",function(d,i){
    									//return y(i); //linear scale
    									//return y(d.key); //ordinal scale - with name of json file as absciss
    									return y(d.dp_place_disponible);
    								})
    								.attr("width",function(d,i){
    									// return x(d.value); -- with name of json file as absciss
    									return x.rangeBand();
    								})
    								.attr("height",function(d){
    									//console.log(y(1))
    									//return y(1)-1; //linear scale
    									//return y.rangeBand()-1; //ordinal scale- with name of json file as absciss
    									return height - y(d.dp_place_disponible);
    								})
    								.style("fill",function(d,i){
    									//return linearScaleColor(i);
    									return ordinalScaleColor(i);
    								});

    			this.selectAll(".bar-label")
    								.attr("x",function(d,i){
    									//return x(d.value)
    									return x(d.dp_libelle) +  (x.rangeBand()/2);
    								})
    								.attr("dx", 0) //-4
    								.attr("y",function(d,i){
    									//return y(i); //linear scale
    									//return y(d.key); //ordinal scale
    									return y(d.dp_place_disponible);
    								})
    								.attr("dy",function(d,i){
    									// return y(1)/1.5; //linear scale
    									//return y.rangeBand()/1.5; //ordinal scale
    									return -6;
    								})
    								.text(function(d,i){
    									return d.dp_place_disponible;
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


    	sort_btn.on("click", function(){
    		var self = d3.select(this)

    		var ascending = function(a,b){
    			return a.value - b.value;
    		}

    		var descending = function(a,b){
    			return b.value - a.value;
    		}

    		var state = +self.attr("state")
    		var txt = "Sort data : "
    		if(state === 0){
    			data.sort(ascending)
    			state = 1
    			txt += "descending";
    		}else if(state === 1){
    			data.sort(descending)
    			state = 0
    			txt += "ascending";
    		}
    		self.attr("state",state).html(txt)

    		plot.call(chart, {
    			data:data,
    			axis:{
    				x: xAxis,
    				y: yAxis
    			},
    			gridlines: yGridlines,
    			initialize:false
    		});
    	})

    	plot.call(chart, {
    		data:dataToTreat,
    		axis:{
    			x: xAxis,
    			y: yAxis
    		},
    		gridlines: yGridlines,
    		initialize:true
    	});

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

    });
});
