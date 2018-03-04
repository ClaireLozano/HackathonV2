function initHorizontalBar(dataToTreat, metadata, box, level){
    params = getParams(dataToTreat, metadata, level);

  var x = d3.scale.linear()
      .domain([0, d3.max(params.dataToTreat, function (d) {
          return d[params.realValue]
      })])
      .range([0, params.width])

  var y = d3.scale.ordinal()
      .domain(params.dataToTreat.map(function (entry) {
          return entry[params.realTitle]
      }))
      .rangeBands([0, params.height])

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")

  var svg = d3.select('#' + box).append("svg")
      .attr("width", params.w)
      .attr("height", params.h)

  var chart = svg.append("g")
      .classed("display", true)
      .attr("transform", "translate(" + params.margin.left + "," + params.margin.top + ")")

  function plotHorizontal(parametres) {
      this.selectAll(".bar")
          .data(parametres.data)
          .enter()
          .append("rect")
          .classed("bar", true)
          .attr("x", 0)
          .attr("y", function (d, i) {
              return y(d[params.realTitle])
          })
          .attr("height", function (d, i) {
              return y.rangeBand()
          })
          .attr("width", function (d) {
              return x(d[params.realValue])
          })
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
          .on("click", function (d, i) {
            initNewGraph(dataToTreat, metadata, box, level+1)
          });
          
      this.selectAll(".bar-label")
          .data(parametres.data)
          .enter()
          .append("text")
          .classed("bar-label", true)
          .style("font-size", "14px")
          .attr("x", function (d) {
              return x(d[params.realValue])
          })
          .attr("dx", 15)
          .attr("y", function (d, i) {
              return y(d[params.realTitle])
          })
          .attr("dy", function (d, i) {
              return y.rangeBand() / 1.5 + 2
          })
          .text(function (d) {
              return d[params.realValue]
          })
      this.append("g")
          .classed("x axis", true)
          .attr("transform", "translate(" + 0 + "," + params.height + ")")
          .call(xAxis)

      this.append("g")
          .classed("y axis", true)
          .attr("transform", "translate(0,0)")
          .call(yAxis)
  }

  plotHorizontal.call(chart, {data: params.dataToTreat})


}
