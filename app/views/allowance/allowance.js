var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();

var pageData = new observableModule.fromObject({
  allowance: new ObservableArray([
    { type: "WEEKLY" },
    { type: "BI-WEEKLY" }, 
    { type: "MONTHLY" }
  ])
});

var page;

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;
  //#ee671e
}

exports.onTap = function(eventData) {
  const itemView = eventData.view;
  let navigationEntry;
  console.log("from allowance: " + itemView.text);
  itemView.text === "WEEKLY"
  ? 
  navigationEntry = {
    moduleName: "views/weekday/weekday",
    context: { type: itemView.text },
    animated: false
  }
  :
  navigationEntry = {
    moduleName: "views/paymentDate/paymentDate",
    context: { type: itemView.text },
    animated: false
  }
  topmost.navigate(navigationEntry);
}