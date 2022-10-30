let height = 400,
    width = 600,
    margin = ({ top: 25, right: 30, bottom: 35, left: 40 }); //margins to separate the chart
  
const svg = d3.select("#chart") // create svg and append to chart class
    .append("svg")
    .attr("viewBox", [0, 0, width, height]); // viebox changes the size depending on the page

d3.csv('penguins.csv').then(data => { // load your data
  
  let x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.body_mass_g)).nice() // Yor data, and range what appears on your page
    .range([margin.left, width - margin.right]); // Declare your x scale

  let y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.flipper_length_mm)).nice()
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("class", "x-axis")
    .call(d3.axisBottom(x).tickFormat(d => (d/1000) + "kg").tickSize(-height + margin.top + margin.bottom)) //tickSize creates the grid

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis")
    .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right))  // 19 - 27 add axes to chart

   svg.append("g")
     .attr("fill", "black")
     .selectAll("circle") // select the circle before putting on page
     .data(data)
     .join("circle")
     .attr("cx", d => x(d.body_mass_g))
     .attr("cy", d => y(d.flipper_length_mm))
     .attr("r", 2) // Radius
     .attr("opacity", 0.75);

   const tooltip = d3.select("body").append("div") // select html body and to thad appending the div
     .attr("class", "svg-tooltip") // dinamically put thata on that div
     .style("position", "absolute")
     .style("visibility", "hidden");

   d3.selectAll("circle")
     .on("mouseover", function(event, d) {
       d3.select(this).attr("fill", "red");
       tooltip
         .style("visibility", "visible") // make it visible when put the mouse on
         .html(`Species: ${d.species}<br />Island: ${d.island}<br />Weight: ${d.body_mass_g/1000}kg`); // text that will appear
     })
     .on("mousemove", function(event) { // the box appears close to the mouse
       tooltip
         .style("top", (event.pageY - 10) + "px")
         .style("left", (event.pageX + 10) + "px");
     })
     .on("mouseout", function() { // uncolor the circle when mouse moves away
       d3.select(this).attr("fill", "black");
       tooltip.style("visibility", "hidden");
     })
    
});