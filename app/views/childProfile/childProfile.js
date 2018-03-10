//const firebase = require("nativescript-plugin-firebase");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var topmost = require("ui/frame").topmost();

var pageData = new observableModule.fromObject({
});
exports.loaded = function(args) {
  let page = args.object;
  page.bindingContext = pageData;
}
exports.pageNavigatedTo = function(args) {
  let context = args.object.navigationContext;
  pageData.set("image", context.childInfo.image);
  pageData.set("name", context.childInfo.name);
  pageData.set("balance", context.childInfo.balance);
}