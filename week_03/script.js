/* bar chart of covid cases */

d3.csv("covid.csv").then(data => {

    /* console.log(data); to see data */

    for (let d of data){
        d.cases = +d.cases;
    };

    const height = 600,
          width = 800,
          margin = ({top: 25, right: 30, bottom:35, left: 50});

    let svg = d3.select("#chart") /* Creates the box where the graph goes*/
                .append("svg")
                .attr("viewBox", [0, 0, width, height]);
    
    let x = d3.scaleBand()
        .domain(data.map(d => d.country))
        .range([margin.left, width - margin.right]) // pixels on page
        .padding(0.1);

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.cases)]).nice()
        .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));

    const yAxis = g => g
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    let bar = svg.selectAll(".bar")
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");
    
    bar.append("rect")
        .attr("fill", "steelblue")
        .attr("x", d => x(d.country))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.cases))
        .attr("height", d => y(0) - y(d.cases));

    bar.append('text')
        .text(d => d.cases)
        .attr('x', d => x(d.country) + (x.bandwidth()/2))
        .attr('y', d => y(d.cases) + 15)
        .attr('text-anchor', 'middle')
        .style('fill', 'white');
})