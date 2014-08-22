var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

var w = 600,
	h = 250,
	xScale = d3.scale.ordinal()
				.domain(d3.range(dataset.length))
				.rangeRoundBands([0, w], 0.05);

d3.select('#scaledPlot').selectAll('p')
	.data(dataset)
	.enter()
	.append('div')
	.classed('bar', true)
	.style('height', function(d){
		return d*5 + "px";
	});