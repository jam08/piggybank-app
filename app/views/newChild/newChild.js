var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();

var pageData = new observableModule.fromObject({
  items: new ObservableArray(["WEEKLY", "BI-WEEKLY", "MONTHLY"])
});
var page;
var visible = false;

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;

  const picker = page.getViewById("allowance");
  visible ? picker.visibility="visible" : picker.visibility="collapse";
}

exports.showPicker = function() {
    visible = !visible;
    const picker = page.getViewById("allowance");
    visible ? picker.visibility="visible" : picker.visibility="collapse";
}