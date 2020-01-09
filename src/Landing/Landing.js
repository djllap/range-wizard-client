import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing(props) {
  return (
    <div className="landing-container">
      <section className="hero tutorial-section">
        <h1 className="landing-title"> 
          RANGE WIZARD
        </h1>
        <div className="landing-subtitle">
          A tool to help you organize your many poker ranges into clear, easy to reference charts
        </div>
        <p className="section-para">
          We get it. You have a lot of poker ranges. You tried storing them in Flopzilla, but only being too look at one range at a time is so limiting. You tried making your own multi-range charts in a spreadsheet, but they are so ugly and quickly switching between charts can be difficult. Range Wizard gives you the perfect tool to create beautiful, easy to use poker charts.
        </p>
        <Link
          to="/charts"
          className="cta-btn"
        >
          Start making charts now
        </Link>
      </section>
      
      <section className="get-started tutorial-section">
        <h2 className="section-title">
          Getting Started
        </h2>
        <p className="section-para">
          Click <Link to="/charts">here</Link> to visit the charts page. To select the chart you want to view, you simply select it from the chart dropdown.
        </p> 
        <p className="section-para">
          Each chart has a legend, telling you which ranges are depicted by each color on the chart.
        </p>
      </section>

      <section className="creating-editing tutorial-section">
        <h2 className="section-title">
          Creating Editing, and Deleting Charts
        </h2>

        <h3 className="section-subtitle">
          Edit Mode
        </h3>
        <p className="section-para">
          To create or edit a chart, you must first enter the editing mode, by clicking on the appropriate button. Once in edit mode, you can edit the chart and range names, add or remove ranges, and select which hands belong in each range.
        </p>

        <h3 className="section-subtitle">
          Editing Chart and Range Names
        </h3>
        <p className="section-para">
          To edit either the chart name or the range names, simply click on the name you wish to edit, and begin editing. 
        </p>

        <h3 className="section-subtitle">
          Chaging the Range Color
        </h3>
        <p className="section-para">
          To set the color a range uses, select from the color options by clicking on the color box, and selecting from the dropdown menu.
        </p>

        <h3 className="section-subtitle">
          Selecting Range Hands
        </h3>
        <p className="section-para">
          Whenever you click on a range, it becomes the active range, indicated by a purple background. To set the hands that belong in the selected range, you can click the appropriate hands on the chart. To select multiple hands, click and drag!
        </p>
        <p className="note">
          Note: Each hand can only be present in one range per chart. Adding a hand to a range will remove that hand from all other ranges.
        </p>

        <h3 className="section-subt">
          Deleting Ranges and Charts
        </h3>
        <p className="section-para">
          To delete a range click on the delete button to the right of the range row.
        </p>
        <p className="section-para">
          To delete a chart, you must exit edit mode by clicking the cancel button. Be careful, this will discard any changes you have made in the edit mode. Once you are in the chart view mode, select the chart you want to delete and click the delete button. This will also permanently delete all of the ranges that belong to the chart.  
        </p>

        <h3 className="section-subtitle">
          Submiting Changes
        </h3>
        <p className="section-para">
          No changes you make in edit mode become permenant until you press the submit button. To undo any changes you have made, you can back out of the edit mode without commiting by pressing cancel.
        </p>
      </section>
    </div>
  );
}