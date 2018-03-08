//var frameModule = require("ui/frame");
var topmost = require("ui/frame").topmost();

let firstPayment;

exports.onLoaded = function(args) {
  const page = args.object;
  const date = page.getViewById("datePicker").date;
  
  const weekday = date.getDay();
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  firstPayment = yyyy + "/" + mm + "/" + dd;
  console.log(firstPayment);
}

exports.onTap = function() {
  const navigationEntry = {
    moduleName: "views/newChild/newChild",
    context: {firstPayment: firstPayment, type: "MONTHLY"},
    animated: false,
    backstackVisible: false
  }
  console.log(firstPayment);

  topmost.navigate(navigationEntry);
}
