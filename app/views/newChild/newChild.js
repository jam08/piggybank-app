var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();

var pageData = new observableModule.fromObject({
  type: new ObservableArray(["WEEKLY", "BI-WEEKLY", "MONTHLY"]),
  currency: new ObservableArray(["SEK", "EUR", "GBP"])
});
var page;
var typeVisible = false;
var currencyVisible = false;

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;

  const allowanceType = page.getViewById("allowance");
  typeVisible ? allowanceType.visibility="visible" : allowanceType.visibility="collapse";

  const currency = page.getViewById("currency");
  currencyVisible ? currency.visibility="visible" : currency.visibility="collapse";
}

exports.showPicker = function() {
    typeVisible = !typeVisible;
    const allowanceType = page.getViewById("allowance");
    typeVisible ? allowanceType.visibility="visible" : allowanceType.visibility="collapse";
}

exports.showCurrency = function() {
  currencyVisible = !currencyVisible;
  const currency = page.getViewById("currency");
  currencyVisible ? currency.visibility="visible" : currency.visibility="collapse";
}

exports.createNewChild = function() {
  const newChild = {
    name: page.getViewById("childName"),
    allowanceType: page.getViewById("allowance"),
    amount: page.getViewById("amount")
  }

}