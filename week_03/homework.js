/* Bar chart for library visits on january 2022 cases */

d3.csv("library_visits_jan22.csv").then(data => {

    for (let d of data) {
        d.num = +d.num; //force a number
    };

    const height = 600,
          width = 800,
          margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

    let svg = d3.select("#chart") /* Creates the box where the graph goes*/
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); // for resizing element in browser

    let x = d3.scaleBand()
        .domain(data.map(d => d.branch)) // data, returns array.
                                         //In this case, the categories to map are in the branch column
        .range([margin.left, width - margin.right]) // pixels on page
        .padding(0.1);

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.num)]).nice() // nice rounds the top num
                                                      // Domain goes from 0 to max number of visits
        .range([height - margin.bottom, margin.top]); //svgs are built from top down, so this is reversed

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));

    const yAxis = g => g
        .attr("transform", `translate(${margin.left - 5},0)`) // move location of axis
        .call(d3.axisLeft(y));

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    let bar = svg.selectAll(".bar") // create bar groups
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");
    
    bar.append("rect")                         // add rect to bar group
        .attr("fill", "cornflowerblue")        // color of the columns: cornflowerblue
        .attr("x", d => x(d.branch))           // x position attribute, the categories
        .attr("width", x.bandwidth())          // this width is the width attr on the element
        .attr("y", d => y(d.num))              // y position attribute, the number of visits
        .attr("height", d => y(0) - y(d.num)); // this height is the height attr on element
    
    bar.append('text')                         // add labels to columns: number of visits
        .text(d => d.num)
        .attr('x', d => x(d.branch) + (x.bandwidth()/2))
        .attr('y', d => y(d.num) + 15)
        .attr('text-anchor', 'middle')
        .style('fill', 'white');

});