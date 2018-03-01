function initdoughnut(dataToTreat, metadata, box){

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

  var vis = d3.select('#' + box)
      .append("svg")
      .data([dataToTreat])
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", "translate(" + r + "," + r + ")")

  var arc = d3.svg.arc()
      .innerRadius(r / 2)
      .outerRadius(r)

  var pie = d3.layout.pie()
      .value(function (d) {
          return d[realValue]
      })

  var arcs = vis.selectAll("g.slice")
      .data(pie)
      .enter()
      .append("g")
      .classed("slice", true)

  arcs.append("path")
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
      .attr("d", arc)


  arcs.append("text")
      .attr("transform", function (d) {                    //set the label's origin to the center of the arc
          d.innerRadius = 0
          d.outerRadius = r * 2
          return "translate(" + arc.centroid(d) + ")"        //this gives us a pair of coordinates like [50, 50]
      })
      .attr("text-anchor", "middle")                          //center the text on it's origin
      .text(function (d, i) {
          return dataToTreat[i][realTitle] +
              "\n" +
              dataToTreat[i][realValue]
      })        //get the label from our original data array

}
