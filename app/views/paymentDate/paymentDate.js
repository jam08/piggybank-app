//var frameModule = require("ui/frame");
var topmost = require("ui/frame").topmost();
var datePickerModule = require("ui/date-picker");

let allowanceType;
let firstPayment;
let page;
let date;
let datePicker;

var getNewDate = function() {
  date = datePicker.date;
  const weekday = date.getDay();
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  firstPayment = {
    year: yyyy,
    month: mm,
    day: dd
  };
  return firstPayment;
}

exports.onLoaded = function(args) {
  page = args.object;
  datePicker = page.getViewById("datePicker");
  date = datePicker.date;
  
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
}

exports.pageNavigatedTo = function(args) {
  let context = args.object.navigationContext;
  allowanceType = context.type;
}

exports.onTap = function() {
  let payday = getNewDate();
  const navigationEntry = {
    moduleName: "views/newChild/newChild",
    context: {firstPayment: payday, type: allowanceType},
    animated: false,
    backstackVisible: false
  }
  console.log(firstPayment);

  topmost.navigate(navigationEntry);
}
