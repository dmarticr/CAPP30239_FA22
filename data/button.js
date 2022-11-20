const data1 = [
	{group: 'Action', value: 54.09},
	{group: 'Action-Adventure', value: 230.18},
	{group: 'Adventure', value: 140.59},
	{group: 'Education', value: 0.09},
	{group: 'Fighting', value: 158.15},
	{group: 'Misc', value: 240.31},
	{group: 'Music', value: 13.64},
	{group: 'Party', value: 171.75},
	{group: 'Platform', value: 1106.15},
	{group: 'Puzzle', value: 661.05},
	{group: 'Racing', value: 387.49},
	{group: 'Role-Playing', value: 923.43},
	{group: 'Sandbox', value: 2.2},
	{group: 'Shooter', value: 118.6},
	{group: 'Simulation', value: 259.08},
	{group: 'Sports', value: 405.29},
	{group: 'Strategy', value: 51.06}
];
 
const data2 = [
	{group: 'North America', value: 3377.38},
	{group: 'Europe', value: 1934.83},
	{group: 'Japan', value: 686.1500000000001},
	{group: 'Other', value: 657.7800000000001},
	{group: 'Unclassified', value: 19034.140000000003}
];
 
// set the dimensions and margins of the graph
const margin = {top: 30, right: 30, bottom: 120, left: 65},
	width = 460 - margin.left - margin.right,
	height = 460 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#button_chart")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", `translate(${margin.left},${margin.top})`)
	.attr('font-weight','bold');

svg.append("text")
	.attr("class", "y-label")
	.attr("text-anchor", "end")
	.attr("x", margin.top - 15)
	.attr("dx", "-0.5em")
	.attr("y", -55)
	.attr("transform", "rotate(-90)")
	.style("font-size","15px")
	.text("US Millions")
	.style('fill', '#fddaec');
	
 // Initialize the X axis
 const x = d3.scaleBand()
	.range([ 0, width ])
	.padding(0.1);

 const xAxis = svg.append("g")
  	.attr("transform", `translate(0,${height + 1})`);

 
 // Initialize the Y axis
 const y = d3.scaleLinear()
   	.range([ height, 0]);

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
		.style("font-size","12px");
 
	// Update the Y axis
	y.domain([0, d3.max(data, d => d.value) ]);

   	yAxis.transition()
   		.duration(1000)
		.call(d3.axisLeft(y).tickFormat(d => "$" + d))
		.attr('font-weight','bold')
		.selectAll("text")
		.style("font-size", "12px");
 
	// Create the u variable
	var u = svg.selectAll("rect")
	 	.data(data)
 
   	u.join("rect") // Add a new rect for each new elements
		.transition()
		.duration(1000)
		.attr("x", d => x(d.group))
		.attr("y", d => y(d.value))
		.attr("width", x.bandwidth())
		.attr("height", d => height - y(d.value))
		.attr("fill", "#fb9a99");
 }

 // Initialize the plot with the first dataset
 update(data1)

d3.select("#button_chart")
	.append("div")
	.html(sourceHTML);
