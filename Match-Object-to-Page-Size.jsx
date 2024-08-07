#targetengine "myPalette"

// Create a palette window
var palette = new Window("palette", "Match Object to Page Size", undefined, {resizeable: true});
palette.orientation = "column";
palette.alignChildren = "left";
palette.minimumSize.width = 200; // Set minimum width to accommodate the title

// Add radio buttons for Page, Margin, Bleed directly to the palette
var pageOption = palette.add("radiobutton", undefined, "Page");
var marginOption = palette.add("radiobutton", undefined, "Margin");
var bleedOption = palette.add("radiobutton", undefined, "Bleed");

// Set default selected option
pageOption.value = true;

// Add Apply button
var applyButton = palette.add("button", undefined, "Apply");

// Function to resize based on selected option
applyButton.onClick = function() {
    var selectedObjects = app.activeDocument.selection;
    if (selectedObjects.length === 0) {
        alert("Please select at least one object.");
        return;
    }

    var activePage = app.activeWindow.activePage;
    var document = app.activeDocument;

    for (var i = 0; i < selectedObjects.length; i++) {
        var selectedObject = selectedObjects[i];
        if (pageOption.value) {
            resizeToPage(selectedObject, activePage);
        } else if (marginOption.value) {
            resizeToMargin(selectedObject, activePage);
        } else if (bleedOption.value) {
            resizeToBleed(selectedObject, document, activePage);
        }
    }
};

palette.show();

// Function to resize to page
function resizeToPage(selectedObject, activePage) {
    var pageWidth = activePage.bounds[3] - activePage.bounds[1];
    var pageHeight = activePage.bounds[2] - activePage.bounds[0];

    selectedObject.geometricBounds = [0, 0, pageHeight, pageWidth];

    fitObject(selectedObject);
}

// Function to resize to margin
function resizeToMargin(selectedObject, activePage) {
    var marginPreferences = activePage.marginPreferences;
    var marginTop = marginPreferences.top;
    var marginBottom = marginPreferences.bottom;
    var marginLeft = marginPreferences.left;
    var marginRight = marginPreferences.right;

    var pageWidth = activePage.bounds[3] - activePage.bounds[1] - marginLeft - marginRight;
    var pageHeight = activePage.bounds[2] - activePage.bounds[0] - marginTop - marginBottom;

    selectedObject.geometricBounds = [marginTop, marginLeft, marginTop + pageHeight, marginLeft + pageWidth];

    fitObject(selectedObject);
}

// Function to resize to bleed
function resizeToBleed(selectedObject, document, activePage) {
    var bleedTop = document.documentPreferences.documentBleedTopOffset;
    var bleedBottom = document.documentPreferences.documentBleedBottomOffset;
    var bleedLeft = document.documentPreferences.documentBleedInsideOrLeftOffset;
    var bleedRight = document.documentPreferences.documentBleedOutsideOrRightOffset;

    var pageWidth = activePage.bounds[3] - activePage.bounds[1] + bleedLeft + bleedRight;
    var pageHeight = activePage.bounds[2] - activePage.bounds[0] + bleedTop + bleedBottom;

    selectedObject.geometricBounds = [-bleedTop, -bleedLeft, pageHeight - bleedTop, pageWidth - bleedLeft];

    fitObject(selectedObject);
}

// Function to fit object
function fitObject(selectedObject) {
    if (selectedObject.images.length > 0) {
        selectedObject.frameFittingOptions.autoFit = true;
        selectedObject.frameFittingOptions.fittingAlignment = AnchorPoint.CENTER_ANCHOR;
        selectedObject.fit(FitOptions.FILL_PROPORTIONALLY);
    }
}
