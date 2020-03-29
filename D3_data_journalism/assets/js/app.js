// @TODO: YOUR CODE HERE!
// Read CSV
var v1LIST = d3.select("#value01");
var v2LIST = d3.select("#value02");
var svgWidth = 860;
var svgHeight = 480;
var csvData
var firstLIST = []
var chosenXAxis = "state";
var xLinearScale
var yLinearScale
var xAxis
var yAxis

v1LIST.on("change", handleChange_01 );
v2LIST.on("change", handleChange_02 );
var margin = {
  top: 20,
  right: 20,
  bottom: 130,
  left: 80
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
  chosenXAxis = v1_List;
  d3.select("svg").remove();
  svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
  compare (document.getElementById("value01").value, document.getElementById("value02").value)
  //console.log(v2_List)
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
  for (var i=-1; i < inArray.length-1;++i){
     console.log(inArray[i]);
     addOption("value02", inArray[i], inArray[i]);
  }
}

// function used for updating x-scale var upon click on axis label
function xScale(inData, chosenXAxis) {
  // create scales
  if (chosenXAxis == 'state'){
      var xLinearScale = d3.scaleLinear()
          .domain([0, 51])
          .range([0,width]);
      }
      else{
      var xLinearScale = d3.scaleLinear()
        .domain([d3.min(inData, d => d[chosenXAxis]) * 0.8,
          d3.max(inData, d => d[chosenXAxis]) * 1.2
        ])
        .range([0, width]);
      }
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
  console.log(d);

  return circlesGroup;
}
// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis === "state") {
    var label = "State:";
  }
  else {
    var label = "Income:";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>${label} ${d[chosenXAxis]}`);
    });

  //circlesGroup.call(toolTip);

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
//var xxx = d3.csv("./data.csv");

var dataset = d3.csv("assets/data/data.csv").then (function(data){return data;});

var states = dataset.then(function(value){
    return Promise.all(value.map(function(results){
      return results.state;
    }));
})
var headers = dataset.then(function(data)
                                {
                                  return Promise.all(d3.keys(data[0]));
                                }
                            )

headers.then (function(data)
                    {
                      console.log(data)
                      for (var i=1; i < data.length-1;++i)
                        {
                        //console.log(data[i]);
                        addOption("value01", data[i], data[i]);
                        addOption("value02", data[i], data[i]);
                        }
                    }
                  );

states.then(function(data)
                {
                  console.log(data);
                  for (var i=0; i < data.length-1;++i)
                      {
                        //console.log(data[i]);
                        //addOption("value01", data[i], data[i]);
                      }
                  }
            );

//xxx.then(function(data){console.log(data)});

// d3.csv("./data.csv")
//       .then(function(hData) 
//                 {
//                   var headerNames = d3.keys(hData[0]);
//                   console.log(headerNames);
//                   populateVariables(headerNames);
//           });


////////
function compare_old(v1,v2)
{var dataset = d3.csv("assets/data/data.csv").then (function(data){return data;});

      var xData = dataset.then(function(value){
        return Promise.all(value.map(function(results){
          return results[v1];
        }));
      });

      var yData = dataset.then(function(value){
        return Promise.all(value.map(function(results){
          return results[v2];
        }));
      })
      ///Test Promise
      xData.then(function(data)
                {
                  console.log(data);
                  for (var i=0; i < data.length-1;++i)
                      {
                        //console.log(data[i]);
                        //addOption("value01", data[i], data[i]);
                      }
                  })
            .then(function(data)
                  {
                    xLinearScale = d3.scaleBand()
                    .domain([0,d3.max(data, d => d[v1])])
                    .range([0, width])
                    .padding(0.1);
                    xLinearScale = xFit(data,v1);
                    xLinearScale.forEach();
                  } 
                )
            .then(function(){var bottomAxis = d3.axisBottom(xLinearScale);})
            .then(function(){
                        xAxis = chartGroup.append("g")
                        .classed("x-axis", true)
                        .attr("transform", `translate(0, ${height})`)
                        .call(bottomAxis);
                          })
            .then(function(data){
              xAxis = d3.axisBottom(xLinearScale)
                .tickSize(15)
                .ticks(data.length);
              })
              .then(function(data)
              {var circlesGroup = chartGroup.selectAll("circle")
                                            .data(data)
                                            .enter()
                                            .append("circle")
                                            .attr("cx", d => xLinearScale(data[v1]))
                                            .attr("cy", d => yLinearScale(data[v2]))
                                            .attr("r", 20)
                                            .attr("fill", "pink")
                                            .attr("opacity", ".5");
              });

      yData.then(function(data)
            {
              console.log(data);
              for (var i=0; i < data.length-1;++i)
                  {
                    //console.log(data[i]);
                    //addOption("value01", data[i], data[i]);
                  }
              })
          .then(function(data){
                 yLinearScale = d3.scaleLinear()
                .domain([0, d3.max(data, d => d[v2])])
                .range([height, 0]);
              })
            .then(function(){var leftAxis = d3.axisLeft(yLinearScale);})
            .then(function(){
                chartGroup.append("g")
                .call(leftAxis);
              })
        
      
        // xData.then(function(data){
        //   xLinearScale = d3.scaleBand()
        //   .domain([0,d3.max(data, d => d[v1])])
        //   .range([0, width])
        //   .padding(0.1);
        //   xLinearScale = xFit(data,v1);
        //   xLinearScale.forEach();
        // });  

        // yData.then(function(data){
        //   yLinearScale = d3.scaleLinear()
        //   .domain([0, d3.max(data, d => d[v2])])
        //   .range([height, 0]);
        // });

        // var bottomAxis = d3.axisBottom(xLinearScale);
        
        //var leftAxis = d3.axisLeft(yLinearScale);

        // xAxis = chartGroup.append("g")
        //   .classed("x-axis", true)
        //   .attr("transform", `translate(0, ${height})`)
        //   .call(bottomAxis);
   
        // chartGroup.append("g")
        //   .call(leftAxis);
        // // create axes

        // xData.then(function(data){
        // xAxis = d3.axisBottom(xLinearScale)
        //   .tickSize(15)
        //   .ticks(data.length);
        // });
       

        yData.then(function(data){
            yAxis = d3.axisLeft(yLinearScale).ticks(data.length);
        });

        chartGroup.append("g")
                  .attr("transform", `translate(0, ${height})`)
                  //.call(xAxis)
                  .selectAll("text")
                    .style("text-anchor","end")
                    .attr("dx","-2em")
                    .attr("dy", "-2em")
                    .attr("transform", "rotate(-90)");
      
      // var cc = dataset.then(function(data)
      // {var circlesGroup = chartGroup.selectAll("circle")
      //                               .data(data)
      //                               .enter()
      //                               .append("circle")
      //                               .attr("cx", d => xLinearScale(data[v1]))
      //                               .attr("cy", d => yLinearScale(data[v2]))
      //                               .attr("r", 20)
      //                               .attr("fill", "pink")
      //                               .attr("opacity", ".5");
      // });
     
      // cc.then(function(data){
      //             console.log(data); 
      // })
      

}
/////////////////////////////////////////////////
////////
///////
//////
/////////////////////////////////////////////////
function compare(v1,v2){
  d3.csv("assets/data/data.csv").then(function(hData) 
  {
          console.log('Velues passed....',v1,' and ',v2);
          hData.forEach(function(hData) 
              {
                hData[v1] = +hData[v1];
                hData[v2] = +hData[v2];
              }   
          )
          console.log(hData[v1]);
          console.log(hData[v2]);      
  ////////////////////////////////////////// Investigate
  //  console.log(hData)
 

    var xLinearScale = d3.scaleBand()
      .domain([0,d3.max(hData, d => d[v1])])
      //.domain(hData.map(d => d[v1]))
      .range([0, width])
      .padding(0.1);

    var xLinearScale = xFit(hData,v1);

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

    var yAxis = d3.axisLeft(yLinearScale).ticks(hData.length);
    
    
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
                                    //.attr("cx", d => xLinearScale(d[v1]))
                                    //.attr("cy", d => yLinearScale(d[v2]))
                                    .attr("cx", d => xLinearScale(d.income))
                                    .attr("cy", d => yLinearScale(d.poverty))
                                    .attr("r", 20)
                                    .attr("fill", "pink")
                                    .attr("opacity", ".5");
    // append y axis
     // Create group for  2 x- axis labels
      var labelsGroup = chartGroup.transition("g")
                                  // .attr("transform", `translate(${width / 2}, ${height + 20})`);
      var xLabel = labelsGroup.transition("text")
                                  .attr("x", 0)
                                  .attr("y", 20)
                                  .attr("value", v1) // value to grab for event listener
                                  .classed("axis-text", true)
                                  .text(v1);               
      // append y axis
                    // chartGroup.transition("text")
                    //           // .attr("transform", "rotate(-90)")
                    //           .attr("y", 0 - margin.left)
                    //           .attr("x", 0 - (height / 2))
                    //           .attr("value", v2) // value to grab for event listener
                    //           .attr("dy", "1em")
                    //           .classed("axis-text", true)
                    //           .text(v2);
      // updateToolTip function above csv import
   //var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
   circlesGroup = renderCircles(circlesGroup, xLinearScale, v1);
    // x axis labels event listener
//   
  });
};

//compare ("a", "b")
// Step 5: Create Circles
    // ==============================
    // var circlesGroup = chartGroup.selectAll("circle")
    // .data(hairData)
    // .enter()
    // .append("circle")
    // .attr("cx", d => xLinearScale(d.hair_length))
    // .attr("cy", d => yLinearScale(d.num_hits))
    // .attr("r", "4")
    // .attr("fill", "pink")
    // .attr("opacity", ".5");
