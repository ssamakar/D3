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

var scatterplotData = [
                [480, 90], [250, 50], [100, 33], [330, 95],
                [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
              ];

// do something w this maybe i guess
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
		h = 150,
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
});

//let's make a scatterplot now.
scatterplotSVG = d3.select('#scatterplot')
	.append('svg')
	.attr({
		'width': w,
		'height': h
	});

scatterplotSVG.selectAll('circle')
	.data(scatterplotData)
	.enter()
	.append('circle')
	.attr({
		'cx': function(d){return d[0]},
		'cy': function(d){return d[1]},
		'r' : function(d){return Math.sqrt(h - d[1])}
	});

scatterplotSVG.selectAll('text')
	.data(scatterplotData)
	.enter()
	.append('text')
	.text(function(d){
		return d[0] + "," + d[1];
	})
	.attr({
		'x': function(d){return d[0]},
		'y': function(d){return d[1]},
		'font-family': 'sans-serif',
		'font-size': '11px',
		'fill': 'red'
	});


//let's learn to scale our scatterplot to fit our data.
//we're wrapping all of this in a function so we can call it with an html button later.
makeScatterplot = function(){
	scatterplotPadding = 30;

	//setting the domain and range of each scale
	xScale = d3.scale.linear()
				 .domain([0, d3.max(scatterplotData, function(d){
				 		return d[0] 
				 	})])
				 .range([scatterplotPadding, w - scatterplotPadding * 2]);

	yScale = d3.scale.linear()
				 .domain([0, d3.max(scatterplotData, function(d){
				 		return d[1]
				 })])
				 .range([h - scatterplotPadding, scatterplotPadding]);

	rScale = d3.scale.linear()
	             .domain([0, d3.max(scatterplotData, function(d){
	             	return d[1];
	         	 })])
	             .range([2, 5]);

    //appending an svg element
	scaledPlot = d3.select('#scaledPlot')
				 .append('svg')
				 .attr({
				 	'width': w,
				 	'height': h
				 });

	//creating a circle for every data point, then appending it.
	scaledPlot.selectAll('circle')
		.data(scatterplotData)
		.enter()
		.append('circle')
		.attr({
			'cx': function(d){return xScale(d[0])},
			'cy': function(d){return yScale(d[1])},
			'r': function(d){return rScale(d[1])}
		});

	scaledPlot.selectAll('text')
		.data(scatterplotData)
		.enter()
		.append('text')
		.text(function(d){
			return d[0] + "," + d[1];
		})
		.attr({
			'x': function(d){return xScale(d[0])},
			'y': function(d){return yScale(d[1])},
			'font-family': 'sans-serif',
			'font-size': '11px',
			'fill': 'red'
		});

	//let's make axes now.
	xAxis = d3.svg.axis();
	xAxis.scale(xScale)
		 .orient('bottom')
		 .ticks(10);

	yAxis = d3.svg.axis();
	yAxis.scale(yScale)
		 .orient('left')
		 .ticks(10);

	scaledPlot.append('g')
		.attr({
			'class': 'axis',
			'transform': 'translate(0,' + (h - scatterplotPadding) + ')'
		})
    	.call(xAxis);

	scaledPlot.append('g')
		.attr({
			'class': 'axis',
			'transform': 'translate(' + (scatterplotPadding) + ')'
		})
    	.call(yAxis);
};

makeScatterplot();



//now that we've scaled everything down, this button will add or remove some outliers to the scatterplot so we can watch it scale.

var outlierToggle = document.getElementById('outlierToggle')
addOutliers = function(){
	document.getElementById('scaledPlot').innerHTML = "";
	if (outlierToggle.checked == true){
		scatterplotData.push([900, 200]);
		scatterplotData.unshift([700, 100]);
		makeScatterplot();
	} else {
		scatterplotData.pop();
		scatterplotData.shift();
		makeScatterplot();
	}
};


//let's learn to use axes now.

