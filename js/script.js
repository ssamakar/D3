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

//svg time! here we define svg variables we'll reuse again and again.
var w = 500,
		h = 200,
		circleColor = 'blue',
		strokeColor = 'yellow',
		padding = 1;


//inserting an svg element into the #balls div.
//we're using the variables we defined just up above.
var circlesvg = d3.select('#balls')
			.append('svg')
			.attr('width', w)
			.attr('height', h);


// circle time!
// appending one circle for each piece of data in our dataset
circles = circlesvg.selectAll('circle')
						.data(dataSet)
						.enter()
						.append('circle');

//modifying attributes of the circles.
circles.attr('cx', function(d, i){
					return (i*75) + 25;
				})
				.attr('cy', h/1.5)
				.attr('r', function(d){
					return d
				})
				.attr('stroke', strokeColor)
				.attr('stroke-width', function(d){
					return d/2
				})
				// .attr('opacity', '.5')
				.attr('fill', circleColor);


//now let's make a bar graph using SVG rectangles instead of divs.
var barsvg = d3.select('#barGraphSVG')
			.append('svg')
			.attr('width', w)
			.attr('height', h);


//create one rectangle for each data point.
bars = barsvg.selectAll('rect')
				.data(dataSet2)
				.enter()
				.append('rect');

//adjust the attributes of the bars.
//you'll notice this notation is different than how we adjusted the circle attributes. both ways work but this way is cleaner imo.
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


//let's add some text to each bar.
text = barsvg.selectAll('text')
				.data(dataSet2)
				.enter()
				.append('text')
				.text(function(d){
					return d;
				})
//and adjust the text's attributes.
text.attr({
	'x': function(d, i){return i * (w / dataSet2.length) + (w / dataSet2.length - padding) / 2},
	'y': function(d){return h - (d * 4) + 14;},
	'font-family': 'sans-serif',
	'font-size': '11px',
	'fill': 'white',
	'text-anchor': 'middle'
})