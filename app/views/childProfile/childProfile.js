//const firebase = require("nativescript-plugin-firebase");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var topmost = require("ui/frame").topmost();

var pageData = new observableModule.fromObject({
});

let weekday = ["SUNDAY", "MONDAY", "TUESDAY","WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

exports.loaded = function(args) {
  let page = args.object;
  page.bindingContext = pageData;
  
}
exports.pageNavigatedTo = function(args) {

  let today = new Date();
  let day = today.getDay();
  console.log(weekday[day]); 
  let allowanceDay = weekday[day];
  
  
  let context = args.object.navigationContext;

  console.log(context.childInfo.weekday);

  pageData.set("image", context.childInfo.image);
  pageData.set("name", context.childInfo.name);
  pageData.set("balance", context.childInfo.balance);
  //pageData.set("allowanceDay", )
  let message = "Next allowance in ";
  
  allowanceDay === context.childInfo.weekday
  ?
  pageData.set("message", "Yay, allowance day!")
  :
  pageData.set("message", message);
}