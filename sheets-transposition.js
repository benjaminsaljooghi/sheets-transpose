function copyMarks() {
  
  // Params
  
  var activeSpreadsheet = SpreadsheetApp.getActive();  
  var originalSheet = activeSpreadsheet.getSheetByName("Project-FEEDBACK");
  var range = originalSheet.getRange("A2:N49");
  var headers_range = originalSheet.getRange("A1:N1")
  NUM_HEADERS = 14;
  NUM_COLS = 3; // How many columns in the transposed result for each student.
  SPACING = 1;
  
  
  
  
  // Implementation
  
  var rows = range.getNumRows();
  var cols = range.getNumColumns()
  
  NUM_STUDENTS = rows;
  
  TOTAL_NUM_COLS = (NUM_COLS + SPACING) * NUM_STUDENTS;
  
  var values_array = Array();
  var background_array = Array();
  var format_array = Array();
  var style_array = Array();
  
  for (var header = 0; header < NUM_HEADERS; header++)
  {
    
    values_array.push(Array(TOTAL_NUM_COLS)); 
    background_array.push(Array(TOTAL_NUM_COLS));
    format_array.push(Array(TOTAL_NUM_COLS));
    style_array.push(Array(TOTAL_NUM_COLS));
  }
  
  
  var offset = 0
  for (var row = 1; row <= rows; row++)
  {
   
   for (var col = 1; col <= cols; col++)
   {

     var cellOriginalHeader = headers_range.getCell(1, col);     
     var cellOriginalMarks = range.getCell(row, col);

     values_array[col-1][row-1+0+offset] = cellOriginalHeader.getValue();
     values_array[col-1][row-1+1+offset] = cellOriginalMarks.getValue();
     values_array[col-1][row-1+2+offset] = cellOriginalMarks.getNote();
     values_array[col-1][row-1+3+offset] = ""; // SPACING
     
     background_array[col-1][row-1+0+offset] = cellOriginalHeader.getBackground();
     
     // do not copy background for total colour
     if (col != cols)
     {
       background_array[col-1][row-1+1+offset] = cellOriginalMarks.getBackground();
     }

     format_array[col-1][row-1+0+offset] = cellOriginalHeader.getNumberFormat();
     format_array[col-1][row-1+1+offset] = cellOriginalMarks.getNumberFormat();
     
     
   }
    offset += NUM_COLS + SPACING - 1; // -1 because already offset by 1 by row++
  }
  
  
  var newSheet = activeSpreadsheet.insertSheet();
  newSheet.setName((new Date()).toISOString());
  var range = newSheet.getRange(1, 1, NUM_HEADERS, TOTAL_NUM_COLS)
  range.setValues(values_array)
  range.setBackgrounds(background_array)
  range.setNumberFormats(format_array)
  range.setFontWeight(style_array)
}
