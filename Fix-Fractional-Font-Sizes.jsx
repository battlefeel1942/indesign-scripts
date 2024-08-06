// Get the active document
var doc = app.activeDocument;

// Get the current time before starting the loop
var startTime = new Date();

// Loop through all paragraphs and round font size to nearest 0.5 increment
var updatedParagraphCount = 0;
for (var i = 0; i < doc.stories.length; i++) {
  var story = doc.stories[i];
  for (var j = 0; j < story.paragraphs.length; j++) {
    var paragraph = story.paragraphs[j];
    var fontSize = paragraph.pointSize;
    var rounded = Math.round(fontSize * 2) / 2;
    if (rounded !== fontSize) {
      paragraph.pointSize = rounded;
      updatedParagraphCount++;
    }
  }
}

// Get the current time after the loop finishes
var endTime = new Date();

// Calculate the duration in seconds
var duration = (endTime - startTime) / 1000;

// Display how many paragraphs were updated
alert(updatedParagraphCount + " paragraphs were updated.", "Fix Fractional Font Sizes - [" + Math.round(duration) + " seconds]");
