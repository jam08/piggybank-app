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

exports.saveType= function(eventData) {
  const itemView = eventData.view;
  itemView.color = "#ee671e";
  const navigationEntry = {
    moduleName: "views/newChild/newChild",
    context: {type: itemView.text},
    animated: false,
    backstackVisible: false
  }
  //const topmost = frameModule.topmost();
  topmost.navigate(navigationEntry);
};