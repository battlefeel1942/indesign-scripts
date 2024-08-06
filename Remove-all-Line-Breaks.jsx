// Check if a text frame is selected
if (app.selection.length == 1 && app.selection[0].hasOwnProperty("baseline")) {
  // Get the selected text frame
  var selectedFrame = app.selection[0];

  // Get the text content of the text frame
  var textContent = selectedFrame.contents;

  // Replace line breaks and tabs with a single space in the text content
  textContent = textContent.replace(/[\r\n\t]+/g, " ");

  // Set the updated text content back into the text frame
  selectedFrame.contents = textContent;
} else {
  alert("Please select a single text frame and try again.");
}
  