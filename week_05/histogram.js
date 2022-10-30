// Simple Histogram

const height = 400,
    width = 600,
    margin = ({ top: 25, right: 10, bottom: 50, left: 10 }),
    padding = 10; // space between bars

const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]); // create svg and add to chart class

d3.json('climate-jan.json').then((data) => { // call data

  const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.average)).nice()
    .range([margin.left, width - margin.right]); // creates the x sacale
  
  const y = d3.scaleLinear()
    .range([height - margin.bottom, margin.top])
    .domain([0,10]); // data, in this case is manual
    
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom + 5})`)
    .call(d3.axisBottom(x)); //putting the axis

  const binGroups = svg.append("g") // create the bin object
    .attr("class", "bin-group");

  const bins = d3.bin()
    .thresholds(10) // treshold : # bars (approx)
    .value(d => d.average)(data); // Value you wan to use to populate bins

  let g = binGroups.selectAll("g")
    .data(bins)
    .join("g");

   g.append("rect")
     .attr("x", d => x(d.x0) + (padding / 2))
     //.attr("y", d => y(d.length))
     .attr("width", d => x(d.x1) - x(d.x0) - padding)
     //.attr("height", d => height - margin.bottom - y(d.length))
     .attr("fill", "steelblue") // appending rectangles to each bar of histogram
     //lets create an animation...
     .attr("height", 0)
     .attr("y", ...)
     .transition()
     .attr("y", d => y(d.length))
     .attr("height", d => height - margin.bottom - y(d.length)); // this line was in 41 when static

   g.append("text") // add numbers to the top of histagram
     .text(d => d.length)
     .attr("x", d => x(d.x0) + (x(d.x1) - x(d.x0)) / 2)
     .attr("y", d => y(d.length) - 5)
     .attr("text-anchor", "middle")
     .attr("fill", "#333");

});