function initBar(params, box, level, previousValues) {
    params.margin.bottom = 150;
    params.height = params.h - params.margin.top - params.margin.bottom;

    params.margin.left = 80
    params.width = params.w - params.margin.left - params.margin.right;

    var x = d3.scale.ordinal()
        .domain(params.dataToTreat.map(function (entry) {
            return entry[params.realTitle]
        }))
        .rangeBands([0, params.width]);

    var y = d3.scale.linear()
        .domain([0, d3.max(params.dataToTreat, function (d) {
            return parseInt(d[params.realValue])
        })])
        .range([params.height, 0]);


    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var yGridlines = d3.svg.axis()
        .scale(y)
        .tickSize(-params.width, 0, 0)
        .tickFormat("")
        .orient("left");

    var svg = d3.select('#' + box).append("svg")
        .attr("id", "chart" + box)
        .attr('viewBox', -params.margin.left + ' ' + -params.margin.top + ' ' + params.w + ' ' + params.h)
        .attr('preserveAspectRatio', 'xMinYMin')
        .append("g")

    var chart = svg.append("g")
        .classed("display", true)


    function drawAxis(parametres) {
        if (parametres.initialize) {
            //this is title
            this.append("text")
                .attr("x", (params.width / 2))
                .attr("y", 0 - (params.margin.top / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .text("");

            //this is gridline
            this.append("g")
                .call(parametres.gridlines)
                .classed("gridline", true)
                .attr("transform", "translate(0,0)");

            //this is x axis
            this.append("g")
                .classed("x axis", true)
                .attr("transform", "translate(" + 0 + "," + params.height + ")")
                .call(parametres.axis.x)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", -8)
                .attr("dy", 8)
                .attr("transform", "translate(0,0) rotate(-45)");

            //this is y axis
            this.append("g")
                .classed("y axis", true)
                .attr("transform", "translate(0,0)")
                .call(parametres.axis.y);

            //this is y label
            this.select(".y.axis")
                .append("text")
                .attr("x", 0)
                .attr("y", 0)
                .style("text-anchor", "middle")
                .attr("transform", "translate(-50," + params.height / 2 + ") rotate(-90)")
                .text(params.metadata.graph.dataComposition.y_axis);

            //this is x label
            this.select(".x.axis")
                .append("text")
                .attr("x", 0)
                .attr("y", 0)
                .style("text-anchor", "middle")
                .attr("transform", "translate(" + params.width / 2 + ", 130)")
                .text(params.metadata.graph.dataComposition.x_axis)
        } else {
            this.selectAll("g.x.axis")
                .call(parametres.axis.x);
            this.selectAll("g.y.axis")
                .call(parametres.axis.y)
        }
    }

    function plot(parametres) {

        x.domain(params.dataToTreat.map(function (entry) {
            return entry.dp_libelle
        }));

        y.domain([0, d3.max(params.dataToTreat, function (d) {
            return parseInt(d[params.realValue])
        })]);

        drawAxis.call(this, parametres);

        //enter
        this.selectAll(".bar")
            .data(parametres.data)
            .enter().append("rect")
            .classed("bar", true)
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
            })
            .attr('opacity', 0)
            .transition()
                .delay(function(d,i){return i *300;})
                .duration(1000)
                .attr("opacity", 1);
// TODO: Ajout transition fade in
// TODO: ajout popup avec donnee
// TODO: changement des couleurs


        this.selectAll(".bar-label")
            .data(parametres.data)
            .enter().append("text")
            .classed("bar-label", true)
            .style("font-size", "14px");

        //update
        this.selectAll(".bar")
            .attr("x", function (d, i) {
                return x(d[params.realTitle])
            })
            .attr("y", function (d, i) {
                return y(d[params.realValue])
            })
            .attr("width", function (d, i) {
                return x.rangeBand()
            })
            .attr("height", function (d) {
                return params.height - y(d[params.realValue])
            })
            .style("fill", function (d, i) {
                return params.ordinalScaleColor(i)
            });

        this.selectAll(".bar-label")
            .attr("x", function (d, i) {
                return x(d[params.realTitle]) + (x.rangeBand() / 2)
            })
            .attr("dx", 0) //-4
            .attr("y", function (d, i) {
                return y(d[params.realValue])
            })
            .attr("dy", function (d, i) {
                // return y(1)/1.5 //linear scale
                //return y.rangeBand()/1.5 //params.ordinal scale
                return -6
            })
            .text(function (d, i) {
                return d[params.realValue]
            })
            .attr('opacity', 0)
            .transition()
                .delay(function(d,i){return i *300;})
                .duration(1000)
                .attr("opacity", 1);

        //updateDimensions(params, window.innerWidth)

        //exit
        this.selectAll(".bar")
            .data(parametres.data)
            .exit()
            .remove();

        this.selectAll(".bar-label")
            .data(parametres.data)
            .exit()
            .remove()

    }

    plot.call(chart, {
        data: params.dataToTreat,
        axis: {
            x: xAxis,
            y: yAxis
        },
        gridlines: yGridlines,
        initialize: true
    })
}
