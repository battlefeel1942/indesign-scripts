# Adobe InDesign Scripts

This repository contains a collection of useful scripts for Adobe InDesign to enhance your workflow. Below is a list of scripts included in this repository, along with a brief description of each.

## Scripts

### 0_Window.jsx
A custom palette window that dynamically lists the following scripts from the user's scripts folder, providing buttons to execute each script directly.

### Auto-Bold.jsx
Applies a character style named 'AutoBold' to specified search terms within all text frames. This character style can later be replaced by a character style of your choosing.

### Convert-Paragraph-Language-to-UK-English.jsx
Converts the language of selected paragraphs from "English: USA" to "English: UK", with options to apply this conversion specifically to US English or to any language.

### Create-Event-Ticket-Counter.jsx
Sequentially numbers all text frames (excluding those on master pages) with a 'Ticket #' prefix and zero-padded numbers.

### Fix-Fractional-Font-Sizes.jsx
Rounds the font size of each paragraph to the nearest 0.5-point increment and displays the count of updated paragraphs.

### Match-Object-Dimensions.jsx
Allows the user to match the dimensions of selected objects either by width or height. It includes options to reverse the target object used for matching.

### Match-Object-to-Page-Size.jsx
Creates a custom palette in Adobe InDesign that allows users to resize selected objects to match the page size, margin, or bleed area.

### Remove-Imported-Bullet-Points.jsx
Removes bullet points from the text content of a selected text frame.

### Remove-Unused-Swatches.jsx
Identifies and removes unused swatches from an Adobe InDesign document, displaying a summary of the removed swatches.

### Remove-all-Line-Breaks.jsx
Removes all line breaks and tabs from the text content of a selected text frame, replacing them with a single space.

### Show-Empty-Text-Boxes.jsx
Identifies and lists all empty text frames, displaying the section name and page number for each empty frame.

### Show-List-of-Duplicate-Images.jsx
Identifies and lists duplicate images used, displaying the file paths of images that appear more than once.

### Show-List-of-Images-that-are-Smaller-than-their-Container.jsx
Identifies images that do not fully fill their containers, listing these images along with the pages where they are located.

### Show-List-of-Paragraph-Only-Font-Sizes.jsx
Lists all unique font sizes used in paragraphs within an Adobe InDesign document, displaying their frequency and the pages and coordinates of their occurrence (for the first 10 instances of each font size).

### Show-List-of-Sections.jsx
Lists all sections, indicating empty sections with a placeholder, and displays the list.

### Swap-Object-Positions.jsx
Swaps the positions of two selected objects while ensuring that any images within the frames maintain their positions and fitting options.

### Update-Page-Locks.jsx
Locks or unlocks all pages, with a summary of locked, unlocked, and empty pages.

### Update-Units.jsx
Displays the current horizontal, vertical, and stroke measurement units. It provides a button to update these units to millimeters.

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