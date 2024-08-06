#targetengine "myPalette"

// Create a palette window
var palette = new Window("palette", "Match Object Dimensions");
palette.orientation = "column";
palette.alignChildren = "left";

// Add Horizontal and Vertical buttons
var btnGroup = palette.add("group");
btnGroup.alignment = "center";
var horizontalOption = btnGroup.add("button", undefined, "Horizontal");
var verticalOption = btnGroup.add("button", undefined, "Vertical");

// Add the "Reverse Target" checkbox
var reverseTargetCheckbox = palette.add("checkbox", undefined, "Reverse Target");

// Process the user's choice
horizontalOption.onClick = function() {
    processUserChoice('width');
};

verticalOption.onClick = function() {
    processUserChoice('height');
};

palette.show();

/**
 * Process the user's choice and call the matching function
 * @param {string} option - The dimension option ('width' or 'height')
 */
function processUserChoice(option) {
    var selectedObjects = app.activeDocument.selection;
    if (selectedObjects.length < 2) {
        alert("Please select at least two objects.");
        return;
    }

    var reverseTarget = reverseTargetCheckbox.value;
    if (option === 'width') {
        matchDimensions(selectedObjects, true, reverseTarget);
    } else {
        matchDimensions(selectedObjects, false, reverseTarget);
    }
}

/**
 * Match the dimensions of selected objects
 * @param {Array} selectedObjects - Array of selected objects
 * @param {boolean} isWidth - True to match width, false to match height
 * @param {boolean} reverseTarget - True to use the last selected object as the reference
 */
function matchDimensions(selectedObjects, isWidth, reverseTarget) {
    // Determine the reference object
    var referenceObject = reverseTarget ? selectedObjects[selectedObjects.length - 1] : selectedObjects[0];
    var referenceDimension = isWidth
        ? referenceObject.geometricBounds[3] - referenceObject.geometricBounds[1] // Width
        : referenceObject.geometricBounds[2] - referenceObject.geometricBounds[0]; // Height

    // Loop through the selected objects and match their dimensions
    for (var i = 0; i < selectedObjects.length; i++) {
        var obj = selectedObjects[i];
        // Skip the reference object itself
        if (obj === referenceObject) continue;

        if (isWidth) {
            // Match width
            var objHeight = obj.geometricBounds[2] - obj.geometricBounds[0];
            var objLeft = obj.geometricBounds[1];
            obj.geometricBounds = [obj.geometricBounds[0], objLeft, obj.geometricBounds[0] + objHeight, objLeft + referenceDimension];
        } else {
            // Match height
            var objWidth = obj.geometricBounds[3] - obj.geometricBounds[1];
            var objTop = obj.geometricBounds[0];
            obj.geometricBounds = [objTop, obj.geometricBounds[1], objTop + referenceDimension, obj.geometricBounds[1] + objWidth];
        }
    }
}
