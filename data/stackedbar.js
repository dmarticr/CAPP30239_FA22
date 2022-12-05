let sourceHTML = `<p style="background-color:black; color: white; text-align:center"><i>Data Source: <a href="https://www.vgchartz.com" target="_blank" rel="noopener noreferrer">VGChartz</a></i></p>`;
let color_palete = ["#F806CC","#FAEA48","#3330E4","#72FFFF","#FF8624","#9900F0","#00FFC6","#E8FFC2","#FF1700","#06FF00","#EEEEEE"]
let titles_color =  '#B4AEE8'
let color_button_chart = "#FF577F"

d3.select("#d1").on("click", function() {
	stacked_bar_fn("g11.csv");
	sunburst_fn('tree.json');
});

d3.select("#d2").on("click", function() {
	stacked_bar_fn("g11_alt.csv");
	sunburst_fn('tree_alt.json');
});

function stacked_bar_fn(file) {
	d3.select("#stackedbar > *").remove();
	// set the dimensions and margins of the graph
	const margin = {top: 30, right: 0, bottom: 45, left: 65},
		width =  620 - margin.left - margin.right,
		height = 490 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	const svg = d3.select("#stackedbar")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);

	// Add Title
	svg.append("text")
		.attr("x", (width + margin.left + margin.right) / 3.8)
		.attr("y", -10)
		.attr("text-anchor", "middle")
		.style("font-size", "25px")
		.style('fill', titles_color)
		.attr('font-weight','bold')
		.text("Sales by Release Year");

	// Add X axis
	const x = d3.scaleBand()
				.range([0, 300])
				.padding([0.2])
	
	const xAxis = svg.append("g")
		.attr("transform", `translate(0, ${height + 3})`);

	// Add Y axis
	const y = d3.scaleLinear()
              	.domain([0, 800])
             	.range([height, 0 ]);

	const yAxis = svg.append("g")
		.call(d3.axisLeft(y).tickFormat(d => "$" + d))
		//.attr('font-weight','bold')
		.selectAll("text")
		.style("font-size", "16px");

	// Text of axis
	svg.append("text")                  
		.attr("class", "x-label")
		.attr("text-anchor", "end")
		.attr("x", width - 265)
		.attr("y", height + 50)
		.attr("dx", "0.5em")
		.attr("dy", "-0.5em")
		.style("font-size", "16px")
		.text("Year")
		.style('fill', titles_color);
	
	svg.append("text")
		.attr("class", "y-label")
		.attr("text-anchor", "end")
		.attr("x", margin.top - 20)
		.attr("dx", "-0.5em")
		.attr("y", -55)
		.attr("transform", "rotate(-90)")
		.style("font-size","16px")
		.text("US Millions")
		.style('fill', titles_color);
	
	d3.csv(file).then( function(data) {
		// List of subgroups = header of the csv files
		const subgroups = data.columns.slice(1)

		// List of groups = value of the first column called group -> I show them on the X axis
		const groups = data.map(d => d.Year)

		// Update x
		x.domain(groups)

		xAxis.call(d3.axisBottom(x)
					.tickValues(x.domain()
								.filter(function(d, i){ return !(i % 11)})
								)
					)
			.selectAll("text")
			//.attr('font-weight','bold')
			.style("font-size","16px");

		// color palette = one color per subgroup
		const color = d3.scaleOrdinal()
						.domain(subgroups)
						//.range(d3.schemePastel2);
						.range(color_palete)

		//stack the data? --> stack per subgroup
		const stackedData = d3.stack().keys(subgroups)(data)

		svg.selectAll("mydots")
			.data(subgroups)
			.enter()
			.append("circle")
			.attr("cx", 310)
			.attr("cy", function(d, i) { return 10 + i * 25 }) 
			// 325 is where the first dot appears. 25 is the distance between dots
			.attr("r", 5)
			.style("fill", function(d){ return color(d) });

		// Add one dot in the legend for each name.
		svg.selectAll("mylabels")
			.data(subgroups)
			.enter()
			.append("text")
			.attr("x", 320)
			.attr("y", function(d, i) { return 10 + i * 25})
			// 340 is where the first label appears. 25 is the distance between dots
			.style("fill", function(d){ return color(d)})
			.text(function(d){ return d})
			.attr("text-anchor", "left")
			.style("alignment-baseline", "middle")
			.attr('font-weight','bold')
			.style("font-size","18px");

		// Highlight a specific subgroup when hovered
		var mouseover = function(d) {
			// what subgroup are we hovering?
			const subGroupName = d3.select(this.parentNode).datum().key
			// Reduce opacity of all rect to 0.2
			d3.selectAll(".myRect").style("opacity", 0.2)
			// Highlight all rects of this subgroup with opacity 1.
			// It is possible to select them since they have a specific class = their name.
			d3.selectAll("." + subGroupName).style("opacity", 1) 
		};

		var mouseleave = function (d) {
			// When user do not hover anymore
			// Back to normal opacity: 1
			d3.selectAll(".myRect").style("opacity", 1.0)
		};

		// Show the bars
		svg.append("g")
			.selectAll("g")
			// Enter in the stack data = loop key per key = group per group
			.data(stackedData)
			.join("g")
			.attr("fill", d => color(d.key))
			.attr("class", d => "myRect " + d.key ) // Add a class to each subgroup: their name
			.selectAll("rect")
			// enter a second time = loop subgroup per subgroup to add all rectangles
			.data(d => d)
			.join("rect")
			.attr("x", d => x(d.data.Year))
			.attr("y", d => y(d[1]))
			//.transition()
			//.duration(900)
			.attr("height", d => y(d[0]) - y(d[1]))
			.attr("width", x.bandwidth())
			.attr("stroke", "black")
			.on("mouseover", mouseover)
      		.on("mouseleave", mouseleave);
	})
}

stacked_bar_fn('g11.csv')
