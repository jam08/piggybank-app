var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();

var pageData = new observableModule.fromObject({
  week: new ObservableArray([
    { weekday: "SUNDAY", index: 0 },
    { weekday: "MONDAY", index: 1 },
    { weekday: "TUESDAY", index: 2 }, 
    { weekday: "WEDNESDAY", index: 3 },
    { weekday: "THURSDAY", index: 4 },
    { weekday: "FRIDAY", index: 5 },
    { weekday: "SATURDAY", index: 6 }
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
  let weekdayIndex;
  let week = pageData.get("week");
  week.map((obj) => {
    obj.weekday === itemView.text ? weekdayIndex = obj.index : "";
  })
  console.log(weekdayIndex);
  const navigationEntry = {
    moduleName: "views/newChild/newChild",
    context: {type: type, weekday: weekdayIndex },
    animated: false,
  }

  topmost.navigate(navigationEntry);

};