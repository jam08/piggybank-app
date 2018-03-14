const firebase = require("nativescript-plugin-firebase");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var topmost = require("ui/frame").topmost();

var pageData = new observableModule.fromObject({
  goals: new ObservableArray([]),
});


let page;
let context;
let message;
let today = new Date();
let goals = [];

let nextPaymentDay;
let nextPaymentMonth;
let nextPaymentYear;
let payDate;

var getChildKey = function(id) {
  firebase.query(
    function(result) {
      const child = result.value;
      let goalsArray;
      for(const key in child) {
        //console.log("getChildKey" + key);
        pageData.set("weekday", child[key].weekday);
        //console.log("getChildKey" + child[key].weekday);
        pageData.set("allowanceType", child[key].allowanceType);
        pageData.set("firstPayment", child[key].firstPayment);
        pageData.set("name", child[key].name);
        pageData.set("balance", child[key].balance);
        pageData.set("image", child[key].image);
        child[key].goals ? goalsArray = child[key].goals : goalsArray = [];
        
      }
      if(goalsArray) {
        getGoals(goalsArray);
      }
      getChildInfo();
    },
    "/children",
    {
      // checks if the value exists or the event fires once
      singleEvent: true,
      orderBy: {
        type: firebase.QueryOrderByType.KEY,
      },
      range: {
        type: firebase.QueryRangeType.EQUAL_TO,
        value: pageData.get("cid")
      }
    }
  )
}
var getGoals = function (goalsArray) {
  console.log(goalsArray);
  let count = 0;

  goalsArray.map((key) => {
    firebase.query(
      function(result) {
        const goal = result.value;
        for(const key in goal) {
          let goalObj = {
              image: "res://pygge3x",
              name: goal[key].name,
              price: goal[key].price,
              gid: key
            }
            console.log(goalObj.name);
            let data = pageData.get("goals");
            data.setItem(count, goalObj);
            count++;
          }
        },
        "/goals",
        {
          singleEvent: true,
          orderBy: {
          type: firebase.QueryOrderByType.KEY
          }, 
          range: {
            type: firebase.QueryRangeType.EQUAL_TO,
            value: key
          }
        }
      );
    }
  );
}

var getDaysLeft = function(allowance, day) {
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
var getWeekPayDay = function(payDay, allowanceType) {
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

var getPayDay = function(payDay, type) {

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
  context = page.navigationContext;
  let childId;
  context.childInfo.cid ? childId = context.childInfo.cid : childId = context.cid;
  pageData.set("cid", childId);
  getChildKey(childId);
 
}
/* Tab Info */
var getChildInfo = function() {
  let daysLeft;
  let day = today.getDay();
  let allowanceDay = pageData.get("weekday");
  let allowanceType = pageData.get("allowanceType");
  let payDay = pageData.get("firstPayment");

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
}