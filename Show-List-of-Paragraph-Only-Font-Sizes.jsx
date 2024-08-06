// Get the active document
var activeDocument = app.activeDocument;

// Create an object to hold the font sizes and their counts
var fontSizeCounts = {};

// Get the current time before starting the loop
var startTime = new Date();

// Loop through all the text frames in the document
for (var i = 0; i < activeDocument.allPageItems.length; i++) {
  loopTextFrames(activeDocument.allPageItems[i]);
}

// Create an array of font sizes and their counts, and sort it
var fontSizeArray = createAndSortFontSizeArray(fontSizeCounts);

// Create a string with the font sizes and their counts
var fontSizeString = createFontSizeString(fontSizeArray);

// Get the current time after the loop finishes
var endTime = new Date();

// Calculate the duration in seconds
var duration = (endTime - startTime) / 1000;

// Display the font sizes and their counts in an alert box
alert(fontSizeString, "Font Sizes Used in Document - [" + Math.round(duration) + " seconds]");

// Functions

function loopTextFrames(textFrame) {
  if (textFrame instanceof TextFrame) {
    // Loop through all the paragraphs in the text frame
    for (var j = 0; j < textFrame.paragraphs.length; j++) {
      var paragraph = textFrame.paragraphs[j];

      // Check if the paragraph is empty or only contains whitespace characters
      if (/^\s*$/.test(paragraph.contents)) {
        continue;
      }

      // Get the font size of the paragraph
      var fontSize = paragraph.pointSize;

      // Add the font size to the object and increment its count
      if (fontSizeCounts[fontSize]) {
        fontSizeCounts[fontSize].count++;
      } else {
        fontSizeCounts[fontSize] = {count: 1, pages: []};
      }

      // Get the parent page of the text frame
      var parentPage = textFrame.parentPage;

      // Continue to the next iteration if the parent page is null
      if (!parentPage) {
        continue;
      }

      // Add the page number and coordinates to the array if it's the first instance of the font size
      if (fontSizeCounts[fontSize].count <= 10) {
        var page = parentPage.name;
        var x = textFrame.geometricBounds[1];
        var y = textFrame.geometricBounds[0];
        fontSizeCounts[fontSize].pages.push({page: page, x: x, y: y});
      }
    }
  }
}

function createAndSortFontSizeArray(fontSizeCounts) {
  var fontSizeArray = [];
  for (var fontSize in fontSizeCounts) {
    fontSizeArray.push({fontSize: fontSize, count: fontSizeCounts[fontSize].count, pages: fontSizeCounts[fontSize].pages});
  }

  fontSizeArray.sort(function(a, b) {
    return b.fontSize - a.fontSize;
  });

  return fontSizeArray;
}

function createFontSizeString(fontSizeArray) {
  var fontSizeString = "The following font sizes were used in the document and their frequency, pages and coordinates:\n\n";
  for (var i = 0; i < fontSizeArray.length; i++) {
    var fontSize = fontSizeArray[i].fontSize;
    var count = fontSizeArray[i].count;
    var pages = fontSizeArray[i].pages;

    if (count > 10) {
      fontSizeString += fontSize + "pt: " + count + "\n";
      continue;
    }

    var pageString = "";
    for (var j = 0; j < pages.length; j++) {
      var page = pages[j].page;
      var x = pages[j].x;
      var y = pages[j].y;
      pageString += " (page " + page + ", x: " + x.toFixed() + ", y: " + y.toFixed() + ")";
      if (j !== pages.length - 1) {
        pageString += ",";
      }
    }
    
    fontSizeString += fontSize + "pt: " + count + pageString + "\n";
  }

  return fontSizeString;
}
