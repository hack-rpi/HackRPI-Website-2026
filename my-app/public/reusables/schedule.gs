//A google app script that attaches to a sheet and generates json that can be accepted by the website
//I tried my best to notate this if it does get used and someone has to maintain this in the future
//alot of this is hard coded lol so please do be carful when modifying stuff, hopefully I get around to writing the rules for the sheet

//shit is stright ai generated (I didn't want to do this lol)
function getExpandedValues(values, startRow, startCol) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Dimensions of the provided array
  const numRows = values.length;
  const numCols = values[0].length;

  // Get the corresponding sheet range (1-based coordinates)
  const range = sheet.getRange(
    startRow,
    startCol,
    numRows,
    numCols
  );

  // Find merged ranges intersecting this portion of the sheet
  const mergedRanges = range.getMergedRanges();

  mergedRanges.forEach(mergedRange => {
    const mergeStartRow = mergedRange.getRow();
    const mergeStartCol = mergedRange.getColumn();
    const mergeEndRow = mergeStartRow + mergedRange.getNumRows() - 1;
    const mergeEndCol = mergeStartCol + mergedRange.getNumColumns() - 1;

    // Read the value from the top-left cell of the merge
    const mergedValue = mergedRange.getCell(1, 1).getValue();

    // Fill only the cells represented in the provided array
    for (let r = Math.max(mergeStartRow, startRow);
         r <= Math.min(mergeEndRow, startRow + numRows - 1);
         r++) {

      for (let c = Math.max(mergeStartCol, startCol);
           c <= Math.min(mergeEndCol, startCol + numCols - 1);
           c++) {

        values[r - startRow][c - startCol] = mergedValue;
      }
    }
  });

  return values;
}

function doGet(e){
  const scriptProperties = PropertiesService.getScriptProperties();
  const storedValue = scriptProperties.getProperty("current")
  if (storedValue != null){
    var responseData = {
      "status": "cached",
      "json": storedValue
    };
    return ContentService.createTextOutput(JSON.stringify(responseData))
                       .setMimeType(ContentService.MimeType.JSON);
  }
}

function onEdit(e) {
  //gets sheet object
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("data for web");
  //gets time zone
  const timeZone = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone();
  //valid colors for event
  const colors = ["#b7ff98","#e2baff","#9fc5e8","#f9cb9c","#b7b7b7"]
  const eventType = ["food","workshop","constant","important","deadline"]

  //sets the lists up for the two days (does not support friday because nothing happens that day)
  var schedule = {};
  var saturdayEvents = [];
  var sundayEvents = [];
  //sets up a list of ranges for colums
  const cols = [1,3,4,5];
  //event count for iding them
  var eventcount = 0;
  //loads in the sheet because loading is really expensive
  const maxRows = sheet.getLastRow();
  const range = sheet.getRange(`A1:F${maxRows}`);
  const junkValues = range.getValues();
  const values = getExpandedValues(junkValues,1,1)
  const backgrounds = range.getBackgrounds();

  //gets the length of the schedule also get what cell switches it to a sunday.
  var length = 0;
  var sundayCell = 0;

  while (backgrounds[length+1][0] != "#ffffff"){
    length++;
    if (values[length][0] instanceof Date){
      if (Utilities.formatDate(values[length][0],timeZone,"HH:mm:ss") == "00:00:00") {
        sundayCell = length+1;
        break;
      }
    }
  }
  for (let i = 0; i < 4; i++){
    let lastEvent = undefined;
    let scheduleEntry ={};
    for (let j = 4; j < maxRows; j++){
      let curEvent = values[j][cols[i]]
      if (lastEvent == curEvent) continue;
      let time = values[j][0];
      let color = backgrounds[j][cols[i]];
      //checks cell background to check for valid event, if its not set the event string to be blank
      if (!colors.includes(color)) curEvent = "";
      if (lastEvent != curEvent) {
        if (lastEvent != ""){
          scheduleEntry["endTime"] = Utilities.formatDate(time,timeZone,"HH:mm:ss");
          if (j < sundayCell){
            saturdayEvents.push(scheduleEntry);
          } else {
            sundayEvents.push(scheduleEntry);
          }
        }
        if (curEvent != ""){
          scheduleEntry = {};
          let lines = curEvent.split(/\r?\n/);
          scheduleEntry["id"] = eventcount;
          scheduleEntry["title"] = lines[0];
          scheduleEntry["location"] = lines[1];
          //placeholder as there is no way to do this rn
          scheduleEntry["description"] = "";
          scheduleEntry["speaker"] = "";
          scheduleEntry["visable"] = true;
          //INSERT type logic HERE
          scheduleEntry["eventType"] = eventType[colors.indexOf(color)];
          scheduleEntry["column"] = i+1;
          scheduleEntry["startTime"] = Utilities.formatDate(time,timeZone,"HH:mm:ss");
          eventcount++;
        }
        lastEvent = curEvent;
      }
      
    }
  }

  schedule["saturdayEvents"] = saturdayEvents;
  schedule["sundayEvents"] = sundayEvents;
  const jsonResult = JSON.stringify(schedule);
  var responseData = {
    "status": "generated",
    "json": jsonResult
  };
  //sets the cache up
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.deleteAllProperties();
  scriptProperties.setProperty("current",jsonResult);
  // Return the result as a JSON response
  return ContentService.createTextOutput(JSON.stringify(responseData))
                       .setMimeType(ContentService.MimeType.JSON);
}

//for testing
//console.log(doGet(1).getContent());