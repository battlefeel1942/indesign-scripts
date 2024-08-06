// Get the active document
var doc = app.activeDocument;

// Get all text frames in the document
var textFrames = doc.textFrames;

// Loop through each text frame and replace its content with the frame number
for (var i = 0; i < textFrames.length; i++) {
  var textFrame = textFrames[i];
  
  // Check if the text frame is on a master page
  if (textFrame.parent instanceof MasterSpread) {
    continue; // Skip this text frame and go to the next one
  }
  
  var textFrameNumber = (i + 1).toString();
  while (textFrameNumber.length < 3) {
    textFrameNumber = '0' + textFrameNumber; // Pad with leading zeros
  }
  textFrame.contents = 'Ticket #' + textFrameNumber; // Add prefix
}
