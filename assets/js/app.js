// @TODO: YOUR CODE HERE!
var svgWidth = 700;
var svgHeight = 500;

margin = {
    top: 100,
    bottom: 100,
    left: 100,
    right: 100
};

width = svgWidth - margin.left - margin.right;
height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`)
.classed("chart", true);

d3.csv('./assets/data/data.csv').then(function (povertyData) {
    console.log(povertyData)
    povertyData.forEach(data => {
        data.poverty = parseInt(data.poverty)
        data.healthcare = parseInt(data.healthcare)
    })
    
    var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(povertyData, d => d.poverty)])
    .range([0, width])

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(povertyData, d => d.healthcare)])
    .range([height, 0])

    var xAxis = d3.axisBottom(xLinearScale)
    var yAxis = d3.axisLeft(yLinearScale)

    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis)

    chartGroup.append("g")
    .call(yAxis)

    var circleGroup = chartGroup.selectAll("circle")
    .data(povertyData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "10")
    .classed("stateCircle", true)
    
    chartGroup.selectAll(".stateText")
    .data(povertyData)
    .enter()
    .append("text")
    .classed("stateText", true)
    .attr('x', d => xLinearScale(d.poverty))
    .attr('y', d => yLinearScale(d.healthcare))
    .attr('dy', 3)
    .attr('font-size', '10px')
    .text(function(d){return d.abbr})

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 1.75))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .classed("aText", true)
      .text("Lacks Healthcare %");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top - 50})`)
      .attr("class", "axisText")
      .classed("aText", true)
      .text("In Poverty %")
}).catch(function(error) {
    console.log(error);
  });