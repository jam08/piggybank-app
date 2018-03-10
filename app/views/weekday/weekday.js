var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();

var pageData = new observableModule.fromObject({
  week: new ObservableArray([
    { weekday: "SUNDAY" },
    { weekday: "MONDAY" },
    { weekday: "TUESDAY" }, 
    { weekday: "WEDNESDAY" },
    { weekday: "THURSDAY" },
    { weekday: "FRIDAY" },
    { weekday: "SATURDAY" }
  ])
});

let page;
let context;
let type;

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;
}

exports.pageNavigatedTo = function(args) {
  context = args.object.navigationContext;
  type = context.type;
  console.log(type);
}

exports.saveWeekday= function(eventData) {
  const itemView = eventData.view;
  const navigationEntry = {
    moduleName: "views/newChild/newChild",
    context: {type: type, weekday: itemView.text },
    animated: false,
  }

  topmost.navigate(navigationEntry);

};