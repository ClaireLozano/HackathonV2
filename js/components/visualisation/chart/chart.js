
/**
 * Draw map
 *
 * @return null
 */
function drawGraph(dataToTreat, metadata, box) {

    var select = d3.select('#' + box)
        .append('select')
        .classed('selectGraph', true)
        .on('change', onChange)

    var options = select.selectAll('option')
        .data(metadata.graph.possibleGraphs).enter()
        .append('option')
        .attr("value", function (d) {
            return d
        })
        .text(function (d) {
            return d
        })

    function onChange() {
        var selectValue = d3.select('.selectGraph').property('value')
        console.log(selectValue)
        switch (selectValue) {
            case "bar":
                initBar(dataToTreat, metadata, box)
                break
            case "pie":
                initPie(dataToTreat, metadata, box)
                break
            case "doughnut":
                initdoughnut(dataToTreat, metadata, box)
                break
            case "horizontalBar":
                initHorizontalBar(dataToTreat, metadata, box)
                break
            default:
                d3.selectAll("svg").remove()
                d3.selectAll(".chart>p").remove()

                d3.select("'#" + box + "'")
                    .append('p')
                    .text("Veuillez séléctionner un type de graphe avant de continuer.")
        }
    }
    onChange()
}
