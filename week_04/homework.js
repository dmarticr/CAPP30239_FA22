/* D3 Line Chart */

const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('long-term-interest-canada.csv').then(data => {        //impot data
    
let timeParse = d3.timeParse("%Y-%m")                         //transform string to date

    for (let d of data) {
        d.Num = +d.Num;                                       //Force Number
        d.Month = timeParse(d.Month);                         //Force Date
    }
    
    let x = d3.scaleTime()                                    //Creates x axis
        .domain(d3.extent(data, d => d.Month))
        .range([margin.left, width - margin.right]);

    let y = d3.scaleLinear()                                  //Creates y axis
        .domain([0, d3.max(data, d => d.Num)]).nice()
        .range([height - margin.bottom, margin.top]);
    
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(d3.timeMonth));            //ticks in each month
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y)
      .tickSize(0)
      .tickFormat(d => d + "%")                               //ads % to the right of each label
      .tickSize(-width));                                     //Creates the horizontal lines

    svg.append("text")                                        //x-label
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .text("Month");
    
    svg.append("text")                                        //y-label
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 8)
      .attr("transform", "rotate(-90)")
      .text("Interest rate");

    let line = d3.line()                                     //Creates the line of the graph
        .x(d => x(d.Month))
        .y(d => y(d.Num));
    
    svg.append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue");

    svg.selectAll(".dot")                                    //This code creates dots for each data point
        .data(data.filter(function(d) { return d; }))
        .enter().append("circle")
          .attr("class", "dot")
          .attr("cx", line.x())
          .attr("cy", line.y())
          .attr("r", 3);                                    //Size of each dot
  });