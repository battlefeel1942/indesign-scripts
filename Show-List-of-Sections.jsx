// Create an empty array to hold the markers
var markers = [];

// Get all the markers in the document
var sections = app.activeDocument.sections.everyItem().marker;

// Get the current time before starting the loop
var startTime = new Date();

// Loop through each marker
for (var i = 0; i < sections.length; i++) {
    
    // Check if the marker is not empty
    if(sections[i].length > 0) {
        
        // Add the marker to the markers array
	    markers.push(sections[i]);
        
        // Continue to the next iteration of the loop
        continue;
    }
    
    // If the marker is empty, add a placeholder to the markers array
    markers.push("[empty section]");
    
}

// Create a message to display in the alert box
var message = "The document contains the following sections:\n\n" + markers.join("\n") + "\n";

// Get the current time after the loop finishes
var endTime = new Date();

// Calculate the duration in seconds
var duration = (endTime - startTime) / 1000;

// Display an alert box with the message and a title
alert(message, "Sections in this document - [" + Math.round(duration) + " seconds]");
