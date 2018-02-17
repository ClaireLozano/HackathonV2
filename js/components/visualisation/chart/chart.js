$(document).ready(function () {

    var result = getUrlPage()
    var nomDonnee = result[1];
    var endUrl = getUrl(nomDonnee);

    getData(endUrl, function(dataToTreat){
      //console.log(dataToTreat);

      var svg = d3.select("svg");
      var margin = {top: 20, right: 20, bottom: 70, left: 40},
      width = 600 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

      // set the ranges
      var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
      var y = d3.scale.linear().range([height, 0]);

      // define the axis
      var xAxis = d3.svg.axis().scale(x).orient("bottom")
      var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);

      // add the SVG element
      var svg = d3.select("#chart").append("svg")
          .attr("width", "100%")
          .attr("height", "100%")
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

      // load the data
      dataToTreat.forEach(function(d) {
          d.dp_libelle = d.dp_libelle;
          d.dp_place_disponible = +d.dp_place_disponible;
      });

      // scale the range of the data
      x.domain(dataToTreat.map(function(d) { return d.dp_libelle; }));
      y.domain([0, d3.max(dataToTreat, function(d) { return d.dp_place_disponible; })]);

      // add axis
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", "-.55em")
          .attr("transform", "rotate(-90)" );

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 5)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Frequency");


      // Add bar chart
      svg.selectAll("bar")
          .data(dataToTreat)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.dp_libelle); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.dp_place_disponible); })
          .attr("height", function(d) { return height - y(d.dp_place_disponible); });
    });

});
