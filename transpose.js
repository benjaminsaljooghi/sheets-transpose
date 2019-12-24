 var SHEET_NAME = "Form Responses 1"
 var NAME_CONST = "Name"
 var ROW_BEGIN = 2
 var ROW_END = 10

function rowToDict(sheet, rownumber) {
  var columns = sheet.getRange(1,1,1, sheet.getMaxColumns()).getValues()[0];
  var data = sheet.getDataRange().getValues()[rownumber-1];
  var dict_data = {};
  for (var keys in columns) {
    var key = columns[keys];
    dict_data[key] = data[keys];
  }
  return dict_data;
}

function transpose() {

 
  var spreadsheet = SpreadsheetApp.getActive()
  var sheet = spreadsheet.getSheetByName(SHEET_NAME)
  
  
  var index = {}
  for (var row = row_begin; row <= row_end; row++) {
      var row_dict = rowToDict(sheet, row)   
      var name = row_dict[NAME_CONST]
      index[name] = []
  }

  
    
  for (var row = row_begin; row <= row_end; row++) {
      var row_dict = rowToDict(sheet, row)   
      var name = row_dict[NAME_CONST]
      delete row_dict[NAME_CONST]
      delete row_dict['']
      index[name].push(row_dict)
  }
  
 
  var newSheet = spreadsheet.insertSheet();
  newSheet.setName((new Date()).toISOString());  
  
  
  var current_row = 1
  var current_col = 1
  for (var name in index) {
    var range = newSheet.getRange(current_row, current_col)
    range.setValue(name)
    
    
    current_row += 1
    var num_rows = index[name].length
    var num_cols = Object.keys(index[name][0]).length
    range = newSheet.getRange(current_row, current_col, 1, num_cols)
    var tingbob = Object.keys(index[name][0])
    var tingbob_wrapper = []
    tingbob_wrapper.push(tingbob)
    range.setValues(tingbob_wrapper)
    
    
    current_row += 1

    for (var i = 0; i < num_rows; i++)
    {
      range = newSheet.getRange(current_row, current_col, 1, num_cols)
    
      current_row += 1
      var values = []
      for (var key in index[name][i]) {
       values.push(index[name][i][key] )
      }
      var values_wrapper = []
      values_wrapper.push(values)
      range.setValues(values_wrapper)
    }
    current_row += 1
      
  }
}