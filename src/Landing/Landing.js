import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing(props) {
  return (
    <div className="landing-container">
      <section className="hero tutorial-section">
        <div className="content-area">
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

        </div>
      </section>
      
      <section className="get-started tutorial-section">
        <div className="content-area">
          <h2 className="section-title">
            How It Works
          </h2>
          <p className="section-para">
            Range Wizard allows you to organize related ranges into a single, color-coded chart. The interface is simple and intuitive, so even those without much experience with computers can use Range Wizard without difficulty. 
          </p>

          <h3 className="section-subtitle">
            Viewing Your Charts
          </h3>
          <div className="p-with-img">
            <p className="section-para">
              To select which of your charts you wish to see, select the chart from the dropdown menu immediately below the chart.
            </p>
            <img
              className="section-img"
              src={require('./select-chart.gif')} 
              alt="select chart demo"
            />
          </div>

          <h3 className="section-subtitle">
            Edit Mode
          </h3>
          <div className="p-with-img">
            <div>
              <p className="section-para">
                To create or edit a chart, you must first enter the editing mode, by clicking on the appropriate button. Once in edit mode, you can edit the chart and range names, add or remove ranges, and select which hands belong in each range.
              </p>
              <p className="section-para">
                To edit either the chart name or a range name, simply click on the name you wish to edit, and begin editing. 
              </p>
              <p className="section-para">
                Clicking anywhere on a range will select that range as the current range, indicated by the purple color.
              </p>
            </div>
            <img
              className="section-img"
              src={require('./edit-mode.gif')} 
              alt="chart buttons demo"
            />
          </div>

          <h3 className="section-subtitle">
            Chaging Range Colors and Hands
          </h3>

          <div className="p-with-img">
            <div>
              <p className="section-para">
                To set the color a range uses, select from the color options by clicking on the color box, and selecting from the dropdown menu.
              </p>
              <p className="section-para">
                To set the hands that belong in the selected range, you can click the appropriate hands on the chart. To select multiple hands, click and drag!
              </p>
              <p className="note">
                Note: Each hand can only be present in one range per chart. Adding a hand to a range will remove that hand from all other ranges.
              </p>
            </div>
            <img 
              src={require('./edit-color-and-hands.gif')} 
              alt="color select demo"
              className="section-img"
            />
          </div>

          <h3 className="section-subtitle">
            Adding and Deleting Ranges
          </h3>
          <div className="p-with-img">
            <div>
              <p className="section-para">
                To add a range, you must be in edit mode. Click on the add range button, and a new default range will appear. You can now edit this range just like any other, changing its name, color and hands.
              </p>
              <p className="section-para">
                To delete a range click on the trash can button on the right of the range row. Deleting a range will automatically remove its color from the chart.
              </p>
              <p className="note">
                Note: if you accidentally delete a range, you can click the cancel button to eliminate any unsubmitted changes to your chart.

              </p>
            </div>
            <img 
              src={require('./add-and-delete-ranges.gif')} 
              alt="range color and hands demo"
              className="section-img"
            />
          </div>

          <h3 className="section-subtitle">
            Submitting Changes
          </h3>
          <p className="section-para">
            No changes you make in edit mode become permanent until you press the submit button. To undo any changes you have made, you can back out of the edit mode without committing by pressing cancel.
          </p>

          <h3 className="section-subtitle">
            Deleting Charts
          </h3>
          <div className="p-with-img">
            <div>
              <p className="section-para">
                In the case you wish to delete an entire chart, including all of its ranges, you must be in view mode, not edit mode. From here, all you have to do is select the chart you wish to delete from the dropdown, and click the delete button.
              </p>
              <p className="note">
                Note: This will permanently delete your chart and all of its ranges. take this action with care.
              </p>
            </div>
            <img 
              src={require('./delete-chart.gif')} 
              alt="delete chart demo"
              className="section-img"
            />
          </div>
        </div>
      </section>
    </div>
  );
}