const firebase = require("nativescript-plugin-firebase");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var topmost = require("ui/frame").topmost();

var pageData = new observableModule.fromObject({
  childName: "Child Name",
  allowanceType: "choose",
  weekday: "",
  currencyCode: "choose",
  amount: "0",
  firstPayment: ""
});

let page;
let userKey;
let children = [];

exports.loaded = function(args) {

  page = args.object;
  page.bindingContext = pageData;

}

exports.pageNavigatedTo = function(args) {

  var context = args.object.navigationContext;
  if(context) {
    context.type ? pageData.set("allowanceType", context.type) : "";
    context.code ? pageData.set("currencyCode", context.code) : "";
    context.firstPayment ? pageData.set("firstPayment", context.firstPayment) : ""
    context.userKey ? userKey = context.userKey : "";
    context.children ? children = context.children : "";
    context.weekday ? pageData.set("weekday", context.weekday) : "";
  }else {
    console.log("No navigation context");
  }

}

exports.onFocusName = function(eventData) {

  const text = eventData.object.text;
  text === "Child Name" ? pageData.set("childName", "") : "";

}

exports.onFocusAmount = function(eventData) {

  const amount = eventData.object.text;
  amount === "0" ? pageData.set("amount", "") : console.log(amount);

}

exports.onDatePickerLoaded = function(args) {

  let datePicker = args.object;
  let today = new Date();
  datePicker.day = today.getDate();
  datePicker.month = today.getMonth() + 1;
  datePicker.year = today.getFullYear();

}

exports.onTap = function(eventData) {

  const viewId = eventData.object.id;
  viewId === "type" 
  ? 
  topmost.navigate("views/allowance/allowance") 
  : 
  topmost.navigate("views/currency/currency");

}

exports.saveChild = function() {
  console.log(children); 

  const newChild = {
    name: pageData.get("childName"),
    allowanceType: pageData.get("allowanceType"),
    weekday: pageData.get("weekday"),
    currencyCode: pageData.get("currencyCode"),
    amount: pageData.get("amount"),
    firstPayment: pageData.get("firstPayment"),
    balance: 0,
    parent: userKey
  };

  firebase.push(
    '/children',
    newChild
  ).then(
    function(result) {
      const path = "/users/" + userKey;
      children.push(result.key);
      firebase.update(path, {'children': children});
      console.log("created key: " + result.key);
    }
  ).then(
    function() {
      topmost.navigate("views/dashboard/dashboard");
    } 
  );

}