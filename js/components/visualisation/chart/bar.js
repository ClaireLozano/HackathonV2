function initBar(dataToTreat, metadata, box){

  // load the data
  var realTitle = metadata.graph.dataComposition.title
  var realValue = metadata.graph.dataComposition.value
  var originalData = dataToTreat
  var COLORHOVER = "brown"

  var catProfondeur = []
  for (value in metadata.graph.dataComposition) {
      if (value.substring(0, 8) == "category")
          catProfondeur.push(metadata.graph.dataComposition[value])
  }

  dataToTreat.forEach(function (d) {
      d[realTitle] = d[realTitle]
      d[realValue] = +d[realValue]
  })

  if (metadata.graph.dataComposition.category0) {
      var nested = d3.nest()
          .key(function (d) {
              // console.log("nest",d)
              //return d[metadata.graph.dataComposition.category0]
              return d[catProfondeur[0]]
          })
          /*.key(function (d) {
              return d[metadata.graph.dataComposition.category1]
          })*/
          .rollup(function (v) {
              return d3.sum(v, function (d) {
                      return d[realValue]
                  }
              )
          })
          .entries(dataToTreat)

      // Premier niveau de filtre
      dataToTreat = nested
      /*
      dataToTreat = nested.filter(function (d) {
          return d.key === "Recette"
      })[0].values*/
      realTitle = "key"
      realValue = "values"
  }

  if (metadata.dictionnaireY) {
      var urlDict = metadata.dictionnaireY.link
      var initValue = metadata.dictionnaireY.initValue
      var newValue = metadata.dictionnaireY.newValue

      // Get dictionnary
      getData(urlDict, function (dict) {
          dataToTreat.forEach(function (d) {
              dict.forEach(function (d2){
                  if (d[realTitle] == d2[initValue]) {
                      d[realTitle] = d2[newValue]
                  }
              })

          })
      })
  }

  var w = 800, h = 500
  var margin = {
      top: 58,
      bottom: 150,
      left: 80,
      right: 40
  }
  var width = w - margin.left - margin.right
  var height = h - margin.top - margin.bottom
  var r = 200
  var ordinalScaleColor = d3.scale.ordinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])
  var newDataToTreat

  var x = d3.scale.ordinal()
      .domain(dataToTreat.map(function (entry) {
          return entry[realTitle]
      }))
      .rangeBands([0, width])

  var y = d3.scale.linear()
      .domain([0, d3.max(dataToTreat, function (d) {
          return d[realValue]
      })])
      .range([height, 0])


  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")

  var yGridlines = d3.svg.axis()
      .scale(y)
      .tickSize(-width, 0, 0)
      .tickFormat("")
      .orient("left")

  var svg = d3.select('#' + box).append("svg")
      .attr("id", "chart")
      .attr("width", w)
      .attr("height", h)

  var chart = svg.append("g")
      .classed("display", true)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  function drawAxis(params) {
      if (params.initialize) {
          //this is title
          this.append("text")
              .attr("x", (width / 2))
              .attr("y", 0 - (margin.top / 2))
              .attr("text-anchor", "middle")
              .style("font-size", "16px")
              .text("")

          //this is gridline
          this.append("g")
              .call(params.gridlines)
              .classed("gridline", true)
              .attr("transform", "translate(0,0)")

          //this is x axis
          this.append("g")
              .classed("x axis", true)
              .attr("transform", "translate(" + 0 + "," + height + ")")
              .call(params.axis.x)
              .selectAll("text")
              .style("text-anchor", "end")
              .attr("dx", -8)
              .attr("dy", 8)
              .attr("transform", "translate(0,0) rotate(-45)")

          //this is y axis
          this.append("g")
              .classed("y axis", true)
              .attr("transform", "translate(0,0)")
              .call(params.axis.y)

          //this is y label
          this.select(".y.axis")
              .append("text")
              .attr("x", 0)
              .attr("y", 0)
              .style("text-anchor", "middle")
              .attr("transform", "translate(-50," + height / 2 + ") rotate(-90)")
              .text(metadata.graph.dataComposition.y_axis)

          //this is x label
          this.select(".x.axis")
              .append("text")
              .attr("x", 0)
              .attr("y", 0)
              .style("text-anchor", "middle")
              .attr("transform", "translate(" + width / 2 + ", 130)")
              .text(metadata.graph.dataComposition.x_axis)
      } else {
          this.selectAll("g.x.axis")
              .call(params.axis.x)
          this.selectAll("g.y.axis")
              .call(params.axis.y)
      }
  }

  function plot(params) {

      x.domain(dataToTreat.map(function (entry) {
          return entry.dp_libelle
      }))

      y.domain([0, d3.max(dataToTreat, function (d) {
          return d[realValue]
      })])

      drawAxis.call(this, params)

      //enter
      this.selectAll(".bar")
          .data(params.data)
          .enter().append("rect")
          .classed("bar", true)
          .on("mouseover", function (d, i) {
              d3.select(this).style("fill", COLORHOVER)
          })
          .on("mousemove", function (d, i) {

          })
          .on("mouseout", function (d, i) {
              d3.select(this).style("fill", ordinalScaleColor(i))
          })

      this.selectAll(".bar-label")
          .data(params.data)
          .enter().append("text")
          .classed("bar-label", true)
          .style("font-size", "14px")

      //update
      this.selectAll(".bar")
          .attr("x", function (d, i) {
              return x(d[realTitle])
          })
          .attr("y", function (d, i) {
              return y(d[realValue])
          })
          .attr("width", function (d, i) {
              return x.rangeBand()
          })
          .attr("height", function (d) {
              return height - y(d[realValue])
          })
          .style("fill", function (d, i) {
              return ordinalScaleColor(i)
          })

      this.selectAll(".bar-label")
          .attr("x", function (d, i) {
              return x(d[realTitle]) + (x.rangeBand() / 2)
          })
          .attr("dx", 0) //-4
          .attr("y", function (d, i) {
              return y(d[realValue])
          })
          .attr("dy", function (d, i) {
              // return y(1)/1.5 //linear scale
              //return y.rangeBand()/1.5 //ordinal scale
              return -6
          })
          .text(function (d, i) {
              return d[realValue]
          })
      //exit
      this.selectAll(".bar")
          .data(params.data)
          .exit()
          .remove()

      this.selectAll(".bar-label")
          .data(params.data)
          .exit()
          .remove()

  }

  plot.call(chart, {
      data: dataToTreat,
      axis: {
          x: xAxis,
          y: yAxis
      },
      gridlines: yGridlines,
      initialize: true
  })
}
