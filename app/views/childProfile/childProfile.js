//const firebase = require("nativescript-plugin-firebase");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var topmost = require("ui/frame").topmost();

var pageData = new observableModule.fromObject({
});

let page;
let message;
let today = new Date();
let goals = [];

let nextPaymentDay;
let nextPaymentMonth;
let nextPaymentYear;
let payDate;

function getDaysLeft(allowance, day) {
  if(allowanceDay > day) {
    daysLeft = allowanceDay - day;
    message = "Next allowance in " + daysLeft + " days";
    pageData.set("message", message);
  }else if(allowanceDay < day) {
    let daysLeft = 7 + (allowanceDay - day);
    message = "Next allowance in " + daysLeft + " days";
    pageData.set("message", message);
  }else {
    pageData.set("message", "Yay, it's allowance day!");
  }
}
function getWeekPayDay(payDay, allowanceType) {
  let lastDayMonth =  new Date(payDay.year, payDay.month, 0);
  let remain = lastDayMonth - payDay.day;
  if(remain == 14) {
    nextPaymentDay = lastDayMonth;
  }else if(remain < 14) {
    nextPaymentDay = 14 - remain;
    nextPaymentMonth = payDay.month + 1;
  }else {
    nextPaymentDay = payDay.day + 14;
  }
  payDate = nextPaymentYear + "/" + nextPaymentMonth + "/" + nextPaymentDay;
  message = "Next allowance on " + payDate;
  pageData.set("message", message);
  
}
function getPayDay(payDay, type) {

  if(payDay.month < 12) {
    nextPaymentMonth = payDay.month + 1;
    nextPaymentYear = payDay.year;
    let lastDayMonth = new Date(nextPaymentYear, nextPaymentMonth, 0);
    payDay.day < lastDayMonth ? nextPaymentDay = payDay.day : nextPaymentDay = lastDayMonth;

  }else {
    nextPaymentDay = payDay.day;
    nextPaymentMonth = 1;
    nextPaymentYear = payDay.year + 1;
  }
  payDate = nextPaymentYear + "/" + nextPaymentMonth + "/" + nextPaymentDay;
  message = "Next allowance on " + payDate;
  pageData.set("message", message);
}

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;
  
}
exports.pageNavigatedTo = function(args) {
  let daysLeft;
  let day = today.getDay();
  let context = args.object.navigationContext;
  let allowanceDay = context.childInfo.weekday;
  let allowanceType = context.childInfo.allowanceType;
  let payDay = context.childInfo.firstPayment;
  
  pageData.set("image", context.childInfo.image);
  pageData.set("name", context.childInfo.name);
  pageData.set("balance", context.childInfo.balance);
  pageData.set("cid", context.childInfo.cid);
  
  switch(allowanceType) {
    case "WEEKLY":
      getDaysLeft(allowanceDay, day);
      break;
    
    case "BI-WEEKLY":
      getWeekPayDay(payDay, allowanceType);
      break;

    case "MONTHLY":
      getPayDay(payDay, allowanceType);
      break;
  }
}

exports.onTap = function(eventData) {
  let navigationEntry = {
    moduleName: "views/newGoal/newGoal",
    context: { cid: pageData.get("cid") },
    animated: false
  }
  topmost.navigate(navigationEntry);
  //console.log("goal!!!");
  /*let newGoal = {
    name: "",
    price: "",
    cid: pageData.get("cid")
  };
  firebase.push(
    '/goals',
    newGoal
  ).then(
    function(result) {
      const path = "/children/" + pageData.get("cid");
      console.log(path);
      goals.push(result.key);
      firebase.update(path, {'goals': goals});
      console.log("created key: " + result.key);
    }
  );*/
}