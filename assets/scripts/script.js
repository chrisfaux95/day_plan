//START CONDITONS (HOURS IN 24H TIME)
var startTime = 8;
var endTime = 20;
// Duration between time slots in minutes
var durationMinutes = 30;
// Blank Variable for current time (from moment.js)
var currentTime;
// Variable for easy change and reference of local storage key
var storageIndex = "planner";


// Sets the header to include the current day
function setCurrentDay() {
    var day = moment().format("dddd, MMMM Do");
    $("#current-day").text(day);
}


// Creates the planner body
function renderHours() {

    /* Set the values for the index time,
    end time, and the incrementing duration 
    
    endMoment has a value of 1 minute
    to include the last time slot */
    let indexMoment = moment({ hour: startTime, minutes: 0, seconds: 0 });
    let endMoment = moment({ hour: endTime, minutes: 1, seconds: 0 });
    let duration = moment.duration(durationMinutes, "minute")

    // Creates the table and appends it to main
    let timeTable = $("main");

    // Updates the current time
    updateTime();

    /* Loops until the current moment
    is greater than the endMoment,
    creating the table rows and filling them */
    while (indexMoment < endMoment) {
        // Creates the current row and appends to time table
        let timeDiv = $("<div>");
        timeDiv.addClass("row my-1");
        timeDiv.appendTo(timeTable);

        /* Formats the indexed time to two distinct formats,
         one for displaying in the label for each row, 
         and one for setting as an attribute */
        indexTime = indexMoment.format("h:mm A");
        dataTime = indexMoment.format("HHmm");

        // Creates and appends the time label
        let timeLabel = $("<h5>").text(indexTime);
        timeLabel.addClass("col-2");
        timeLabel.attr("data-time", dataTime);
        timeDiv.append(timeLabel);

        // Creates Text Input Area
        let planInput = $("<textarea>");
        planInput.addClass("col-8");
        planInput.attr("data-time", dataTime);
        timeDiv.append(planInput);

        //changes the bg of the text areas base upon current time
        bgChangeTime(planInput, dataTime);

        //Creates save button for the row
        let planSaveBtn = $("<button>");
        planSaveBtn.addClass("btn btn-info col-1 mx-auto save-button");
        planSaveBtn.attr("data-time", dataTime);
        timeDiv.append(planSaveBtn);

        // Add save icon to button
        let saveIcon = $("<i>");
        saveIcon.addClass("fas fa-save fa-2x");
        planSaveBtn.append(saveIcon);

        // Increment indexMoment by duration
        indexMoment.add(duration);
    }
};


/* Function to change the background of a given element
 based upon whether the current time is before, during, or after,
 the described duration. */
function bgChangeTime(element, timeIndex) {
    // Formats the current time to be something useful
    let currentTimeNum = parseInt(currentTime.format("HHmm"));
    let indexNum = parseInt(timeIndex);
    // Compares the two times
    if (currentTimeNum < indexNum) {
        /* if the current time is upcoming,
           make the background grey */
        element.addClass("bg-secondary");
    } else {
        //otherwise
        if (currentTimeNum <= indexNum + durationMinutes) {
            /* If the current time is within the duration,
               make the background green */
            element.addClass("bg-success");
        } else {
            /* if the current time has passed,
               make the background red */
            element.addClass("bg-danger");
        }
    }
}


/* Function to save the value of the textarea 
sharing the same time as the pressed button to 
local storage */
function savePlanner() {
    // Gets the saved object from local storage
    let saveText = JSON.parse(localStorage.getItem(storageIndex));
    // Gets the data-time from the currently pressed button
    let dataTime = $(this).attr("data-time")
    // Specifies a string to find the textarea with the same data-time
    let attrStr = "textarea[data-time='" + dataTime + "']"
    // Saves the text of the found textarea to the saveText object with the key of data-time
    saveText[dataTime] = $(attrStr).val();
    // Saves the object to local storage
    localStorage.setItem(storageIndex, JSON.stringify(saveText));
}
/* Function that save all of the textareas values to the local storage */
function savePlannerAll() {
    // Creates a blank object
    let saveText = {};
    // Loop through all of the textareas
    $("textarea").each(function () {
        // Gets both the text and the data-time from the current textarea
        let inputText = $(this).val();
        let inputData = $(this).attr("data-time");
        // Saves the current textarea value to the object
        saveText[inputData] = inputText;
    })
    // Saves object to local storage
    localStorage.setItem(storageIndex, JSON.stringify(saveText));
}

/* Function to retrieve the stored planner from localStorage */ 
function getPlanner() {
    // Gets object from local storage
    let savedText = JSON.parse(localStorage.getItem(storageIndex));
    // Loops through all of the text areas
    $("textarea").each(function () {
        /* Sets value of the textarea to be equal
           to the retrieved text from the object */
        $(this).val(savedText[$(this).attr("data-time")]);
    })
}

/* Simple function to update the time */
function updateTime() {
    currentTime = moment();
}

// Creates the click listener on all of the buttons
$(document).on("click", ".save-button", savePlanner);
// Creates the click listener on the saveall button
$("#save-all").on("click", savePlannerAll);

// Run necessary functions
setCurrentDay();
renderHours();
getPlanner();