//START CONDITONS (HOURS IN 24H TIME)
var startTime = 8;
var endTime = 20;
var durationMinutes = 30;


//Sets the header to include the current day
function setCurrentDay() {
    var day = moment().format("dddd, MMMM Do");
    $("#current-day").text(day);
}

//creates the table for the planner
function renderHours() {
    let currentMoment = moment({hour: startTime});
    let endMoment = moment({hour: endTime, minutes: 1});
    let duration = moment.duration(durationMinutes, "minute")
    //
    let timeTable = $("<table>");
    timeTable.appendTo($("main"));
    while(currentMoment < endMoment){
        //create the row
        let timeDiv = $("<tr>");
        //create and append the time at beginning of row
        timeDiv.append($("<td>").text(currentMoment.format("h:mmA")));
        timeDiv.appendTo(timeTable);
        //increase time of 
        currentMoment.add(duration);
    }
};

setCurrentDay();
renderHours();