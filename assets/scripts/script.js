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

    let currentMoment = moment({hour: startTime});
    let endMoment = moment({hour: endTime, minutes: 1});
    let duration = moment.duration(durationMinutes, "minute")

    // Creates the table and appends it to main
    let timeTable = $("<table>");
    timeTable.appendTo($("main"));

    /* Loops until the current moment
    is greater than the endMoment,
    creating the table rows and filling them */
    while(currentMoment < endMoment){
        // Creates the current row and appends to table
        let timeDiv = $("<tr>");
        timeDiv.appendTo(timeTable);

        // Creates and appends the time label
        timeDiv.append($("<td>").text(currentMoment.format("h:mmA")));
        
        // Increment currentMoment
        currentMoment.add(duration);
    }
};

setCurrentDay();
renderHours();