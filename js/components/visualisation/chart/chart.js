/**
 * Draw map
 *
 * @return null
 */
function drawGraph(dataToTreat, metadata, box) {
    var level = 0
    var previousValues=[]
    var params = getParams(dataToTreat,metadata,0)

    if (metadata.graph.dataComposition.category0) {
        initNewGraph(params,metadata,box,0, previousValues)
    }
    else {
        var select = d3.select('#' + box)
            .append('select')
            .classed('selectGraph', true)
            .on('change', onChange);

        var options = select.selectAll('option')
            .data(metadata.graph.possibleGraphs).enter()
            .append('option')
            .attr("value", function (d) {
                return d
            })
            .text(function (d) {
                return d
            });

        function onChange() {
            var selectValue = d3.select('.selectGraph').property('value');
            console.log(selectValue);
            switch (selectValue) {
                case "bar":
                    //exit
                    d3.selectAll("svg").remove();
                    d3.selectAll(".chart>p").remove();
                    initBar(params, metadata, box, level, previousValues);
                    break;
                case "pie":
                    //exit
                    d3.selectAll("svg").remove();
                    d3.selectAll(".chart>p").remove();
                    initPie(params, metadata, box, level, previousValues);
                    break;
                case "doughnut":
                    //exit
                    d3.selectAll("svg").remove();
                    d3.selectAll(".chart>p").remove();
                    initdoughnut(params, metadata, box, level, previousValues);
                    break;
                case "horizontalBar":
                    //exit
                    d3.selectAll("svg").remove();
                    d3.selectAll(".chart>p").remove();
                    initHorizontalBar(params, metadata, box, level, previousValues);
                    break;
                default:
                    d3.selectAll("svg").remove();
                    d3.selectAll(".chart>p").remove();

                    d3.select("'#" + box + "'")
                        .append('p')
                        .text("Veuillez séléctionner un type de graphe avant de continuer.")
            }
        }

        onChange()
    }
}
