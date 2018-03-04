function getValueTitle(dataToTreat, metadata){
    // load the data
    var realTitle = metadata.graph.dataComposition.title
    var realValue = metadata.graph.dataComposition.value

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
                return d[catProfondeur[0]]
            })
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
                dict.forEach(function (d2) {
                    if (d[realTitle] == d2[initValue]) {
                        d[realTitle] = d2[newValue]
                    }
                })

            })
        })
    }

    return {
        "realTitle":realTitle,
        "realValue":realValue,
        "dataToTreat":dataToTreat
    }
}

function getParams(dataToTreat, metadata) {
    var COLORHOVER = "brown"
    var valueTitle = getValueTitle(dataToTreat,metadata)
    var dataToTreat = valueTitle.dataToTreat
    var originalData = dataToTreat
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
    var newDataToTreat
    return {
        "realTitle": valueTitle.realTitle,
        "realValue": valueTitle.realValue,
        "width":width,
        "height":height,
        "ordinalScaleColor":ordinalScaleColor,
        "margin":margin,
        "w":w,
        "h":h,
        "COLORHOVER":COLORHOVER,
        "r":r,
        "originalData":originalData,
        "dataToTreat":dataToTreat
    }
}