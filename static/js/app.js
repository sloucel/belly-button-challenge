// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
    
    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    if (result) {
      Object.entries(result).forEach(([key, value]) => {
        panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    } else {
      panel.append("h6").text("No metadata available for this sample.");
    }
  });
}
  
// Function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let filteredSamples = samples.filter(obj => obj.id == sample);
    let selectedSample = filteredSamples[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otuIds = selectedSample.otu_ids;
    let otuLabels = selectedSample.otu_labels;
    let sampleValues = selectedSample.sample_values;

    // Build a Bubble Chart
    var trace1 = {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: 'Portland'
      }
    };

    var bubbleData = [trace1];
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Number of Bacteria' },
      height: 600,
      width: 1200
    };

    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    // Don't forget to slice and reverse the input data appropriately
    let topOtuIds = otuIds.slice(0, 10).reverse();
    let topSampleValues = sampleValues.slice(0, 10).reverse();
    let topOtuLabels = otuLabels.slice(0, 10).reverse();

    let yTicks = topOtuIds.map(otuID => `OTU ${otuID}`);

    // Build a Bar Chart
    var barTrace = {
      x: topSampleValues,
      y: yTicks,
      text: topOtuLabels,
      type: 'bar',
      orientation: 'h'
    };

    var barData = [barTrace];
    var barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: { title: 'Number of Bacteria' },
      yaxis: { title: 'OTU IDs' },
      height: 400,
      width: 600
    };

    // Render the Bar Chart
    Plotly.newPlot('bar', barData, barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the names field
    let sampleNames = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    sampleNames.forEach((sample) => {
      dropdownMenu.append("option")
        .text(sample)
        .property("value", sample);
    });

    // Get the first sample from the list
    let firstSample = sampleNames[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
console.log(metadata)