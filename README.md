# Adobe InDesign Scripts

This repository contains a collection of useful scripts for Adobe InDesign to enhance your workflow. Below is a list of scripts included in this repository, along with a brief description of each.

## Scripts

### 0_Window.jsx
A custom palette window that dynamically lists the following scripts from the user's scripts folder, providing buttons to execute each script directly.

![Window Example](https://github.com/battlefeel1942/indesign-scripts/blob/main/images/window-001.png)

<hr>

### Auto-Bold.jsx
Applies a character style named 'AutoBold' to specified search terms within all text frames. This character style can later be replaced by a character style of your choosing.

![AutoBold Example](https://github.com/battlefeel1942/indesign-scripts/blob/main/images/autobold-001.png)

<hr>

### Convert-Paragraph-Language-to-UK-English.jsx
Converts the language of selected paragraphs from "English: USA" to "English: UK", with options to apply this conversion specifically to US English or to any language.

![ConverToUKEnglish Example](https://github.com/battlefeel1942/indesign-scripts/blob/main/images/converttoukenglish-001.png)

<hr>

### Create-Event-Ticket-Counter.jsx
Sequentially numbers all text frames (excluding those on master pages) with a 'Ticket #' prefix and zero-padded numbers.

<hr>

### Fix-Fractional-Font-Sizes.jsx
Rounds the font size of each paragraph to the nearest 0.5-point increment and displays the count of updated paragraphs.

<hr>

### Match-Object-Dimensions.jsx
Allows the user to match the dimensions of selected objects either by width or height. It includes options to reverse the target object used for matching.

![MatchObjectDimensions Example](https://github.com/battlefeel1942/indesign-scripts/blob/main/images/matchobjecttarget-001.png)

<hr>

### Match-Object-to-Page-Size.jsx
Allows users to resize selected objects to match the page size, margin, or bleed area.

![MatchObjectToPageSize Example](https://github.com/battlefeel1942/indesign-scripts/blob/main/images/matchobjecttopagesize-001.png)

<hr>

### Remove-Imported-Bullet-Points.jsx
Removes bullet points from the text content of a selected text frame.

<hr>

### Remove-Unused-Swatches.jsx
Identifies and removes unused swatches, displaying a summary of the removed swatches.

<hr>

### Remove-all-Line-Breaks.jsx
Removes all line breaks and tabs from the text content of a selected text frame, replacing them with a single space.

<hr>

### Show-Empty-Text-Boxes.jsx
Identifies and lists all empty text frames, displaying the section name and page number for each empty frame.

<hr>

### Show-List-of-Duplicate-Images.jsx
Identifies and lists duplicate images used, displaying the file paths of images that appear more than once.

<hr>

### Show-List-of-Images-that-are-Smaller-than-their-Container.jsx
Identifies images that do not fully fill their containers, listing these images along with the pages where they are located.

<hr>

### Show-List-of-Paragraph-Only-Font-Sizes.jsx
Lists all unique font sizes used in paragraphs, displaying their frequency and the pages and coordinates of their occurrence (for the first 10 instances of each font size).

<hr>

### Show-List-of-Sections.jsx
Lists all sections, indicating empty sections with a placeholder, and displays the list.

<hr>

### Swap-Object-Positions.jsx
Swaps the positions of two selected objects while ensuring that any images within the frames maintain their positions and fitting options.

<hr>

### Update-Page-Locks.jsx
Locks or unlocks all pages, with a summary of locked, unlocked, and empty pages.

![UpdatePageLocks Example](https://github.com/battlefeel1942/indesign-scripts/blob/main/images/updatepagelocks-001.png)

<hr>

### Update-Units.jsx
Displays the current horizontal, vertical, and stroke measurement units. It provides a button to update these units to millimeters.

<hr>

## Usage

To use these scripts, follow these steps:

1. Download or clone this repository.
2. Open Adobe InDesign.
3. Navigate to `File` > `Scripts` > `Script Panel`.
4. In the Script Panel, right-click on the `User` folder and select `Reveal in Finder` (macOS) or `Reveal in Explorer` (Windows).
5. Copy the desired scripts from this repository into the `Scripts Panel` folder that appears.
6. Run the scripts directly from the Script Panel in Adobe InDesign.

## Contributing

If you have any improvements or additional scripts you would like to share, feel free to fork this repository and submit a pull request. Contributions are always welcome!

## License

This project is licensed under the MIT License.
