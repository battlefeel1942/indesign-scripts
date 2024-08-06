// Check if there are exactly two items selected
if (app.selection.length !== 2) {
    alert("Please select exactly two objects.");
} else {
    var firstItem = app.selection[0];
    var secondItem = app.selection[1];

    // Storing the original coordinates
    var firstItemBounds = firstItem.geometricBounds;
    var secondItemBounds = secondItem.geometricBounds;

    // Swapping the coordinates
    firstItem.geometricBounds = secondItemBounds;
    secondItem.geometricBounds = firstItemBounds;

    // Adjust the fitting options to ensure the images stay in place
    adjustFitting(firstItem);
    adjustFitting(secondItem);
}

/**
 * Adjust the fitting options for the item to ensure the image stays in place
 * @param {Object} item - The page item whose fitting options need to be adjusted
 */
function adjustFitting(item) {
    if (item.images.length > 0) {
        var image = item.images[0];
        image.parent.geometricBounds = item.geometricBounds; // Adjust the frame bounds to match the container
        image.parent.fit(FitOptions.FILL_PROPORTIONALLY); // Adjust the fitting options
    }
}
