// Get a reference to the active document
var doc = app.activeDocument;

// Create an empty object to store the images and their pages
var badImages = {};

// Get the current time before starting the loop
var startTime = new Date();

// Loop through each image in the document
for (var i = 0; i < doc.allGraphics.length; i++) {
  var graphic = doc.allGraphics[i];
  
  var frame = graphic.parent;
  if (!frame || !frame.isValid || !frame.parentPage) {
    continue;
  }

  var imagePage = frame.parentPage.name;

  // Get the bounds of the image and its container
  var imageBounds = graphic.geometricBounds;
  var frameBounds = frame.geometricBounds;

  // Check whether the image fills its container
  if (Math.round(imageBounds[0], 2) <= Math.round(frameBounds[0], 2) && // left edge of image is touching or inside container
      Math.round(imageBounds[1], 2) <= Math.round(frameBounds[1], 2) && // top edge of image is touching or inside container
      Math.round(imageBounds[2], 2) >= Math.round(frameBounds[2], 2) && // right edge of image is touching or inside container
      Math.round(imageBounds[3], 2) >= Math.round(frameBounds[3], 2)) { // image is not exactly the same size as the container

    // If the image fills its container or is the same size as the container, skip to the next image
    continue;
  }

  // If the image is not filling its container, add it to the badImages object
  if (!badImages[graphic.itemLink.name]) {
    badImages[graphic.itemLink.name] = [imagePage];
    continue;
  } 
  
  badImages[graphic.itemLink.name].push(imagePage);

}

// Display the list of images that are not filling their containers and the pages where they are placed
var badImagesList = [];
for (var imageName in badImages) {
  badImagesList.push(imageName + " (on page " + badImages[imageName].join(", ") + ")");
}
if (badImagesList.length > 0) {
  message = "The following images are not filling their containers:\n\n" + badImagesList.join("\n");
} else {
  message = "All images are filling their containers.";
}

// Get the current time after the loop finishes
var endTime = new Date();

// Calculate the duration in seconds
var duration = (endTime - startTime) / 1000;

alert(message, "Images that are not filling their container - [" + Math.round(duration) + " seconds]");
