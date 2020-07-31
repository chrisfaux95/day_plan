var startTime = 9;
var endTime = 17;
var durationMinutes = 30;

function setCurrentDay() {
    var day = moment().format("dddd, MMMM Do");
    $("#current-day").text(day);
}

function renderHours() {
    let startMoment = moment({hour: startTime});
    let endMoment = moment({hour: endTime, minutes: 1});
    let duration = moment.duration(durationMinutes, "minute")
    // console.log(startMoment);
    let timeTable = $("<table>");
    timeTable.appendTo($("main"));
    while(startMoment < endMoment){
        let timeDiv = $("<tr>");
        timeDiv.append($("<td>").text(startMoment.format("h:mmA")));
        timeDiv.appendTo(timeTable);
        startMoment.add(duration);
    }
};

setCurrentDay();
renderHours();