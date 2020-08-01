//START CONDITONS (HOURS IN 24H TIME)
var startTime = 8;
var endTime = 20;
//Duration between time slots in minutes
var durationMinutes = 30;
//Blank Variable for current time (from moment.js)
var currentTime;


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

    updateTime();
    /* Loops until the current moment
    is greater than the endMoment,
    creating the table rows and filling them */
    while (indexMoment < endMoment) {
        // Creates the current row and appends to table
        let timeDiv = $("<div>");
        timeDiv.addClass("row my-1");
        timeDiv.appendTo(timeTable);


        indexTime = indexMoment.format("h:mm A");
        dataTime = indexMoment.format("HHmm");

        // Creates and appends the time label
        let timeLabel = $("<h5>").text(indexTime);
        timeLabel.addClass("col-2");
        timeLabel.attr("data-time", dataTime);
        // timeLabel.append($("<hr>"))
        timeDiv.append(timeLabel);

        // Creates Text Input Area
        let planInput = $("<textarea>");
        planInput.addClass("col-8");
        planInput.attr("data-time", dataTime);
        timeDiv.append(planInput);

        bgChangeTime(planInput, dataTime);

        //Creates Saving Button
        let planSaveBtn = $("<button>");
        planSaveBtn.addClass("btn btn-info col-1 mx-auto save-button");
        planSaveBtn.attr("data-time", dataTime);
        timeDiv.append(planSaveBtn);

        // Add save icon
        let saveIcon = $("<i>");
        saveIcon.addClass("fas fa-save fa-2x");
        planSaveBtn.append(saveIcon);

        // Increment indexMoment
        indexMoment.add(duration);
    }
    function bgChangeTime(element, timeIndex) {
        let currentTimeNum = parseInt(currentTime.format("HHmm"));
        let indexNum = parseInt(timeIndex);
        if (currentTimeNum < indexNum) {
            element.addClass("bg-secondary");
        } else {
            if (currentTimeNum < indexNum + durationMinutes) {
                element.addClass("bg-success");
            } else {
                element.addClass("bg-danger");
            }
        }
    }
};


function savePlanner() {
    // Makes a local
    var saveText = {};
    $("textarea").each(function () {

        let inputText = $(this).val();

        let inputData = $(this).attr("data-time");

        saveText[inputData] = inputText;
    })
    localStorage.setItem("planner", JSON.stringify(saveText));
}

function savePlannerAll(){
    var saveText = {};
    $("textarea").each(function () {

        let inputText = $(this).val();

        let inputData = $(this).attr("data-time");

        saveText[inputData] = inputText;
    })
    localStorage.setItem("planner", JSON.stringify(saveText));
}

function getPlanner() {
    var savedText = JSON.parse(localStorage.getItem("planner"));
    $("textarea").each(function () {
        $(this).val(savedText[$(this).attr("data-time")]);
    })
}


function updateTime() {
    currentTime = moment();
}

$(document).on("click", ".save-button", savePlanner);


setCurrentDay();
renderHours();
getPlanner();