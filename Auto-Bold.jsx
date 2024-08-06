// Get the active document
var activeDocument = app.activeDocument;

// Define search terms
var searchTerms = ['5th Row', '4th Row', '3rd Row:', '2nd Row:', 'Back Row:', 'Front Row:', 'Absent:', 'Inset:'];

// Get the current time before starting the loop
var startTime = new Date();

// Loop through all the text frames in the document
for (var i = 0; i < activeDocument.allPageItems.length; i++) {
  loopTextFrames(activeDocument.allPageItems[i]);
}

// Get the current time after the loop finishes
var endTime = new Date();

// Calculate the duration in seconds
var duration = (endTime - startTime) / 1000;

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

      // Search for each term and apply character style
      for (var k = 0; k < searchTerms.length; k++) {
        searchTextAndApplyStyle(paragraph, searchTerms[k], 'AutoBold');
      }
    }
  }
}

function searchTextAndApplyStyle(paragraph, searchText, styleName) {
  var index = paragraph.contents.indexOf(searchText);
  
  if (index !== -1) {
    var charStyle = app.activeDocument.characterStyles.item(styleName);
    
    if (!charStyle.isValid) {
      charStyle = app.activeDocument.characterStyles.add({name:styleName});
    }

    var textRange = paragraph.characters.itemByRange(index, index + searchText.length - 1);
    textRange.appliedCharacterStyle = charStyle;
  }
}

alert("Script execution completed in " + Math.round(duration) + " seconds");
