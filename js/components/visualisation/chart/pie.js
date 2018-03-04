function initPie(dataToTreat, metadata, box, level){
  var params = getParams(dataToTreat,metadata, level)

  var vis = d3.select('#' + box)
      .append("svg")
      .data([params.dataToTreat])
      .attr("width", params.w)
      .attr("height", params.h)
      .append("g")
      .attr("transform", "translate(" + params.r + "," + params.r + ")")

  var arc = d3.svg.arc()
      .outerRadius(200)

  var pie = d3.layout.pie()
      .value(function (d) {
          return d[params.realValue]
      })

  var arcs = vis.selectAll("g.slice")
      .data(pie)
      .enter()
      .append("g")
      .classed("slice", true)

  arcs.append("path")
      .style("fill", function (d, i) {
          return params.ordinalScaleColor(i)
      })
      .on("mouseover", function (d, i) {
          d3.select(this).style("fill", params.COLORHOVER)
      })
      .on("mousemove", function (d, i) {

      })
      .on("mouseout", function (d, i) {
          d3.select(this).style("fill", params.ordinalScaleColor(i))
      })
      .attr("d", arc)
      .on("click", function (node, i) {
        initNewGraph(dataToTreat, metadata, box, level+1)
      });

  arcs.append("text")
      .attr("transform", function (d) {                    //set the label's origin to the center of the arc
          d.innerRadius = 0
          d.outerRadius = params.r * 2
          return "translate(" + arc.centroid(d) + ")"        //this gives us a pair of coordinates like [50, 50]
      })
      .attr("text-anchor", "middle")                          //center the text on it's origin
      .text(function (d, i) {
          return params.dataToTreat[i][params.realTitle] +
              "\n" +
              params.dataToTreat[i][params.realValue]
      })        //get the label from our original data array
}
