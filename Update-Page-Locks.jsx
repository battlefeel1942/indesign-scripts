#targetengine "myPalette"

// Function to count locked, unlocked, and empty pages
function countLockedUnlockedPages() {
    var doc = app.activeDocument;
    var lockedCount = 0;
    var unlockedCount = 0;
    var emptyCount = 0;

    for (var i = 0; i < doc.pages.length; i++) {
        var page = doc.pages[i];
        var pageItems = page.pageItems;

        if (pageItems.length === 0) {
            emptyCount++;
            continue;
        }

        var hasLocked = false;
        var hasUnlocked = false;

        for (var j = 0; j < pageItems.length; j++) {
            if (pageItems[j].locked) {
                hasLocked = true;
            } else {
                hasUnlocked = true;
            }

            // If both locked and unlocked items are found, break early
            if (hasLocked && hasUnlocked) {
                break;
            }
        }

        if (hasLocked && !hasUnlocked) {
            lockedCount++;
        } else {
            unlockedCount++;
        }
    }

    return { locked: lockedCount, unlocked: unlockedCount, empty: emptyCount };
}

// Function to create and display the palette
function createPalette() {
    var counts = countLockedUnlockedPages();
    var lockedCount = counts.locked;
    var unlockedCount = counts.unlocked;
    var emptyCount = counts.empty;

    var palette = new Window("palette", "Lock/Unlock All Pages");
    palette.orientation = "column";
    palette.alignChildren = "left";

    // Add buttons for locking and unlocking all pages
    var lockButton = palette.add("button", undefined, "Lock All Pages (" + unlockedCount + " unlocked)");
    var unlockButton = palette.add("button", undefined, "Unlock All Pages (" + lockedCount + " locked)");

    // Function to lock all pages
    lockButton.onClick = function() {
        var doc = app.activeDocument;
        for (var i = 0; i < doc.pages.length; i++) {
            var page = doc.pages[i];
            if (page.pageItems.length > 0) {
                page.pageItems.everyItem().locked = true;
            }
        }
        alert("All items on all pages have been locked!");
        palette.close();
        createPalette();
    };

    // Function to unlock all pages
    unlockButton.onClick = function() {
        var doc = app.activeDocument;
        for (var i = 0; i < doc.pages.length; i++) {
            var page = doc.pages[i];
            if (page.pageItems.length > 0) {
                page.pageItems.everyItem().locked = false;
            }
        }
        alert("All items on all pages have been unlocked!");
        palette.close();
        createPalette();
    };

    // Display the number of empty pages
    palette.add("statictext", undefined, "Empty Pages: " + emptyCount);

    palette.show();
}

// Initial call to create the palette
createPalette();
