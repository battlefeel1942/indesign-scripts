#targetengine "myPalette"

// Default search terms
var defaultSearchTerms = ['5th Row', '4th Row', '3rd Row:', '2nd Row:', 'Back Row:', 'Front Row:', 'Absent:', 'Inset:'];

// Create and display the palette
function createPalette() {
    var palette = new Window("palette", "Apply Unique AutoBold Style");
    palette.orientation = "column";
    palette.alignChildren = "left";

    // Add a text field to enter search terms
    palette.add("statictext", undefined, "Search Terms (comma separated):");
    var searchField = palette.add("edittext", undefined, defaultSearchTerms.join(', '));
    searchField.characters = 50;

    // Add a button to apply the unique AutoBold style
    var applyButton = palette.add("button", undefined, "Apply AutoBold Style");

    // Function to apply the unique AutoBold character style
    applyButton.onClick = function() {
        var searchTerms = splitAndTrim(searchField.text);
        processDocument(searchTerms);
    };

    palette.show();
}

// Function to split and trim search terms
function splitAndTrim(text) {
    var terms = text.split(',');
    for (var i = 0; i < terms.length; i++) {
        terms[i] = terms[i].replace(/^\s+|\s+$/g, ''); // Trim whitespace
    }
    return terms;
}

// Function to create a unique 'AutoBold' character style
function createUniqueAutoBoldStyle() {
    var randomString = Math.floor(10000 + Math.random() * 90000).toString(); // Generate random 5-digit string
    var styleName = "AutoBold_" + randomString;
    var charStyle = app.activeDocument.characterStyles.add({name: styleName});
    return styleName;
}

// Function to process the document and apply the unique AutoBold character style
function processDocument(searchTerms) {
    var activeDocument = app.activeDocument;
    var styleName = createUniqueAutoBoldStyle();

    // Get the current time before starting the loop
    var startTime = new Date();

    // Loop through all the text frames in the document
    for (var i = 0; i < activeDocument.allPageItems.length; i++) {
        if (activeDocument.allPageItems[i] instanceof TextFrame) {
            loopTextFrames(activeDocument.allPageItems[i], searchTerms, styleName);
        }
    }

    // Get the current time after the loop finishes
    var endTime = new Date();

    // Calculate the duration in seconds
    var duration = (endTime - startTime) / 1000;

    alert("Script execution completed in " + Math.round(duration) + " seconds");
}

// Loop through text frames and apply the unique AutoBold character style
function loopTextFrames(textFrame, searchTerms, styleName) {
    for (var j = 0; j < textFrame.paragraphs.length; j++) {
        var paragraph = textFrame.paragraphs[j];
        if (/^\s*$/.test(paragraph.contents)) {
            continue;
        }
        for (var k = 0; k < searchTerms.length; k++) {
            searchTextAndApplyStyle(paragraph, searchTerms[k], styleName);
        }
    }
}

// Search for text and apply the unique AutoBold character style
function searchTextAndApplyStyle(paragraph, searchText, styleName) {
    var index = paragraph.contents.indexOf(searchText);
    if (index !== -1) {
        var charStyle = app.activeDocument.characterStyles.item(styleName);
        var textRange = paragraph.characters.itemByRange(index, index + searchText.length - 1);
        textRange.appliedCharacterStyle = charStyle;
    }
}

// Initial call to create the palette
createPalette();
