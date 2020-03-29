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
var headers = ['state','area','population']
var array1 = ['alaska','alabama','arkansas','arizona']
var array2 = [100,200,300,400]
var array3 = [1000,2000,5000,10000]

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
  //compare (chosenXAxis, document.getElementById("value01").value)
  
  
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
  
 // compare (document.getElementById("value01").value, document.getElementById("value02").value)
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
      for (var i=0; i < inArray.length;++i){
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
//////////
populateVariables(headers);
//////////
function compare(a1,a2){
  console.log(a1);
  console.log(a2)
  

}
compare (array1, array2)