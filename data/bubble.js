d3.csv('rank.csv').then((data) => {
	// set the dimensions and margins of the graph
	const margin = {top: 50, right: 50, bottom: 60, left: 100},
	width = 800 - margin.left - margin.right,
	height = 620 - margin.top - margin.bottom;

	let timeParse = d3.timeParse("%Y")

	for (let d of data) {
		d.Sales = +d.Sales;
		d.Rank = +d.Rank; 
        d.Year = timeParse(d.Year);
    }

	// append the svg object to the body of the page
	const svg = d3.select("#bubble_chart")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);

	// Add a title
	svg.append("text")
		.attr("x", (width + margin.left - margin.right) / 2.3)
		.attr("y", -30)
		.attr("text-anchor", "middle")
		.style("font-size", "25px")
		.style('fill', titles_color)
		.attr('font-weight','bold')
		.text("Top 30 Most Sold Video Games of All Times");

	// Add x axis
	const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.Year))
        .range([0, width - margin.right]);

	svg.append("g")
		.attr("transform", `translate(0, ${ height })`)
		.call(d3.axisBottom(x)
			.ticks(d3.timeYear.every(5)))
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("dx", "1em")
		.attr("dy", "1em")
		.style("font-size","18px");

	// Add x axis label
	svg.append("text")                  
		.attr("class", "x-label")
		.attr("text-anchor", "end")
		.attr("x", width - 60)
		.attr("y", height + 60)
		.attr("dx", "0.5em")
		.attr("dy", "-0.5em")
		.style("font-size", "18px")
		.text("Year")
		.style('fill', titles_color);

	// Add Y axis
	const y = d3.scaleLinear()
		.domain([d3.min(data, d => d.Rank) - 2, d3.max(data, d => d.Rank) + 2])
		.range([ 0, height]);
	
	svg.append("g")
		.call(d3.axisLeft(y).tickValues([]))
		.call(g => g.select(".domain").remove());

	// Add Y axis labels (2)
	svg.append("text")
		.attr("class", "y-label")
		.attr("text-anchor", "end")
		.attr("x", margin.top - 50)
		.attr("dx", "-0.5em")
		.attr("y", -40)
		.attr("transform", "rotate(-90)")
		.style("font-size","18px")
		.text("→ Top")
		.style('fill', titles_color);
	
	svg.append("text")
		.attr("class", "y-label")
		.attr("text-anchor", "end")
		.attr("x", margin.top - 480)
		.attr("dx", "-0.5em")
		.attr("y", -40)
		.attr("transform", "rotate(-90)")
		.style("font-size","18px")
		.text("Bottom ←")
		.style('fill', titles_color);

	// Add a scale for bubble size
	const z = d3.scaleLinear()
		.domain(d3.extent(data, d => d.Sales))
		.range([10, 40]);

	// Add a scale for bubble color
	const myColor = d3.scaleOrdinal()
		.domain(["No", "Yes"])
		.range(["#F806CC","#00FFC6"]);

	// Create a tooltip div that is hidden by default:
	const tooltip = d3.select("#aux")
		.append("div")
		.style("opacity", 0)
		.attr("class", "tooltip")
		//.style('font-weight','bold')
		.style("background-color", "black")
		.style("border", "dashed")
		.style("border-width", "1px")
		.style("border-radius", "5px")
		.style("padding", "0px")
		.style("border-color", "white");
		
	// Create to functions to show / hide the tooltip
	const showTooltip = function(event, d) {
		tooltip
			.transition()
			.duration(1000)
		tooltip
			.style("opacity", 1)
			.html("<p><b>Rank: " + d.Rank 
				+ "</b></p><p><strong>Name</strong>: " + d.Name 
				+ "</p><p><strong>Sales</strong>: $" + d.Sales + " mill."
				+ "</p><p><strong>Publisher</strong>: " + d.Publisher
				+ "</p><p><strong>Genre</strong>: " + d.Genre
				+ "</p><p><strong>Developer</strong>: " + d.Developer + "<\p>");
	}

	const hideTooltip = function(event, d) {
		tooltip
			.transition()
			.duration(200)
			.style("opacity", 0)
	}
	// Add dots
	svg.append('g')
		.selectAll("dot")
		.data(data)
		.join("circle")
		.attr("class", "bubbles")
		.attr("cx", d => x(d.Year))
		.attr("cy", d => y(d.Rank))
		.attr("r", d => z(d.Sales))
		.style("fill", d => myColor(d.Flag))
		// Trigger the functions
		.on("mouseover", showTooltip )
		//.on("mouseleave", hideTooltip ) // I want to maintain the tooltip visible
})

d3.selectAll("#ref")
	.append("div")
	.html(sourceHTML);
