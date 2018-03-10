var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();

var pageData = new observableModule.fromObject({
  currency: new ObservableArray([
    { code: "SEK" },
    { code: "EUR" }, 
    { code: "GBP" }
  ])
});

var page;

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;
  //#ee671e
}

exports.saveCurrency= function(eventData) {
  const itemView = eventData.view;
  //console.log(itemView.text);
  itemView.color = "#ee671e";
  const navigationEntry = {
    moduleName: "views/newChild/newChild",
    context: {code: itemView.text},
    animated: false,
    backstackVisible: false
  }
  topmost.navigate(navigationEntry);
};