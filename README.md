# Range Wizard
A tool to help you organize your many poker ranges into clear, easy to reference charts

Hosted live at [range-wizard.now.sh/](https://range-wizard.now.sh/)

Source code at [github.com/djllap/range-wizard-client](https://github.com/djllap/range-wizard-client)

## What is it?
Range Wizard is a tool for collecting and referencing poker range charts. Serious poker players often build many 'ranges', a given set of hands that they will play the same way in specific circumstances. Ranges are a good way to keep your play consistent and mathematically viable (e.g., by bluffing only on the hands in your range, you can control precisely your bluff to value bet ratio).

Range wizard allows color coded ranges to be grouped and displayed on a single chart, making reference much easier. and even possible during online play.

## Technology Stack
Range Wizard has an Express/Node backend API, with an independent React front end with React-Router. Styling is done with vanilla CSS only.

## API Documentation
[Range Wizard API](https://github.com/djllap/range-wizard-api/blob/master/README.md)

## How it Works
Range Wizard allows you to organize related ranges into a single, color-coded chart. The interface is simple and intuitive, so even those without much experience with computers can use Range Wizard without difficulty.

### Viewing Your Charts

To select which of your charts you wish to see, select the chart from the dropdown menu immediately below the chart.

<img src="/src/Landing/select-chart.gif" alt="select chart" width="300">

### Edit Mode
To create or edit a chart, you must first enter the editing mode, by clicking on the appropriate button. Once in edit mode, you can edit the chart and range names, add or remove ranges, and select which hands belong in each range.

To edit either the chart name or a range name, simply click on the name you wish to edit, and begin editing.

Clicking anywhere on a range will select that range as the current range, indicated by the purple color.

<img src="/src/Landing/edit-mode.gif" alt="edit mode" width="300">

### Chaging Range Colors and Hands

To set the color a range uses, select from the color options by clicking on the color box, and selecting from the dropdown menu.

To set the hands that belong in the selected range, you can click the appropriate hands on the chart. To select multiple hands, click and drag!

Note: Each hand can only be present in one range per chart. Adding a hand to a range will remove that hand from all other ranges.

<img src="/src/Landing/edit-color-and-hands.gif" alt="edit color and hands" width="300">

### Adding and Deleting Ranges

To add a range, you must be in edit mode. Click on the add range button, and a new default range will appear. You can now edit this range just like any other, changing its name, color and hands.

To delete a range click on the trash can button on the right of the range row. Deleting a range will automatically remove its color from the chart.

Note: if you accidentally delete a range, you can click the cancel button to eliminate any unsubmitted changes to your chart.

<img src="/src/Landing/add-and-delete-ranges.gif" alt="add and delete ranges" width="300">

### Submitting Changes

No changes you make in edit mode become permanent until you press the submit button. To undo any changes you have made, you can back out of the edit mode without committing by pressing cancel.

### Deleting Charts

In the case you wish to delete an entire chart, including all of its ranges, you must be in view mode, not edit mode. From here, all you have to do is select the chart you wish to delete from the dropdown, and click the delete button.

Note: This will permanently delete your chart and all of its ranges. take this action with care.

<img src="/src/Landing/delete-chart.gif" alt="delete chart" width="300">
