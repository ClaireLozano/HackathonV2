function initHorizontalBar(dataToTreat, metadata, box){

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

  d3.selectAll("svg").remove()
  d3.selectAll(".chart>p").remove()

  var x = d3.scale.linear()
      .domain([0, d3.max(dataToTreat, function (d) {
          return d[realValue]
      })])
      .range([0, width])

  var y = d3.scale.ordinal()
      .domain(dataToTreat.map(function (entry) {
          return entry[realTitle]
      }))
      .rangeBands([0, height])

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")

  var svg = d3.select('#' + box).append("svg")
      .attr("width", w)
      .attr("height", h)

  var chart = svg.append("g")
      .classed("display", true)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  function plotHorizontal(params) {
      this.selectAll(".bar")
          .data(params.data)
          .enter()
          .append("rect")
          .classed("bar", true)
          .attr("x", 0)
          .attr("y", function (d, i) {
              return y(d[realTitle])
          })
          .attr("height", function (d, i) {
              return y.rangeBand()
          })
          .attr("width", function (d) {
              return x(d[realValue])
          })
          .style("fill", function (d, i) {
              return ordinalScaleColor(i)
          })
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
          .enter()
          .append("text")
          .classed("bar-label", true)
          .style("font-size", "14px")
          .attr("x", function (d) {
              return x(d[realValue])
          })
          .attr("dx", 15)
          .attr("y", function (d, i) {
              return y(d[realTitle])
          })
          .attr("dy", function (d, i) {
              return y.rangeBand() / 1.5 + 2
          })
          .text(function (d) {
              return d[realValue]
          })
      this.append("g")
          .classed("x axis", true)
          .attr("transform", "translate(" + 0 + "," + height + ")")
          .call(xAxis)

      this.append("g")
          .classed("y axis", true)
          .attr("transform", "translate(0,0)")
          .call(yAxis)
  }

  plotHorizontal.call(chart, {data: dataToTreat})


}
