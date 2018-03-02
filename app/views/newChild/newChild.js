var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();

/*var pageData = new observableModule.fromObject({
  type: new ObservableArray(["WEEKLY", "BI-WEEKLY", "MONTHLY"]),
  currency: new ObservableArray(["SEK", "EUR", "GBP"])
});*/
var pageData = new observableModule.fromObject({
  allowanceItems: new ObservableArray(["Allowance Type", "Currency"])
});
var page;
var typeVisible = false;
var currencyVisible = false;

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;
}
exports.createNewChild = function() {
  /*const newChild = {
    name: page.getViewById("childName"),
    allowanceType: page.getViewById("allowance"),
    amount: page.getViewById("amount")
  }*/

}