function initPie(params, box, level, previousValues) {

    var vis = d3.select('#' + box)
        .append("svg")
        .data([params.dataToTreat])
        .attr("id", "chart" + box)
        .attr('viewBox', -params.r + ' ' + -params.r + ' ' + 3.5 * params.r + ' ' + 2 * params.r)
        .attr('preserveAspectRatio', 'xMinYMin')
        .append("g");

    var arc = d3.svg.arc()
        .outerRadius(200);

    var pie = d3.layout.pie()
        .value(function (d) {
            return d[params.realValue]
        });

    var arcs = vis.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("g")
        .classed("slice", true);

    var format = d3.format(".1s");

    var tooltip = d3
      .select("#box2")
      .append("div")
      .attr("class", "tooltip");

    tooltip.append('div')
        .attr('class', 'title');

    tooltip.append('div')
        .attr('class', 'value');

    arcs.append("path")
        .style("fill", function (d, i) {
            return params.ordinalScaleColor(i)
        })
        .on("mouseover", function (d, i) {
            d3.select(this).style("fill", params.COLORHOVER)

            tooltip
              .select(".title")
              .html(d.data.key)
              .style("font-weight", "bold");

            tooltip
                .select('.value')
                .html(params.devise ? 
                    d.value + " " + params.devise : 
                    d.value
                );

            tooltip.style('display', 'block');
            tooltip.style('opacity', 2)
        })
        .on("mousemove", function (d, i) {
            tooltip
                .style('top', (d3.event.layerY + 300) + 'px')
                .style('left', (d3.event.layerX - 10) + 'px');
        })
        .on("mouseout", function (d, i) {
            d3.select(this).style("fill", params.ordinalScaleColor(i))
            tooltip.style('display', 'none');
            tooltip.style('opacity', 0);
        })
        .attr("d", arc)
        .attr("data-legend", function (d) {
            return d.data[params.realTitle]
        })
        .on("click", function (node, i) {
            previousValues[level] = node.data[params.realTitle];
            d3.selectAll(".tooltip").remove();
            initNewGraph(params, box, level + 1, previousValues)
        })
        .attr('opacity', 0)
        .transition()
            .delay(function(d,i){return i *300;})
            .duration(500)
            .attr("opacity", 1);

    arcs
      .append("text")
      .attr("transform", function(d) {
        //set the label's origin to the center of the arc
        d.innerRadius = 0;
        d.outerRadius = params.r * 2;
        return "translate(" + arc.centroid(d) + ")"; //this gives us a pair of coordinates like [50, 50]
      })
      .attr("text-anchor", "middle") //center the text on it's origin
      .text(function(d, i) {
            if (params.dataToTreat[i][params.realValue] < 4e6){
                return ''
            } else {
                return params.devise ? format(params.dataToTreat[i][params.realValue]) + params.devise : params.dataToTreat[i][params.realValue];
            }      
        })
      .attr("opacity", 0)
      .transition()
      .delay(function(d, i) {
        return i * 300;
      })
      .duration(500)
      .attr("opacity", 1);       //get the label from our original data array


    var legend = vis.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + params.r * 1.2 + ","+ -params.r*9/10 +")")
        .style("font-size", "12px")
        .call(d3.legend)
}
