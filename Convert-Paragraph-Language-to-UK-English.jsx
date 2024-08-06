var doc = app.activeDocument;
var fromLang = "English: USA";
var toLang = "English: UK";

var numTextAreasChecked = 0;
var numTextAreasUpdated = 0;
var numTextAreasUK = 0;
var numTextAreasOther = 0;

var startTime = new Date();

// Prompt user to choose if conversion should be US-specific
var usSpecificDialog = new Window("dialog", "Convert to UK English");
usSpecificDialog.add("statictext", undefined, "Select source language:");

var radioButtonGroup = usSpecificDialog.add("group");
var usSpecificButton = radioButtonGroup.add("radiobutton", undefined, "US English");
var anyLanguageButton = radioButtonGroup.add("radiobutton", undefined, "Any Language");
usSpecificButton.value = true;

// Create a group for the buttons and add them to the group
var buttonGroup = usSpecificDialog.add("group");
buttonGroup.add("button", undefined, "OK", {name: "ok"});
buttonGroup.add("button", undefined, "Cancel", {name: "cancel"});



var result = usSpecificDialog.show();

if (result == 1) {
  var usSpecific = usSpecificButton.value;

  function updateLanguage(paragraph, fromLang, toLang, usSpecific) {
    if (!usSpecific && paragraph.appliedLanguage.name == toLang) {
      return false;
    }
    if (usSpecific && paragraph.appliedLanguage.name != fromLang) {
      return false;
    }
    paragraph.appliedLanguage = toLang;
    return true;
  }

  function loopTextFrames(textFrame, fromLang, toLang, usSpecific) {
    if (textFrame instanceof TextFrame) {
      for (var i = 0; i < textFrame.paragraphs.length; i++) {
        var paragraph = textFrame.paragraphs[i];
  
        if (paragraph.appliedLanguage.name !== fromLang && paragraph.appliedLanguage.name !== toLang) {
          numTextAreasOther++;
        }
  
        if (updateLanguage(paragraph, fromLang, toLang, usSpecific)) {
          numTextAreasUpdated++;
          numTextAreasOther++;
        } else if (paragraph.appliedLanguage.name == toLang) {
          numTextAreasUK++;
        }
        
        numTextAreasChecked++;
      }
    }
  }
  
  

  try {
    // Loop through all the stories in the document
    for (var i = 0; i < doc.stories.length; i++) {
      var story = doc.stories[i];

      // Loop through all the text frames in the story
      for (var j = 0; j < story.textContainers.length; j++) {
        loopTextFrames(story.textContainers[j], fromLang, toLang, usSpecific);

      }
    }

    // Calculate the duration in seconds
    var endTime = new Date();
    var duration = (endTime - startTime) / 1000;

    // Display the results in the alert box
    message = 
    numTextAreasChecked + " text areas checked.\n\n" + 
    numTextAreasUK + " text areas were already in English-UK.\n\n" + 
    numTextAreasOther + " text areas were in other languages.\n\n" + 
    "-----------------------------\n" + 
    numTextAreasUpdated + " text areas updated.";



    alert(message, "Convert English-USA (specifically) to English-UK - [" + Math.round(duration) + " seconds]");
  } catch (err) {
    alert("An error occurred: " + err);
  }
}
