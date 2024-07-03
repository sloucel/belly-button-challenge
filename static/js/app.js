// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Log the entire data object to the console
    console.log("Fetched data:", data);

    // Check if data.metadata exists and is an array
    if (!data.metadata || !Array.isArray(data.metadata)) {
    console.error("Metadata is not available or not in the expected format");
    return;
    }

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let filteredMetadata = metadata.filter(obj => obj.id == sample);
    
    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    filteredMetadata.forEach((obj) => {
      Object.entries(obj).forEach(([key, value]) => {
          panel.append("p").text(`${key}: ${value}`);
      });
  });

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
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
        colorscale: 'Earth'
      }
    };

    var data = [trace1]
    var layout = {
      title: 'Bactera Cultures Per Sample',
      showlegend: false,
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Number of Bacteria'},
      height: 600,
      width: 1200
    };

    // Render the Bubble Chart
    Plotly.newPlot('bubble', data, layout); })
  } 

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let filteredSamples = samples.filter(obj => obj.id == sample);
    let selectedSample = filteredSamples[0];

    let otuIds = selectedSample.otu_ids;
    let otuLabels = selectedSample.otu_labels;
    let sampleValues = selectedSample.sample_values;

// Don't forget to slice and reverse the input data appropriately
    let topOtuIds = otuIds.slice(0, 10).reverse();
    let topSampleValues = sampleValues.slice(0, 10).reverse();
    let topOtuLabels = otuLabels.slice(0, 10).reverse();
    
    let yticks = topOtuIds.map(otuID => `OTU ${otuID}`);

    // Build a Bar Chart
    var barTrace = {
      x: topSampleValues,
      y: yticks,
      text: topOtuLabels,
      type: 'bar',
      orientation: 'h'
    };

    var barLayout = {
      title: 'Top 10 OTUs',
      xaxis: { title: 'Sample Values' },
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
    let samples = data.samples;

    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
