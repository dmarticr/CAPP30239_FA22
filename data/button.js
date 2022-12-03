const data1 = [
	{'group': 'Action', 'value': 1564.07},
	{'group': 'Action-Adventure', 'value': 375.5},
	{'group': 'Adventure', 'value': 527.5600000000001},
	{'group': 'Board Game', 'value': 0.32},
	{'group': 'Education', 'value': 1.4},
	{'group': 'Fighting', 'value': 550.56},
	{'group': 'MMO', 'value': 54.87},
	{'group': 'Misc', 'value': 921.52},
	{'group': 'Music', 'value': 64.8},
	{'group': 'Party', 'value': 93.99},
	{'group': 'Platform', 'value': 1079.2},
	{'group': 'Puzzle', 'value': 247.02},
	{'group': 'Racing', 'value': 846.26},
	{'group': 'Role-Playing', 'value': 1265.39},
	{'group': 'Sandbox', 'value': 4.31},
	{'group': 'Shooter', 'value': 1435.41},
	{'group': 'Simulation', 'value': 546.85},
	{'group': 'Sports', 'value': 1462.07},
	{'group': 'Strategy', 'value': 309.46},
	{'group': 'Visual Novel', 'value': 8.85}
];
 
const data2 = [
	{'group': 'North America', 'value': 3377.379999999999},
	{'group': 'Europe', 'value': 1934.8300000000002},
	{'group': 'Japan', 'value': 686.15},
	{'group': 'Other', 'value': 657.78},
	{'group': 'Unclassified', 'value': 4700.5199999999995}
];

const data3 = [
	{'group': 'Action', 'value': 44.77},
	{'group': 'Action-Adventure', 'value': 68.71},
	{'group': 'Adventure', 'value': 123.59},
	{'group': 'Education', 'value': 0.09},
	{'group': 'Fighting', 'value': 88.05},
	{'group': 'Misc', 'value': 196.51},
	{'group': 'Music', 'value': 8.59},
	{'group': 'Party', 'value': 50.12},
	{'group': 'Platform', 'value': 552.89},
	{'group': 'Puzzle', 'value': 101.59},
	{'group': 'Racing', 'value': 207.79},
	{'group': 'Role-Playing', 'value': 420.54},
	{'group': 'Shooter', 'value': 86.62},
	{'group': 'Simulation', 'value': 133.89000000000001},
	{'group': 'Sports', 'value': 236.52},
	{'group': 'Strategy', 'value': 31.060000000000002}
];
 
const data4 = [
	{'group': 'North America', 'value': 54.11000000000001},
	{'group': 'Europe', 'value': 23.1},
	{'group': 'Japan', 'value': 60.010000000000005},
	{'group': 'Other', 'value': 5.11},
	{'group': 'Unclassified', 'value': 2208.9}
];


// set the dimensions and margins of the graph
const margin = {top: 80, right: 30, bottom: 130, left: 70},
	width = 500 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#button_chart")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", `translate(${margin.left},${margin.top})`);
	//.attr('font-weight','bold')

svg.append("text")
	.attr("x", (width + margin.left + margin.right) / 2.4)
	.attr("y", -25)
	.attr("text-anchor", "middle")
	.style("font-size", "25px")
	.style('fill', titles_color)
	.attr('font-weight','bold')
	.text("Total Sales by Category (Whole Market)");

svg.append("text")
	.attr("class", "y-label")
	.attr("text-anchor", "end")
	.attr("x", margin.top - 70)
	.attr("dx", "-0.5em")
	.attr("y", -60)
	.attr("transform", "rotate(-90)")
	.style("font-size", "16px")
	.style("font-weight", "normal")
	.text("US Millions")
	.style('fill', titles_color);
	
// Initialize the X axis
const x = d3.scaleBand()
	.range([0, width])
	.padding(0.1);

const xAxis = svg.append("g")
  	.attr("transform", `translate(0,${height + 3})`);

// Initialize the Y axis
const y = d3.scaleLinear()
   	.range([height, 0]);

const yAxis = svg.append("g")
   .attr("class", "myYaxis")
 
// A function that create / update the plot for a given variable:
function update(data) {
   	// Update the X axis
   	x.domain(data.map(d => d.group))

   	xAxis.call(d3.axisBottom(x))
		.selectAll("text")  
		.style("text-anchor", "end")
		.attr("dx", "-.8em")
		.attr("dy", ".15em")
		.attr("transform", "rotate(-65)")
		.style("font-size","16px");
 
	// Update the Y axis
	y.domain([0, d3.max(data, d => d.value) ]);

   	yAxis.transition()
   		.duration(1000)
		.call(d3.axisLeft(y).tickFormat(d => "$" + d))
		//.attr('font-weight','bold')
		.selectAll("text")
		.style("font-size", "16px");
 
	// Create the u variable
	var u = svg.selectAll("rect")
	 	.data(data)
 
	// Add a new rect for each new elements
   	u.join("rect")
		.transition()
		.duration(1000)
		.attr("x", d => x(d.group))
		.attr("y", d => y(d.value))
		.attr("width", x.bandwidth())
		.attr("height", d => height - y(d.value))
		.attr("fill", color_button_chart);
}

// Initialize the plot with the first dataset
update(data1)

d3.select("#button_chart")
	.append("div")
	.html(sourceHTML);
