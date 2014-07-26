var dataSet = [5, 10, 15, 20, 25];
var dataSet2 = [25, 7, 5, 26, 11, 8, 25, 14, 23, 19,
                14, 11, 22, 29, 11, 13, 12, 17, 18, 10,
                24, 18, 25, 9, 10];

//make a random dataset
var dataSet3 = []
for (var i = 0; i < 25; i++) {
    var newNumber = Math.floor(Math.random() * 30);
    dataSet3.push(newNumber);
}

// http://www.whitehouse.gov/facts/json/progress/all

//Make a bar graph using your random dataset
d3.select('#barGraph').selectAll('p')
	.data(dataSet3)
	.enter()
	.append('div')
	.classed('bar', true)
	.style('height', function(d){
		return d*5 + "px";
	});

//svg time!
var w = 500,
		h = 200,
		circleColor = 'blue',
		strokeColor = 'yellow',
		padding = 1;

var circlesvg = d3.select('body')
			.append('svg')
			.attr('width', w)
			.attr('height', h);


// circle time!
circles = circlesvg.selectAll('circle')
						.data(dataSet)
						.enter()
						.append('circle');

circles.attr('cx', function(d, i){
					return (i*75) + 25;
				})
				.attr('cy', h/2)
				.attr('r', function(d){
					return d
				})
				.attr('stroke', strokeColor)
				.attr('stroke-width', function(d){
					return d/2
				})
				// .attr('opacity', '.5')
				.attr('fill', circleColor);


var barsvg = d3.select('body')
			.append('svg')
			.attr('width', w)
			.attr('height', h);

//an svg bar chart
bars = barsvg.selectAll('rect')
				.data(dataSet2)
				.enter()
				.append('rect');

bars.attr({
	'x': function(d, i){return i*(w / dataSet2.length)},
	'y': function(d){return h - (d * 4);},
	'width': w / dataSet2.length - padding,
	'height': function(d){return (d * 4)},
	'fill': function(d){return 'rgb(0,0,' + (d*10) + ')'}
})
.text(function(d){
	return d;
});


text = svg.selectAll('text')
				.data(dataSet2)
				.enter()
				.append('text')
				.text(function(d){
					return d;
				})

text.attr({
	'x': function(d, i){return i * (w / dataSet2.length) + (w / dataSet3.length - padding) / 2},
	'y': function(d){return h - (d * 4) + 14;},
	'font-family': 'sans-serif',
	'font-size': '11px',
	'fill': 'white',
	'text-anchor': 'middle'
})