function change(region) {

    //console.log("region", region);

    var data0 = path.data(),
        data1 = pie(region.values);

    //console.log("data0",data0);
    //console.log("data1", data1);

    path = path.data(data1, key);

    path.enter().append("path")
        .each(function (d, i) {
            this._current = findNeighborArc(i, data0, data1, key) || d;
        })
        .attr("fill", function (d) {
            return color(d.data.region);
        })
        .append("title")
        .text(function (d) {
            return d.data.region;
        });

    path.exit()
        .datum(function (d, i) {
            return findNeighborArc(i, data1, data0, key) || d;
        })
        .transition()
        .duration(750)
        .attrTween("d", arcTween)
        .remove();

    path.transition()
        .duration(750)
        .attrTween("d", arcTween);
}

function key(d) {
    return d.data.region;
}

function type(d) {
    d.count = +d.count;
    return d;
}

function findNeighborArc(i, data0, data1, key) {
    var d;
    return (d = findPreceding(i, data0, data1, key)) ? {startAngle: d.endAngle, endAngle: d.endAngle}
        : (d = findFollowing(i, data0, data1, key)) ? {startAngle: d.startAngle, endAngle: d.startAngle}
            : null;
}

// Find the element in data0 that joins the highest preceding element in data1.
function findPreceding(i, data0, data1, key) {
    var m = data0.length;
    while (--i >= 0) {
        var k = key(data1[i]);
        for (var j = 0; j < m; ++j) {
            if (key(data0[j]) === k) return data0[j];
        }
    }
}
// Find the element in data0 that joins the lowest following element in data1.
function findFollowing(i, data0, data1, key) {
    var n = data1.length, m = data0.length;
    while (++i < n) {
        var k = key(data1[i]);
        for (var j = 0; j < m; ++j) {
            if (key(data0[j]) === k) return data0[j];
        }
    }
}

function arcTween(d) {
    var i = d3.interpolate(this._current, d);
    this._current = i(0);
    return function (t) {
        return arc(i(t));
    };
}

function initPie(dataToTreat, metadata, box){

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

  var vis = d3.select('#' + box)
      .append("svg")
      .data([dataToTreat])
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", "translate(" + r + "," + r + ")")

  var arc = d3.svg.arc()
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
      .on("click", function (d, i) {
        var nested = d3.nest()
            .key(function (d) {
                // console.log("nest",d);
                return d[metadata.graph.dataComposition.category0];
            })
            .key(function (d) {
                // console.log("nest",originalData);
                return d[metadata.graph.dataComposition.category1];
            })
            .rollup(function (v) {
                return d3.sum(v, function (d) {
                        return d[metadata.graph.dataComposition.value];
                    }
                )
            })
            .entries(originalData);

        newDataToTreat = nested.filter(function (d) {
            return d.key === node.data.key
        })[0].values;

        console.log(newDataToTreat);
      })


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
