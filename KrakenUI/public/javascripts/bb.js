﻿(function ($) {
    $(function () {
        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var data = $('#bb').data().bb;//[["9/13/2012", 177.35], ["9/14/2012", 175.85], ["9/17/2012", 173.65], ["9/18/2012", 175.4], ["9/19/2012", 174.45], ["9/20/2012", 175], ["9/21/2012", 178.45], ["9/24/2012", 178], ["9/25/2012", 178.85], ["9/26/2012", 177.4], ["9/27/2012", 176.9], ["9/28/2012", 175.75], ["10/1/2012", 176.35], ["10/2/2012", 176], ["10/3/2012", 177.5], ["10/4/2012", 178], ["10/5/2012", 180.65], ["10/8/2012", 180.35], ["10/9/2012", 179.35], ["10/10/2012", 178.05], ["10/11/2012", 178.35], ["10/12/2012", 174.8], ["10/15/2012", 173.3], ["10/16/2012", 173], ["10/17/2012", 174.75], ["10/18/2012", 176.8], ["10/19/2012", 177.5], ["10/22/2012", 177.05], ["10/23/2012", 175], ["10/24/2012", 172.45], ["10/25/2012", 170.65], ["10/26/2012", 169.7], ["10/29/2012", 169.55], ["10/30/2012", 171.05], ["10/31/2012", 168.25], ["11/1/2012", 170], ["11/2/2012", 168.2], ["11/5/2012", 167.45], ["11/6/2012", 169], ["11/7/2012", 167.7], ["11/8/2012", 167.6], ["11/9/2012", 167.6], ["11/12/2012", 166.6], ["11/13/2012", 162.5], ["11/14/2012", 160.9], ["11/15/2012", 159.15], ["11/16/2012", 157.8], ["11/19/2012", 160.5], ["11/20/2012", 162.3], ["11/21/2012", 159.15], ["11/22/2012", 158.3], ["11/23/2012", 158.7], ["11/26/2012", 157.65], ["11/27/2012", 156.9], ["11/28/2012", 158.25], ["11/29/2012", 160.3], ["11/30/2012", 161.15], ["12/3/2012", 160.9], ["12/4/2012", 159.55], ["12/5/2012", 159.35], ["12/6/2012", 161.45], ["12/7/2012", 161.85], ["12/10/2012", 161.55], ["12/11/2012", 161.3], ["12/12/2012", 161.55], ["12/13/2012", 162.5], ["12/14/2012", 160.95], ["12/17/2012", 158.2], ["12/18/2012", 156.25], ["12/19/2012", 156.65], ["12/20/2012", 155.8], ["12/21/2012", 155.6], ["12/24/2012", 156.3], ["12/25/2012", 156.3], ["12/26/2012", 156.3], ["12/27/2012", 156.05], ["12/28/2012", 155.4], ["12/31/2012", 154.45], ["1/1/2013", 154.45], ["1/2/2013", 157.45], ["1/3/2013", 157.4], ["1/4/2013", 160.05], ["1/7/2013", 159.65], ["1/8/2013", 162.4], ["1/9/2013", 165.5], ["1/10/2013", 164.5], ["1/11/2013", 165.2], ["1/14/2013", 163.85], ["1/15/2013", 163], ["1/16/2013", 160], ["1/17/2013", 160.65], ["1/18/2013", 161.85], ["1/21/2013", 162.25], ["1/22/2013", 162.4], ["1/23/2013", 163.45], ["1/24/2013", 168.65], ["1/25/2013", 170.25], ["1/28/2013", 171.1], ["1/29/2013", 172.9], ["1/30/2013", 173.5], ["1/31/2013", 172.1], ["2/1/2013", 173.45], ["2/4/2013", 170.5], ["2/5/2013", 171.25], ["2/6/2013", 170.35], ["2/7/2013", 171.85], ["2/8/2013", 173.9], ["2/11/2013", 173.65], ["2/12/2013", 173.5], ["2/13/2013", 171.65], ["2/14/2013", 167.55], ["2/15/2013", 167.8], ["2/18/2013", 166.8], ["2/19/2013", 163.5], ["2/20/2013", 162.5], ["2/21/2013", 160], ["2/22/2013", 163.05], ["2/25/2013", 164.1], ["2/26/2013", 161.9], ["2/27/2013", 165.1], ["2/28/2013", 165.55], ["3/1/2013", 168.3], ["3/4/2013", 167.7], ["3/5/2013", 168.6], ["3/6/2013", 180], ["3/7/2013", 178.6], ["3/8/2013", 184.35], ["3/11/2013", 185.75], ["3/12/2013", 185], ["3/13/2013", 182.25], ["3/14/2013", 184.55], ["3/15/2013", 183.25], ["3/18/2013", 184.95], ["3/19/2013", 187.6], ["3/20/2013", 185.8], ["3/21/2013", 183.55], ["3/22/2013", 183.45], ["3/25/2013", 187.2], ["3/26/2013", 187.75], ["3/27/2013", 186], ["3/28/2013", 186.6], ["3/29/2013", 186.6], ["4/1/2013", 186.6], ["4/2/2013", 192], ["4/3/2013", 186.15], ["4/4/2013", 184.8], ["4/5/2013", 182.6], ["4/8/2013", 184.8], ["4/9/2013", 187.5], ["4/10/2013", 189.2], ["4/11/2013", 189.8], ["4/12/2013", 190.55], ["4/15/2013", 191], ["4/16/2013", 189.9], ["4/17/2013", 189.25], ["4/18/2013", 192.5], ["4/19/2013", 193.25], ["4/22/2013", 194.8], ["4/23/2013", 195.05], ["4/24/2013", 193.2], ["4/25/2013", 196.4], ["4/26/2013", 197.2], ["4/29/2013", 196.85]];

        data.forEach(function (d) {
            //debugger;
            d.date = new Date(d[0]);//parseDate(d[0]);
            d.close = parseFloat(d[1]);
        })

        var bbParams = $('#bbParams').data();
        var n = bbParams && Number($('#bbParams').data().bbparams.n) > 0 ? $('#bbParams').data().bbparams.n : Math.round(35); // n-period of moving average
        var k = bbParams && Number($('#bbParams').data().bbparams.k) > 0? $('#bbParams').data().bbparams.k : Math.round(2); // k times n-period standard deviation above/below moving average

        var parseDate = d3.time.format("%m/%d/%Y").parse;

        var x = d3.time.scale()
            .range([0, width]);
        var y = d3.scale.linear()
            .range([height, 0]);
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickSize(3, 0);
        var line = d3.svg.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.close);
            });
        var ma = d3.svg.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.ma);
            });
        var lowBand = d3.svg.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.low);
            });
        var highBand = d3.svg.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.high);
            });
        var bandsArea = d3.svg.area()
            .x(function (d) {
                return x(d.date);
            })
            .y0(function (d) {
                return y(d.low);
            })
            .y1(function (d) {
                return y(d.high);
            });

        var svg = d3.select("#bb").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");        

        var bandsData = getBollingerBands(n, k, data);
        console.log(bandsData)

        x.domain(d3.extent(data, function (d) {
            return d.date;
        }));
        y.domain([d3.min(bandsData, function (d) {
            return d.low;
        }),
            d3.max(bandsData, function (d) {
                return d.high;
            })
        ]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.append("path")
            .datum(bandsData)
            .attr("class", "area bands")
            .attr("d", bandsArea);
        svg.append("path")
            .datum(bandsData)
            .attr("class", "line bands")
            .attr("d", lowBand);
        svg.append("path")
            .datum(bandsData)
            .attr("class", "line bands")
            .attr("d", highBand);
        svg.append("path")
            .datum(bandsData)
            .attr("class", "line ma bands")
            .attr("d", ma);

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);


        function getBollingerBands(n, k, data) {
            var bands = []; //{ ma: 0, low: 0, high: 0 }
            //debugger
            for (var i = n - 1, len = data.length; i < len; i++) {
                try {
                    var slice = data.slice(i + 1 - n, i);
                    var mean = d3.mean(slice, function (d) {
                        return d.close;
                    });
                    var stdDev = Math.sqrt(d3.mean(slice.map(function (d) {
                        return Math.pow(d.close - mean, 2);
                    })));
                    bands.push({
                        date: data[i].date,
                        ma: mean,
                        low: mean - (k * stdDev),
                        high: mean + (k * stdDev)
                    });
                } catch (e) {
                    console.log(i,e);
                }                
            }
            return bands;
        }
    });
})(window.jQuery)