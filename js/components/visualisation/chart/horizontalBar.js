function initHorizontalBar(params, box, level, previousValues) {
    params.margin.bottom = 20;
    params.height = params.h - params.margin.top - params.margin.bottom;

    params.margin.left = 120
    params.width = params.w - params.margin.left - params.margin.right;

    var x = d3.scale.linear()
        .domain([0, d3.max(params.dataToTreat, function (d) {
            return d[params.realValue]
        })])
        .range([0, params.width]);

    var y = d3.scale.ordinal()
        .domain(params.dataToTreat.map(function (entry) {
            return entry[params.realTitle]
        }))
        .rangeBands([0, params.height]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select('#' + box).append("svg")
        .attr("id", "chart" + box)
        .attr('viewBox', -params.margin.left + ' ' + -params.margin.top + ' ' + params.w + ' ' + params.h)
        .attr('preserveAspectRatio', 'xMinYMin')
        .append("g");

    var chart = svg.append("g")
        .classed("display", true)

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
                previousValues[level] = d[params.realTitle];
                initNewGraph(params, box, level + 1, previousValues)
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
            });
        this.append("g")
            .classed("x axis", true)
            .attr("transform", "translate(" + 0 + "," + params.height + ")")
            .call(xAxis);

        this.append("g")
            .classed("y axis", true)
            .attr("transform", "translate(0,0)")
            .call(yAxis)
    }

    plotHorizontal.call(chart, {data: params.dataToTreat})
}
