function change(region) {

    //console.log("region", region);

    var data0 = path.data(),
        data1 = pie(region.values);

    //console.log("data0",data0);
    //console.log("data1", data1);

    path = path.data(data1, key);

    path.enter().append("path")
        .each(function (d, i) {
            this._current = findNeighborArc(i, data0, data1, key) || d;
        })
        .attr("fill", function (d) {
            return color(d.data.region);
        })
        .append("title")
        .text(function (d) {
            return d.data.region;
        });

    path.exit()
        .datum(function (d, i) {
            return findNeighborArc(i, data1, data0, key) || d;
        })
        .transition()
        .duration(750)
        .attrTween("d", arcTween)
        .remove();

    path.transition()
        .duration(750)
        .attrTween("d", arcTween);
}

function key(d) {
    return d.data.region;
}

function type(d) {
    d.count = +d.count;
    return d;
}

function findNeighborArc(i, data0, data1, key) {
    var d;
    return (d = findPreceding(i, data0, data1, key)) ? {startAngle: d.endAngle, endAngle: d.endAngle}
        : (d = findFollowing(i, data0, data1, key)) ? {startAngle: d.startAngle, endAngle: d.startAngle}
            : null;
}

// Find the element in data0 that joins the highest preceding element in data1.
function findPreceding(i, data0, data1, key) {
    var m = data0.length;
    while (--i >= 0) {
        var k = key(data1[i]);
        for (var j = 0; j < m; ++j) {
            if (key(data0[j]) === k) return data0[j];
        }
    }
}

// Find the element in data0 that joins the lowest following element in data1.
function findFollowing(i, data0, data1, key) {
    var n = data1.length, m = data0.length;
    while (++i < n) {
        var k = key(data1[i]);
        for (var j = 0; j < m; ++j) {
            if (key(data0[j]) === k) return data0[j];
        }
    }
}

function arcTween(d) {
    var i = d3.interpolate(this._current, d);
    this._current = i(0);
    return function (t) {
        return arc(i(t));
    };
}