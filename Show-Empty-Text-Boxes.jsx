// Get the active InDesign document
var doc = app.activeDocument;
var emptyFrames = [];

// Get the current time before starting the loop
var startTime = new Date();

// Loop through each spread in the document
for (var i = 0; i < doc.spreads.length; i++) {
    var spread = doc.spreads[i];

    // Loop through each text frame in the spread
    for (var j = 0; j < spread.textFrames.length; j++) {
        var textFrame = spread.textFrames[j];

        // Check if the text frame is empty
        if (textFrame.contents === "") {
            var sectionName = textFrame.parentPage.appliedSection.name;
            var pageNumber = textFrame.parentPage.name;
            emptyFrames.push(sectionName + "' on Page " + pageNumber);
        }
    }
}


// Create a message to display in the alert box
var message = emptyFrames.join("\n");

// Get the current time after the loop finishes
var endTime = new Date();

// Calculate the duration in seconds
var duration = (endTime - startTime) / 1000;

// Alert the user with the results
if (emptyFrames.length > 0) {
    alert(message,  "Empty text frames in this document - [" + Math.round(duration) + " seconds]");
} else {
    alert("No empty text frames were found in the document.");
}


