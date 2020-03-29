// @TODO: YOUR CODE HERE!
// Read CSV
var v1LIST = d3.select("#value01");
var v2LIST = d3.select("#value02");
var svgWidth = 960;
var svgHeight = 480;
var csvData
var firstLIST = []
var chosenXAxis = "state";

v1LIST.on("click", handleChange_01 );
v2LIST.on("click", handleChange_02 );
var margin = {
  top: 20,
  right: 20,
  bottom: 130,
  left: 20
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
//
function handleChange_01 (d){
  console.log("A button 1 was clicked!");
  console.log(document.getElementById("value01").value);
  compare (chosenXAxis, document.getElementById("value01").value)
  
  
  // populateVariables2(firstList);
  // console.log(v1_List)
}
//
function handleChange_02 (d){
  console.log("A button 2 was clicked!");
  console.log(document.getElementById("value02").value);
  var v1_List = document.getElementById("value01").value;
  var v2_List = document.getElementById("value02").value;
  // chosenXAxis = v1_List;
  
  compare (document.getElementById("value01").value, document.getElementById("value02").value)
  console.log(v2_List)
}
//
function addOption(selectElement,text,value )
    {var optn = document.createElement("OPTION");
        var xxx = document.getElementById(selectElement)
        optn.text = text;
        optn.value = value;
        xxx.options.add(optn);
        
    }
  ///
function populateVariables(inArray){ 
      for (var i=3; i < inArray.length-1;++i){
         console.log(inArray[i]);
         firstLIST.push(inArray[i]);
         addOption("value01", inArray[i], inArray[i]);
         addOption("value02", inArray[i], inArray[i]);
      }
  }
//////

function populateVariables2(inArray){ 
  for (var i=3; i < inArray.length-1;++i){
     console.log(inArray[i]);
     addOption("value02", inArray[i], inArray[i]);
  }
}

// Initial Params


// function used for updating x-scale var upon click on axis label
function xScale(inData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(inData, d => d[chosenXAxis]) * 0.8,
      d3.max(inData, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}
// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// function used for updating x-scale var upon click on axis label
function xFit(inData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(inData, d => d[chosenXAxis]) * 0.8,
      d3.max(inData, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXaxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}
// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis === "states") {
    var label = "State:";
  }
  else {
    var label = "Income:";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.rockband}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}
/////////////////////////////////////////////////////////////////////
// csvData = d3.csv("./data.csv");
// console.log(csvData);
d3.csv("./data.csv")
      .then(function(hData) 
                {
                  var headerNames = d3.keys(hData[0]);
                  console.log(headerNames);
                  populateVariables(headerNames);
          });


////////
function compare(v1,v2){
  d3.csv("./data.csv").then(function(hData) 
  {
          console.log('Velues passed....',v1,' and ',v2);
          hData.forEach(function(hData) 
              {
                hData[v1] = +hData[v1];
                //hData[v1] = +hData[v1];
                hData[v2] = +hData[v2];
                console.log(hData[v1]);
                console.log(hData[v2]);
              }
              
          )
          
  ////////////////////////////////////////// Investigate
  //  console.log(hData);
   
    var xLinearScale = d3.scaleBand()
      .domain(hData.map(d => d[v1]))
      .range([0, width])
      .padding(0.1);

    var xLinearScale = xFit(hData,chosenXAxis);

    //console.log(xLinearScale.domain);
    // Create y scale function
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(hData, d => d[v2])])
      .range([height, 0]);
    //console.log(yLinearScale);
    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    
    // append x axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    

     // append y axis
    chartGroup.append("g")
                .call(leftAxis);

    // // create axes
    var xAxis = d3.axisBottom(xLinearScale)
                  .tickSize(15)
                  .ticks(hData.length);
    var yAxis = d3.axisLeft(yLinearScale).ticks(6);

    // // append axes
    
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .selectAll("text")
        .style("text-anchor","end")
        .attr("dx","-2em")
        .attr("dy", "-2em")
        .attr("transform", "rotate(-90)");
    //append initial circles
      var circlesGroup = chartGroup.selectAll("circle")
                                    .data(hData)
                                    .enter()
                                    .append("circle")
                                    .attr("cx", d => xLinearScale(d[v1]))
                                    .attr("cy", d => yLinearScale(d[v2]))
                                    .attr("r", 20)
                                    .attr("fill", "pink")
                                    .attr("opacity", ".5");
    // append y axis
     // Create group for  2 x- axis labels
      var labelsGroup = chartGroup.append("g")
                                  .attr("transform", `translate(${width / 2}, ${height + 20})`);
      var incomeLabel = labelsGroup.append("text")
                                  .attr("x", 0)
                                  .attr("y", 20)
                                  .attr("value", v1) // value to grab for event listener
                                  .classed("active", true)
                                  .text(v2);

      ///////////////////////////////////////////////////////////////////////////////////
      var povertyLabel = labelsGroup.append("text")
                                  .attr("x", 0)
                                  .attr("y", 40)
                                  .attr("value", v2) // value to grab for event listener
                                  .classed("inactive", true)
                                  .text(v1);                            
      // append y axis
                    chartGroup.append("text")
                              .attr("transform", "rotate(-90)")
                              .attr("y", 0 - margin.left)
                              .attr("x", 0 - (height / 2))
                              .attr("value", v2) // value to grab for event listener
                              .attr("dy", "1em")
                              .classed("axis-text", true)
                              .text(v2);
      // updateToolTip function above csv import
   var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

    // x axis labels event listener
  labelsGroup.selectAll("text")
  .on("click", function() {
    // get value of selection
    var value = d3.select(this).attr("value");
    if (value !== chosenXAxis) {

      // replaces chosenXAxis with value
      chosenXAxis = value;

      // console.log(chosenXAxis)

      // functions here found above csv import
      // updates x scale for new data
      xLinearScale = xScale(hData, chosenXAxis);

      console.log(xLinearScale);

      // updates x axis with transition
      xAxis = renderAxes(xLinearScale, xAxis);

      // updates circles with new x values
      circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

      // updates tooltips with new info
      circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

      // changes classes to change bold text
      if (chosenXAxis === "POVERTY") {
        poveryLabel
          .classed("active", true)
          .classed("inactive", false);
        incomeLabel
          .classed("active", false)
          .classed("inactive", true);
      }
      else {
        statesLabel
          .classed("active", false)
          .classed("inactive", true);
        incomeLabel
          .classed("active", true)
          .classed("inactive", false);
      }
    }
})
// .catch(function(error) {
// console.log(error);
// });


    // chartGroup.append("g")
    //           .call(leftAxis);
    // chartGroup.append("g")
    //           .call(yAxis);

    // // line generator
    // var line = d3.line()
    //   .x(d => xLinearScale(d.state))
    //   .y(d => yLinearScale(d.income));

    // // append line
    // chartGroup.append("path")
    //   .data([hData])
    //   .attr("d", line)
    //   .attr("fill", "none")
    //   .attr("stroke", "blue");

    // // append circles
    // var circlesGroup = chartGroup.selectAll("circle")
    //   .data(hData)
    //   .enter()
    //   .append("circle")
    //   .attr("cx", d => xLinearScale(d.state))
    //   .attr("cy", d => yLinearScale(d.income))
    //   .attr("r", "10")
    //   .attr("fill", "red")
    //   .attr("opacity", ".5")
    //   .attr("stroke-width", "1")
    //   .attr("stroke", "black");

    // Date formatter to display dates nicely
    //var dateFormatter = d3.timeFormat("%d-%b");

    // // Step 1: Initialize Tooltip
    // var toolTip = d3.tip()
    //   .attr("class", "tooltip")
    //   .offset([10, -60])
    //   .html(function(d) {
    //     return (`<strong>${d.state}<strong><hr>${d.income}
    //     income`);
    //   });
    
    // // Step 2: Create the tooltip in chartGroup.
    // chartGroup.call(toolTip);

    // // Step 3: Create "mouseover" event listener to display tooltip
    // circlesGroup.on("mouseover", function(d) {
    //   toolTip.show(d, this);
    // })
    // // Step 4: Create "mouseout" event listener to hide tooltip
    //   .on("mouseout", function(d) {
    //     toolTip.hide(d);
    //   });
  //   // Create axes labels
  //   chartGroup.append("text")
  //     .attr("transform", "rotate(-90)")
  //     .attr("y", 0 - margin.left + 40)
  //     .attr("x", 0 - (height / 2))
  //     .attr("dy", "1em")
  //     .attr("class", "axisText")
  //     .text("MEDIAN INCOME");

  //     chartGroup.append("text")
  //     .attr("transform", `translate(${width / 2}, ${height + margin.top + 70})`)
  //     .attr("class", "axisText")
  //     .text("STATES");
  // }).catch(function(error) {
  //   console.log(error);
  });
};

//compare ("a", "b")

