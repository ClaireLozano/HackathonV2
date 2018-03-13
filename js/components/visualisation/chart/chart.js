/**
 * Draw map
 *
 * @return null
 */
function drawGraph(dataToTreat, metadata, box) {
    var level = 0;
    var previousValues = [];

    getParams(dataToTreat, metadata, 0, function(params) {
        if (metadata.graph.dataComposition.category0) {
            initNewGraph(params, box, 0, previousValues);

        } else {
            var select = d3.select('#' + box)
                .append('select')
                .classed('selectGraph', true)
                .classed('form-control', true)
                .classed('input-sm', true)
                .on('change', onChange);

            var options = select.selectAll('option')
                .data(metadata.graph.possibleGraphs).enter()
                .append('option')
                .attr("value", function (d) {
                    return d;
                })
                .text(function (d) {
                    return d;
                });

            function onChange() {
                var selectValue = d3.select('.selectGraph').property('value');

                switch (selectValue) {
                    case "bar":
                        d3.selectAll("svg").remove();
                        d3.selectAll(".chart>p").remove();
                        initBar(params, box, level, previousValues);
                        break;
                    case "pie":
                        d3.selectAll("svg").remove();
                        d3.selectAll(".chart>p").remove();
                        initPie(params, box, level, previousValues);
                        break;
                    case "doughnut":
                        d3.selectAll("svg").remove();
                        d3.selectAll(".chart>p").remove();
                        initdoughnut(params, box, level, previousValues);
                        break;
                    case "horizontalBar":
                        d3.selectAll("svg").remove();
                        d3.selectAll(".chart>p").remove();
                        initHorizontalBar(params, box, level, previousValues);
                        break;
                    default:
                        d3.selectAll("svg").remove();
                        d3.selectAll(".chart>p").remove();
                        d3.select("'#" + box + "'")
                            .append('p')
                            .text("Veuillez séléctionner un type de graphe avant de continuer.");
                }
            }
            onChange()
        }
    });
};
