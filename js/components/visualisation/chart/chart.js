/**
 * Draw map
 *
 * @return null
 */
function drawGraph(dataToTreat, metadata, box) {
    var level = 0

    if (metadata.graph.dataComposition.category0) {
        initNewGraph(dataToTreat,metadata,box,0)
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
                    initBar(dataToTreat, metadata, box, level);
                    break;
                case "pie":
                    //exit
                    d3.selectAll("svg").remove();
                    d3.selectAll(".chart>p").remove();
                    initPie(dataToTreat, metadata, box, level);
                    break;
                case "doughnut":
                    //exit
                    d3.selectAll("svg").remove();
                    d3.selectAll(".chart>p").remove();
                    initdoughnut(dataToTreat, metadata, box, level);
                    break;
                case "horizontalBar":
                    //exit
                    d3.selectAll("svg").remove();
                    d3.selectAll(".chart>p").remove();
                    initHorizontalBar(dataToTreat, metadata, box, level);
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
