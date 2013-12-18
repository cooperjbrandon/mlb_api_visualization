d3.custom = {};

d3.custom.barChart = function module() {
    var margin = {top: 20, right: 20, bottom: 40, left: 40},
        width = 500,
        height = 500,
        gap = 0,
        ease = 'cubic-in-out';
    var svg, duration = 500;

    var dispatch = d3.dispatch('customHover');
    function exports(_selection) {
        _selection.each(function(_data) {
            var chartW = width - margin.left - margin.right,
                chartH = height - margin.top - margin.bottom;

            var x1 = d3.scale.ordinal()
                .domain(_data.map(function(d, i){ return i; }))
                .rangeRoundBands([0, chartW], .1);

            var y1 = d3.scale.linear()
                .domain([0, d3.max(_data, function(d, i){ return d; })])
                .range([chartH, 0]);

            var xAxis = d3.svg.axis()
                .scale(x1)
                .orient('bottom');

            var yAxis = d3.svg.axis()
                .scale(y1)
                .orient('left');

            var barW = chartW / _data.length;

            if(!svg) {
                svg = d3.select(this)
                    .append('svg')
                    .classed('chart', true);
                var container = svg.append('g').classed('container-group', true);
                container.append('g').classed('chart-group', true);
                container.append('g').classed('x-axis-group axis', true);
                container.append('g').classed('y-axis-group axis', true);
            }

            svg.transition().duration(duration).attr({width: width, height: height})
            svg.select('.container-group')
                .attr({transform: 'translate(' + margin.left + ',' + margin.top + ')'});

            svg.select('.x-axis-group.axis')
                .transition()
                .duration(duration)
                .ease(ease)
                .attr({transform: 'translate(0,' + (chartH) + ')'})
                .call(xAxis);

            svg.select('.y-axis-group.axis')
                .transition()
                .duration(duration)
                .ease(ease)
                .call(yAxis);

            var gapSize = x1.rangeBand() / 100 * gap;
            var barW = x1.rangeBand() - gapSize;
            var bars = svg.select('.chart-group')
                .selectAll('.bar')
                .data(_data);
            bars.enter().append('rect')
                .classed('bar', true)
                .attr({x: chartW,
                    width: barW,
                    y: function(d, i) { return y1(d); },
                    height: function(d, i) { return chartH - y1(d); }
                })
                .on('mouseover', dispatch.customHover);
            bars.transition()
                .duration(duration)
                .ease(ease)
                .attr({
                    width: barW,
                    x: function(d, i) { return x1(i) + gapSize/2; },
                    y: function(d, i) { return y1(d); },
                    height: function(d, i) { return chartH - y1(d); }
                });
            bars.exit().transition().style({opacity: 0}).remove();

            duration = 500;

        });
    };
    exports.width = function(_x) {
        if (!arguments.length) return width;
        width = parseInt(_x);
        return this;
    };
    exports.height = function(_x) {
        if (!arguments.length) return height;
        height = parseInt(_x);
        duration = 0;
        return this;
    };
    exports.gap = function(_x) {
        if (!arguments.length) return gap;
        gap = _x;
        return this;
    };
    exports.ease = function(_x) {
        if (!arguments.length) return ease;
        ease = _x;
        return this;
    };
    d3.rebind(exports, dispatch, 'on');
    return exports;
};

