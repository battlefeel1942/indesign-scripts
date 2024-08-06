#targetengine "myPalette"

// Function to get the current measurement and stroke units
function getUnits() {
    var doc = app.documents.item(0);
    var horizontalUnits = doc.viewPreferences.horizontalMeasurementUnits.toString().replace('MeasurementUnits.', '');
    var verticalUnits = doc.viewPreferences.verticalMeasurementUnits.toString().replace('MeasurementUnits.', '');
    var strokeUnits = doc.viewPreferences.strokeMeasurementUnits.toString().replace('MeasurementUnits.', '');
    return {
        horizontal: horizontalUnits,
        vertical: verticalUnits,
        stroke: strokeUnits
    };
}

// Function to create and display the palette
function createPalette() {
    var palette = new Window("palette", "Update Units to Millimeters");
    palette.orientation = "column";
    palette.alignChildren = "left";

    // Display the current measurement and stroke units
    var units = getUnits();
    palette.add("statictext", undefined, "Horizontal Units: " + units.horizontal);
    palette.add("statictext", undefined, "Vertical Units: " + units.vertical);
    palette.add("statictext", undefined, "Stroke Units: " + units.stroke);

    // Add a button to update the units
    var updateButton = palette.add("button", undefined, "Update to Millimeters");

    // Function to update the measurement and stroke units
    updateButton.onClick = function() {
        var doc = app.documents.item(0);
        doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.MILLIMETERS;
        doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.MILLIMETERS;
        doc.viewPreferences.strokeMeasurementUnits = MeasurementUnits.MILLIMETERS;

        // Show an alert box to confirm that the units have been updated
        alert("Units & Increments updated to Millimeters");

        // Close the current palette and recreate it
        palette.close();
        createPalette();
    };

    palette.show();
}

// Initial call to create the palette
createPalette();
