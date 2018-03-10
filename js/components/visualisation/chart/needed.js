function getValueTitle(dataToTreat, metadata, level) {
    // load the data
    var realTitle = metadata.graph.dataComposition.title
    var realValue = metadata.graph.dataComposition.value

    dataToTreat.forEach(function (d) {
        d[realTitle] = d[realTitle]
        d[realValue] = +d[realValue]
    })

    if (metadata.dictionnaireY) {
        var urlDict = metadata.dictionnaireY.link
        var initValue = metadata.dictionnaireY.initValue
        var newValue = metadata.dictionnaireY.newValue

        // Get dictionnary
        getData(urlDict, function (dict) {
            dataToTreat.forEach(function (d) {
                dict.forEach(function (d2) {
                    if (d[realTitle] == d2[initValue]) {
                        d[realTitle] = d2[newValue]
                    }
                })

            })
        })
    }

    return {
        "realTitle": realTitle,
        "realValue": realValue,
        "dataToTreat": dataToTreat
    }
}

function updateParams(params, level) {
    realTitle = params.metadata.graph.dataComposition.title
    realValue = params.metadata.graph.dataComposition.value

    if(params.metadata.graph.dataComposition['category'+level]){
        realTitle=params.metadata.graph.dataComposition['category'+level]
    }

    params.realTitle = realTitle
    params.realValue = realValue
    return params
}

function getParams(dataToTreat, metadata, level) {
    var COLORHOVER = "brown"
    var originalData = dataToTreat
    var valueTitle = getValueTitle(dataToTreat, metadata, level)
    var dataToTreat = valueTitle.dataToTreat
    var w = 800, h = 500
    var margin = {
        top: 58,
        bottom: 150,
        left: 80,
        right: 40
    }
    var width = w - margin.left - margin.right
    var height = h - margin.top - margin.bottom
    var r = 200;
    var ordinalScaleColor = d3.scale.ordinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])

    return {
        "realTitle": valueTitle.realTitle,
        "realValue": valueTitle.realValue,
        "width": width,
        "height": height,
        "ordinalScaleColor": ordinalScaleColor,
        "margin": margin,
        "w": w,
        "h": h,
        "COLORHOVER": COLORHOVER,
        "r": r,
        "originalData": originalData,
        "dataToTreat": dataToTreat,
        "metadata": metadata
    }
}

function initNewGraph(params, metadata, box, level, previousValues) {
    console.log(previousValues);

    var catProfondeur = []
    for (value in metadata.graph.dataComposition) {
        if (value.substring(0, 8) == "category")
            catProfondeur.push(metadata.graph.dataComposition[value])
    }

    if (catProfondeur[level]) {
        d3.selectAll("svg").remove();
        d3.selectAll(".chart>p").remove();
        for (var i = 0; i <= level; i++) {
            params = updateParams(params, i)
            params.dataToTreat = params.originalData
            for (var j = 1; j <= i; j++) {
                params.dataToTreat = params.dataToTreat.filter(function (d) {
                    return d[metadata.graph.dataComposition["category"+(j-1)]] === previousValues[j - 1]
                })
            }


            var nested = d3.nest()
                .key(function (d) {
                    return d[params.realTitle]
                })
                .rollup(function (v) {
                    return d3.sum(v, function (d) {
                            return d[params.realValue]
                        }
                    )
                })
                .entries(params.dataToTreat)

            params.realTitle="key";
            params.realValue="values";

            params.dataToTreat = nested;

            switch (metadata.graph.possibleGraphs[i]) {
                case "bar":
                    initBar(params, metadata, box, i, previousValues);
                    break;
                case "pie":
                    initPie(params, metadata, box, i, previousValues);
                    break;
                case "doughnut":
                    initdoughnut(params, metadata, box, i, previousValues);
                    break;
                case "horizontalBar":
                    initHorizontalBar(params, metadata, box, i, previousValues);
                    break;
            }
        }
    }

}