d3.custom.circleChart = function module() {
	function exports(_selection) {
		// Load the data.
		_selection.each(function(_data) {
console.log(_data)

		// Various accessors that specify the four dimensions of data to visualize.
			function x(d) { return d.start_speed; }
			function y(d) { return d.break_length; }
			function radius(d) { return d.result; }
			function color(d) { return d.pitch_type; }
			function key(d) { return d.description; }

			// Chart dimensions.
			var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5},
			    width = 960 - margin.right,
			    height = 500 - margin.top - margin.bottom;

			// Various scales. These domains make assumptions of data, naturally.
			var xScale = d3.scale.linear().domain([70, 105]).range([0, width]),
			    yScale = d3.scale.linear().domain([2, 12]).range([height, 0]),
			    radiusScale = d3.scale.sqrt().domain([0, 5e8]).range([0, 40]),
			    colorScale = d3.scale.category10();

			// The x & y axes.
			var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(20),
			    yAxis = d3.svg.axis().scale(yScale).orient("left");

			// Create the SVG container and set the origin.
			var svg = d3.select(this).append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			  .append("g")
			    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			// Add the x-axis.
			svg.append("g")
			    .attr("class", "x axis")
			    .attr("transform", "translate(0," + height + ")")
			    .call(xAxis);

			// Add the y-axis.
			svg.append("g")
			    .attr("class", "y axis")
			    .call(yAxis);

			// Add an x-axis label.
			svg.append("text")
			    .attr("class", "x label")
			    .attr("text-anchor", "end")
			    .attr("x", width)
			    .attr("y", height - 6)
			    .text("velocity of pitch (MPH)");

			// Add a y-axis label.
			svg.append("text")
			    .attr("class", "y label")
			    .attr("text-anchor", "end")
			    .attr("y", 6)
			    .attr("dy", ".75em")
			    .attr("transform", "rotate(-90)")
			    .text("length of break of pitch (inches)");

			// Add the year label; the value is set on transition.
			var label = svg.append("text")
			    .attr("class", "year label")
			    .attr("text-anchor", "end")
			    .attr("y", height - 24)
			    .attr("x", width)
			    .text(1);

			


			  // A bisector since many nation's data is sparsely-defined.
			  var bisect = d3.bisector(function(d) { return d[0]; });

			  // Add a dot per nation. Initialize the data at 1800, and set the colors.
			  var dot = svg.append("g")
			      .attr("class", "dots")
			    .selectAll(".dot")
			      .data(interpolateData(0))
			    .enter().append("circle")
			      .attr("class", "dot")
			      .style("fill", function(d) { return colorScale(color(d)); })
			      .call(position)
			      .sort(order);

			  // Add a title.
			  dot.append("title")
			      .text(function(d) { return d.name; });

			  // Add an overlay for the year label.
			  var box = label.node().getBBox();

			  var overlay = svg.append("rect")
			        .attr("class", "overlay")
			        .attr("x", box.x)
			        .attr("y", box.y)
			        .attr("width", box.width)
			        .attr("height", box.height)
			        .on("mouseover", enableInteraction);

			  // Start a transition that interpolates the data based on year.
			  svg.transition()
			      .duration(20000)
			      .ease("linear")
			      .tween("year", tweenYear)
			      .each("end", enableInteraction);

			  // Positions the dots based on data.
			  function position(dot) {
			    dot .attr("cx", function(d) { return xScale(x(d)); })
			        .attr("cy", function(d) { return yScale(y(d)); })
			        .attr("r", function(d) { return radiusScale(radius(d)); });
			  }

			  // Defines a sort order so that the smallest dots are drawn on top.
			  function order(a, b) {
			    return radius(b) - radius(a);
			  }

			  // After the transition finishes, you can mouseover to change the year.
			  function enableInteraction() {
			    var yearScale = d3.scale.linear()
			        .domain([0, 86])
			        .range([box.x + 10, box.x + box.width - 10])
			        .clamp(true);

			    // Cancel the current transition, if any.
			    svg.transition().duration(0);

			    overlay
			        .on("mouseover", mouseover)
			        .on("mouseout", mouseout)
			        .on("mousemove", mousemove)
			        .on("touchmove", mousemove);

			    function mouseover() {
			      label.classed("active", true);
			    }

			    function mouseout() {
			      label.classed("active", false);
			    }

			    function mousemove() {
			      displayYear(yearScale.invert(d3.mouse(this)[0]));
			    }
			  }

			  // Tweens the entire chart by first tweening the year, and then the data.
			  // For the interpolated data, the dots and label are redrawn.
			  function tweenYear() {
			    var year = d3.interpolateNumber(0, 86);
			    return function(t) { displayYear(year(t)); };
			  }

			  // Updates the display to show the specified year.
			  function displayYear(year) {
			    dot.data(interpolateData(year), key).call(position).sort(order);
			    label.text(Math.round(year));
			  }

			  // Interpolates the dataset for the given (fractional) year.
			  function interpolateData(year) {
			  	debugger;
			  	year = Math.floor(year);
			      return {
			        result: getRadius(_data[year].result),
			        pitch_type: _data[year].pitch_type,
			        start_speed: _data[year].start_speed,
			        break_length: _data[year].break_length,
			        description: _data[year].description
			      };
			  }

			  function getRadius(result) {
			  	var radius;

			  	if (result === 'S') { radius = 30; }
			  	else if (result === 'B') { radius = 20; }
			  	else { radius = 30; }

			  	return radius;
			  }

			  // Finds (and possibly interpolates) the value for the specified year.
			  function interpolateValues(values, year) {
			    var i = bisect.left(values, year, 0, values.length - 1),
			        a = values[i];
			    if (i > 0) {
			      var b = values[i - 1],
			          t = (year - a[0]) / (b[0] - a[0]);
			      return a[1] * (1 - t) + b[1] * t;
			    }
			    return a[1];
			  };
		});
	};
	return exports;
};
