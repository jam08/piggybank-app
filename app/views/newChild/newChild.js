var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();

/*var pageData = new observableModule.fromObject({
  type: new ObservableArray(["WEEKLY", "BI-WEEKLY", "MONTHLY"]),
  currency: new ObservableArray(["SEK", "EUR", "GBP"])
});*/
var pageData = new observableModule.fromObject({
  childName: "Child Name",
  allowanceType: "choose",
  currencyCode: "choose",
  amount: "0"
});

var page;
var page1;
var typeVisible = false;
var currencyVisible = false;

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;
}

exports.onFocusName = function(eventData) {
  const text = eventData.object.text;
  //console.dir(text);
  text === "Child Name" ? pageData.set("childName", "") : console.log(text);
  //pageData.set("childName", "");
}

exports.onFocusAmount = function(eventData) {
  const amount = eventData.object.text;
  amount === "0" ? pageData.set("amount", "") : console.log(amount);
}
exports.pageNavigatedTo = function(args) {
  page1 = args.object;
  var context = page1.navigationContext;
  if(context) {
    context.type ? pageData.set("allowanceType", context.type) : "";
    context.code ? pageData.set("currencyCode", context.code) : "";
  }else {
    console.log("No navigation context");
  }
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
  const newChild = {
    name: pageData.get("childName"),
    allowanceType: pageData.get("allowanceType"),
    currencyCode: pageData.get("currencyCode"),
    amount: pageData.get("amount")
  };
  console.dir(newChild);
}