//const firebase = require("nativescript-plugin-firebase");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();

var pageData = new observableModule.fromObject({
  children: new ObservableArray([
  { image: "res://pygge3x", name: "JOSHUA", cash: "50kr" },
  { image: "res://pygge3x", name: "SIENA", cash: "50kr" }
  ])
});
var page;

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;
}

exports.addChild = function() {
  topmost.navigate("views/newChild/newChild");
}
/*
the modal page needs to send a child object back to the main page
exports.addChild = function() {
  const newChild = {
    name: "Joshua",
    image: "res://pygge3x",
    cash: "50kr"
  }
  childrenArr.push(newChild);

} */