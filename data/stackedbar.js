d3.csv("g11.csv").then( function(data) {

	// set the dimensions and margins of the graph
	const margin = {top: 10, right: 30, bottom: 35, left: 70},
	width =  600 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	const svg = d3.select("#stackedbar")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);

	// List of subgroups = header of the csv files
	const subgroups = data.columns.slice(1)

	// List of groups = value of the first column called group -> I show them on the X axis
	const groups = data.map(d => d.Year)

	// Add X axis
	const x = d3.scaleBand()
				.domain(groups)
				.range([0, 300])
				.padding([0.2])
	
	svg.append("g")
		.attr("transform", `translate(0, ${height + 1})`)
		.attr("class", "x-axis")
		.attr('font-weight','bold')
		.call(d3.axisBottom(x)
				.tickValues(x.domain()
							 .filter(function(d, i){ return !(i % 10)})
							)
			)
		.selectAll("text")
		.style("font-size","12px");

	svg.append("text")                  
		.attr("class", "x-label")
		.attr("text-anchor", "end")
		.attr("x", width - 210)
		.attr("y", height + 40)
		.attr("dx", "0.5em")
		.attr("dy", "-0.5em")
		.style("font-size", "15px")
		.text("Year")
		.style('fill', '#fddaec');

	// Add Y axis
	const y = d3.scaleLinear()
              	.domain([0, 1600])
             	.range([height, 0 ]);

  	svg.append("g")
		.call(d3.axisLeft(y).tickFormat(d => "$" + d))
		.attr('font-weight','bold')
		.selectAll("text")
		.style("font-size", "12px");

	svg.append("text")
		.attr("class", "y-label")
		.attr("text-anchor", "end")
		.attr("x", margin.top)
		.attr("dx", "-0.5em")
		.attr("y", -50)
		.attr("transform", "rotate(-90)")
		.style("font-size","15px")
		.text("US Millions")
		.style('fill', '#fddaec');

	// color palette = one color per subgroup
	const color = d3.scaleOrdinal()
                  	.domain(subgroups)
                 	.range(d3.schemePastel2);
					//.range(["#bf5b17", "#7fc97f","#f0027f","#ccc","#666666","#386cb0","#fdc086","#beaed4"]);

	//stack the data? --> stack per subgroup
	const stackedData = d3.stack().keys(subgroups)(data)

 svg.selectAll("mydots")
	.data(subgroups)
	.enter()
	.append("circle")
	.attr("cx", 325)
	.attr("cy", function(d,i){ return 10 + i * 25}) // 100 is where the first dot appears. 25 is the distance between dots
	.attr("r", 5)
	.style("fill", function(d){ return color(d)})

// Add one dot in the legend for each name.
svg.selectAll("mylabels")
	.data(subgroups)
	.enter()
	.append("text")
	.attr("x", 340)
	.attr("y", function(d,i){ return 10 + i * 25}) // 100 is where the first dot appears. 25 is the distance between dots
	.style("fill", function(d){ return color(d)})
	.text(function(d){ return d})
	.attr("text-anchor", "left")
	.style("alignment-baseline", "middle")
	.attr('font-weight','bold')
	.style("font-size","15px")
	.on("mouseover", function (event,d) { // What happens when user hover a bar

          // what subgroup are we hovering?
          const subGroupName = d3.select(this.parentNode).datum().key

          // Reduce opacity of all rect to 0.2
          d3.selectAll(".myRect").style("opacity", 0.2)

          // Highlight all rects of this subgroup with opacity 1. It is possible to select them since they have a specific class = their name.
          d3.selectAll("." + subGroupName).style("opacity",1) 

      })
      .on("mouseleave", function (event,d) { // When user do not hover anymore

          // Back to normal opacity: 1
          d3.selectAll(".myRect")
            .style("opacity",1)
      });

  // ----------------
  // Highlight a specific subgroup when hovered
  // ----------------

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
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
      .attr("stroke", "black")
      .on("mouseover", function (event,d) { // What happens when user hover a bar

          // what subgroup are we hovering?
          const subGroupName = d3.select(this.parentNode).datum().key

          // Reduce opacity of all rect to 0.2
          d3.selectAll(".myRect").style("opacity", 0.2)

          // Highlight all rects of this subgroup with opacity 1. It is possible to select them since they have a specific class = their name.
          d3.selectAll("." + subGroupName).style("opacity",1) 
 

      })
      .on("mouseleave", function (event,d) { // When user do not hover anymore

          // Back to normal opacity: 1
          d3.selectAll(".myRect")
            .style("opacity",1)
      })
})