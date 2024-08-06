#targetengine "myPalette"

// Define the path to the user scripts folder
var versionParts = app.version.split(".");
var majorVersion = parseInt(versionParts[0]);
var scriptFolderPath = Folder.userData + "/Adobe/InDesign/Version " + majorVersion + ".0/en_US/Scripts/Scripts Panel";

// Get the list of user scripts
var scriptList = getUserScripts(scriptFolderPath);

// Group the user scripts
var scriptGroups = groupUserScripts(scriptList);

// Create and show the palette window
var palette = createPalette(scriptGroups);
palette.show();

// Get a list of user scripts
function getUserScripts(scriptFolderPath) {
    var scriptFolder = new Folder(scriptFolderPath);
    var scriptFiles = scriptFolder.getFiles("*.jsx");

    var scriptList = [];
    for (var i = 0; i < scriptFiles.length; i++) {
        var scriptFile = scriptFiles[i];
        var scriptName = scriptFile.name.replace(/.jsx$/, "").replace(/-/g, " ");
        if (scriptFile.name !== File($.fileName).name) {
            scriptList.push({ name: scriptName, path: scriptFile });
        }
    }

    return scriptList;
}

// Group user scripts by the first word in their name
function groupUserScripts(scriptList) {
    var scriptGroups = {};
    for (var i = 0; i < scriptList.length; i++) {
        var scriptName = scriptList[i].name;
        var groupName = scriptName.split(" ")[0];
        if (!scriptGroups[groupName]) {
            scriptGroups[groupName] = [];
        }
        scriptGroups[groupName].push(scriptList[i]);
    }

    return scriptGroups;
}

// Create the palette window
function createPalette(scriptGroups) {
    var palette = new Window("palette", "Custom Scripts (Version 2)", undefined, { closeButton: true });
    palette.alignChildren = ["fill", "top"];
    palette.margins = 10;

    // Add a panel for each group of scripts
    for (var groupName in scriptGroups) {
        var groupPanel = palette.add("panel", undefined, groupName);
        groupPanel.alignment = "fill";
        var groupScripts = scriptGroups[groupName];

        // Create a button for each script in the group
        for (var i = 0; i < groupScripts.length; i++) {
            var script = groupScripts[i];
            var button = groupPanel.add("button", undefined, script.name);
            button.alignment = "fill";
            button.onClick = (function(scriptPath) {
                return function() {
                    app.scriptPreferences.enableRedraw = false; // disable redraw to prevent closing the parent window
                    app.doScript(scriptPath, ScriptLanguage.JAVASCRIPT);
                    app.scriptPreferences.enableRedraw = true; // enable redraw after the child script execution
                };
            })(script.path);
        }
    }

    // Add a close button aligned to the right
    var closeButton = palette.add("button", undefined, "Close");
    closeButton.alignment = ["right", "bottom"];
    closeButton.onClick = function() {
        palette.close();
    };

    return palette;
}
