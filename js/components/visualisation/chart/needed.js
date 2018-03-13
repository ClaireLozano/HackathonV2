function getValueTitle(dataToTreat, metadata, level, callback) {

    // load the data
    var realTitle = metadata.graph.dataComposition.title;
    var realValue = metadata.graph.dataComposition.value;

    dataToTreat.forEach(function (d) {
        d[realTitle] = d[realTitle];
        d[realValue] = d[realValue];
    });

    if (metadata.dictionnaireY) {
        var urlDict = metadata.dictionnaireY.link;
        var initValue = metadata.dictionnaireY.initValue;
        var newValue = metadata.dictionnaireY.newValue;

        // Get dictionnary
        getData(urlDict, function (dict) {

            dataToTreat.forEach(function (d, j, arrj) {
                dict.forEach(function (d2, i, arr) {
                    if (d[realTitle] == d2[initValue]) {
                        d[realTitle] = d2[newValue];
                    }

                    // If last element
                    if ((arr.length - 1 === i) && (arrj.length - 1 === j)) {
                        getDataToTreat(metadata, dataToTreat, function(dataToTreat) {
                            return callback({
                                "realTitle": realTitle,
                                "realValue": realValue,
                                "dataToTreat": dataToTreat
                            });
                        });
                    }
                })
            })
        })
    } else {
        getDataToTreat(metadata, dataToTreat, function(dataToTreat) {

            return callback({
                "realTitle": realTitle,
                "realValue": realValue,
                "dataToTreat": dataToTreat
            });
        });
    }
};

function getDataToTreat(metadata, dataToTreat, callback) {

    if (metadata.graph.dataComposition) {

        // Pourcours chaque value de data composition
        // Si une de valeur est 
        Object.keys(metadata.graph.dataComposition).forEach(function (value, j, arrj) {
            if (value.substring(0, 8) == "category") {
                tmp = metadata.graph.dataComposition[value];

                if (metadata.table.dataComposition[tmp]) {
                    dataToTreat.forEach(function (d, k, arrk) {
                        var aggreg = d[tmp][0];
                        if (d[tmp] === " ") {
                            d[tmp] = "AUTRE";
                        } else {
                            d[tmp] = metadata.table.dataComposition[tmp][aggreg];
                        }

                        // If last element
                        if ((arrj.length - 1 === j) && (arrk.length - 1 === k)) {
                            return callback(dataToTreat);
                        }
                    });
                } else {
                    // If last element
                    if (arrj.length - 1 === j) {
                        return callback(dataToTreat);
                    }
                }
            } else {

                // If last element
                if (arrj.length - 1 === j) {
                    return callback(dataToTreat);
                }
            }
        });

    // If no data composition, return the initial data
    } else {
        return callback(dataToTreat);
    }
};

function updateParams(params, level) {
    realTitle = params.metadata.graph.dataComposition.title;
    realValue = params.metadata.graph.dataComposition.value;

    if (params.metadata.graph.dataComposition['category' + level]) {
        realTitle = params.metadata.graph.dataComposition['category' + level];
    }

    params.realTitle = realTitle;
    params.realValue = realValue;
    return params;
}

function getParams(dataToTreat, metadata, level, callback) {
    var COLORHOVER = "brown"
    var originalData = dataToTreat

    getValueTitle(dataToTreat, metadata, level, function(valueTitle) {
        var dataToTreat = valueTitle.dataToTreat
        var w = 800, h = 500
        var margin = {
            top: 58,
            bottom: 150,
            left: 80,
            right: 40
        };

        var width = w - margin.left - margin.right
        var height = h - margin.top - margin.bottom
        var r = 200;
        var ordinalScaleColor = d3.scale.ordinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])

        return callback({
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
        });
    });
};

function updateDimensions(params, winWidth) {
    params.margin = {
        top: 58,
        bottom: 150,
        left: 80,
        right: 40
    };
    params.width = winWidth - params.margin.left - params.margin.right;
    params.height = 500 - params.margin.top - params.margin.bottom;
};

function initNewGraph(params, box, level, previousValues) {

    var catProfondeur = [];
    var idBox = "myBox" + box;

    for (value in params.metadata.graph.dataComposition) {
        if (value.substring(0, 8) == "category")
            catProfondeur.push(params.metadata.graph.dataComposition[value])
    }

    if (catProfondeur[level]) {
        d3.selectAll("#chart" + box).remove();
        d3.selectAll("#" + idBox).remove();
        //d3.selectAll(".chart>p").remove();
        for (var i = 0; i <= level; i++) {
            params = updateParams(params, i)
            params.dataToTreat = params.originalData

            for (var j = 1; j <= i; j++) {
                params.dataToTreat = params.dataToTreat.filter(function (d) {
                    return d[params.metadata.graph.dataComposition["category" + (j - 1)]] === previousValues[j - 1];
                });
            }

            if (params.metadata.graph.possibleGraphs[i] !== "table") {
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
                params.dataToTreat = nested;
            }

            params.realValue = "values";
            params.realTitle = "key";

            params.dataToTreat.sort(function(a,b){
                return d3.ascending(a[params.realValue], b[params.realValue]);
            });

            switch (params.metadata.graph.possibleGraphs[i]) {
                case "bar":
                    initBar(params, box, i, previousValues);
                    break;
                case "pie":
                    initPie(params, box, i, previousValues);
                    break;
                case "doughnut":
                    initdoughnut(params, box, i, previousValues);
                    break;
                case "horizontalBar":
                    initHorizontalBar(params, box, i, previousValues);
                    break;
                case "table":
                    $("#"+box).append("<div id="+idBox+"></div>");
                    drawTable(params.dataToTreat, params.metadata, idBox);
                    break;
            }
        }
    }

}