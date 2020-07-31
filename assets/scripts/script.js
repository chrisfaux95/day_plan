//START CONDITONS (HOURS IN 24H TIME)
var startTime = 8;
var endTime = 20;
var durationMinutes = 30;


// Sets the header to include the current day
function setCurrentDay() {
    var day = moment().format("dddd, MMMM Do");
    $("#current-day").text(day);
}


// Creates the table for the planner
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

    /* Loops until the current moment
    is greater than the endMoment,
    creating the table rows and filling them */
    while (indexMoment < endMoment) {
        // Creates the current row and appends to table
        let timeDiv = $("<div>");
        timeDiv.addClass("row my-1");
        timeDiv.appendTo(timeTable);


        currentTime = indexMoment.format("h:mmA");
        // Creates and appends the time label
        let timeLabel = $("<div>").text(currentTime);
        timeLabel.addClass("col-2");
        timeLabel.attr("data-time", currentTime);
        // timeLabel.append($("<hr>"))
        timeDiv.append(timeLabel);

        // Creates Text Input Area
        let planInput = $("<textarea>");
        planInput.addClass("col-8");
        planInput.attr("data-time", currentTime);
        timeDiv.append(planInput);

        //Creates Saving Button
        let planSaveBtn = $("<button>");
        planSaveBtn.addClass("btn btn-info col-1 mx-auto");
        planSaveBtn.attr("data-time", currentTime);
        timeDiv.append(planSaveBtn);

        // Add save icon
        let saveIcon = $("<i>");
        saveIcon.addClass("fas fa-save fa-2x");
        planSaveBtn.append(saveIcon);

        // Increment indexMoment
        indexMoment.add(duration);
    }

    function savePlanner() {

    }
};

setCurrentDay();
renderHours();