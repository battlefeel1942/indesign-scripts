// Get all the graphics in the document
var allGraphics = app.activeDocument.allGraphics;

// Create an object to store the count of each graphic
var graphicCount = {};

// Get the current time before starting the loop
var startTime = new Date();

// Loop through all the graphics and count how many times each one appears
for (var i = 0; i < allGraphics.length; i++) {
    var graphic = allGraphics[i];
    
    // Get the link for the graphic
    var link = graphic.itemLink;
    
    // Check if the link is valid and has a file path
    if (link && link.filePath && link.status == LinkStatus.NORMAL) {
        // Add the graphic to the count
        if (graphicCount[link.filePath]) {
            graphicCount[link.filePath] = graphicCount[link.filePath] + 1;
            continue;
        } 
        
        graphicCount[link.filePath] = 1;
        
    }
}

// Create an array of the graphics that have been used more than once
var duplicates = [];
for (var path in graphicCount) {
    if (graphicCount[path] > 1) {
        duplicates.push(path);
    }
}

// If there are duplicates, display an alert box listing them
var message = duplicates.length ? "The following images have been used more than once:\n\n" + duplicates.join("\n") : "There are no images that have been used more than once.";

// Get the current time after the loop finishes
var endTime = new Date();

// Calculate the duration in seconds
var duration = (endTime - startTime) / 1000;

alert(message, "Image duplicates - [" + Math.round(duration) + " seconds]");
