// Get the active document
var doc = app.activeDocument;

// Get the current time before starting the loop
var startTime = new Date();

// Initialize variables to count and store removed swatches
var swatchesRemoved = 0;
var removedSwatchNames = [];

// Check if there are any unused swatches
if (doc.unusedSwatches.length > 0) {
  // Loop through all the unused swatches and delete them
  for (var i = doc.unusedSwatches.length - 1; i >= 0; i--) {
    var swatch = doc.unusedSwatches[i];
    if (swatch.name == "") {
      continue;
    }
    removedSwatchNames.push(swatch.name);
    swatch.remove();
    swatchesRemoved++;
  }
}

// Construct the message to display
var message = (swatchesRemoved > 0) 
  ? swatchesRemoved + " unused swatches have been deleted:\n\n" + removedSwatchNames.join("\n") 
  : "There are no unused swatches in this document.";

// Get the current time after the loop finishes
var endTime = new Date();

// Calculate the duration in seconds and construct the dialog title
var duration = Math.round((endTime - startTime) / 1000);
var dialogTitle = "Remove Unused Swatches - [" + duration + " seconds]";

// Display the dialog box with the message and title
alert(message, dialogTitle);
